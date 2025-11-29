import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type TradePayload = {
  // 成交票据号
  ticket: string;
  // 品种
  symbol: string;
  // buy/sell
  side: 'buy' | 'sell';
  // 手数
  volume: number;
  // open/close
  status: 'open' | 'close';
  // 可选：经纪商名称
  broker?: string;
  open_time?: string;
  close_time?: string;
  open_price?: number;
  close_price?: number;
  profit?: number;
  commission?: number;
  swap?: number;
  comment?: string;
  // 可选：账号标识，用于日志
  account_id?: string;
};

function parseDate(value?: string | null) {
  if (!value) return null;
  const t = Date.parse(value);
  if (Number.isNaN(t)) return null;
  return new Date(t).toISOString();
}

async function authorize(token: string) {
  if (!serviceKey) {
    return { error: NextResponse.json({ message: 'Service key missing' }, { status: 500 }) };
  }
  const adminClient = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  const { data, error } = await adminClient
    .from('trade_webhook_tokens')
    .select('user_id, is_active, account')
    .eq('token', token)
    .single();
  if (error || !data || !data.is_active) {
    return { error: NextResponse.json({ message: 'Unauthorized' }, { status: 401 }) };
  }
  return { adminClient, userId: data.user_id, account: data.account || null };
}

// 宽松类型，避免 Supabase 泛型推断导致 never
async function recomputeAssessment(adminClient: any, userId: string) {
  // 只有在用户主动“报名考核”后（存在 status = 'started' 的记录），才统计 10 日考核
  const { data: activeAssessment, error: assessError } = await adminClient
    .from('assessments')
    .select('id, status, rule')
    .eq('user_id', userId)
    .eq('rule', '10_days_no_loss')
    .eq('status', 'started')
    .maybeSingle();

  if (assessError || !activeAssessment) {
    return;
  }
  const assessment = (activeAssessment as any) as { id?: string | null; status?: string | null; rule?: string | null } | null;

  const { data: dailyRows, error } = await adminClient
    .from('daily_pnl')
    .select('trade_date, net_pnl')
    .eq('user_id', userId)
    .order('trade_date', { ascending: false })
    .limit(10);
  if (error || !dailyRows || dailyRows.length < 10) return;

  const rows = (dailyRows ?? []) as { net_pnl: number | null }[];
  const allNonLoss = rows.every((row) => (row.net_pnl ?? 0) >= 0);
  if (!allNonLoss) return;

  // 统一放宽 adminClient 的类型，避免生成 never
  const admin = adminClient as any;

  const profileResp = await admin
    .from('profiles')
    .select('role, email')
    .eq('id', userId)
    .single();

  const profile = (profileResp?.data ?? null) as { role?: string | null; email?: string | null } | null;

  if (profile?.role !== 'trainee') return;

  await admin.from('profiles').update({ role: 'junior' }).eq('id', userId);
  await admin.from('assessments').update({ status: 'passed' }).eq('id', assessment?.id || '');
  await admin.from('identity_logs').insert({
    actor_id: userId,
    target_email: profile?.email || userId,
    action: 'assessment_pass',
    detail: { rule: '10_days_no_loss', new_role: 'junior' },
  });
}

export async function POST(request: Request) {
  try {
    const headerToken = request.headers.get('x-webhook-token') || request.headers.get('authorization');
    const rawToken = headerToken?.replace('Bearer', '').trim();
    if (!rawToken) {
      return NextResponse.json({ message: 'Missing webhook token' }, { status: 401 });
    }

    const auth = await authorize(rawToken);
    if ('error' in auth) return auth.error;
    const { adminClient, userId, account } = auth;

    const payload = (await request.json()) as TradePayload;
    if (!payload.ticket || !payload.symbol || !payload.side || !payload.status) {
      return NextResponse.json({ message: '缺少关键字段(ticket/symbol/side/status)' }, { status: 400 });
    }

    const netPnl =
      (payload.profit ?? 0) + (payload.commission ?? 0) + (payload.swap ?? 0);
    const closeTime = parseDate(payload.close_time) || parseDate(payload.open_time) || new Date().toISOString();
    const tradeDate = closeTime.slice(0, 10);

    await adminClient.from('trades').insert({
      user_id: userId,
      ticket: payload.ticket,
      symbol: payload.symbol,
      side: payload.side,
      status: payload.status,
      broker: payload.broker || 'tickmill',
      account: payload.account_id || account,
      volume: payload.volume || 0,
      open_time: parseDate(payload.open_time),
      close_time: parseDate(payload.close_time),
      open_price: payload.open_price ?? null,
      close_price: payload.close_price ?? null,
      profit: payload.profit ?? null,
      commission: payload.commission ?? null,
      swap: payload.swap ?? null,
      comment: payload.comment ?? null,
    });

    if (payload.status === 'close') {
      await adminClient.from('daily_pnl').upsert(
        {
          user_id: userId,
          trade_date: tradeDate,
          gross_pnl: payload.profit ?? 0,
          net_pnl: netPnl,
          trade_count: 1,
        },
        { onConflict: 'user_id,trade_date' }
      );
      try {
        await adminClient.rpc('increment_daily_pnl', {
          p_user_id: userId,
          p_trade_date: tradeDate,
          p_gross: payload.profit ?? 0,
          p_net: netPnl,
        });
      } catch {
        // ignore RPC aggregation errors
      }
      await recomputeAssessment(adminClient as any, userId);
    }

    return NextResponse.json({ message: 'ok' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
