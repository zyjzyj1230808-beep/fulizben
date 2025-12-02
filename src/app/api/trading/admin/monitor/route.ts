import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: Request) {
  if (!serviceRoleKey) {
    return NextResponse.json({ message: '缺少 SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 });
  }

  // 用 anonKey 验证当前登录用户
  const supabase = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: request.headers.get('authorization') || '' } },
  });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ message: '未登录或登录已失效' }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError || !profile || profile.role !== 'admin') {
    return NextResponse.json({ message: '只有管理员可查看考核监控' }, { status: 403 });
  }

  // 用 service role 查询全量数据
  const adminClient = createClient(supabaseUrl, serviceRoleKey);

  const { data: dailyData, error: dailyError } = await adminClient
    .from('daily_pnl')
    .select('user_id, trade_date, net_pnl, gross_pnl, trade_count, profiles(email)')
    .order('trade_date', { ascending: false })
    .limit(50);

  const { data: tradeData, error: tradeError } = await adminClient
    .from('trades')
    .select('user_id, ticket, symbol, side, status, profit, close_time, profiles(email)')
    .order('close_time', { ascending: false })
    .limit(50);

  if (dailyError || tradeError) {
    return NextResponse.json(
      { message: dailyError?.message || tradeError?.message || '加载失败' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    daily: dailyData || [],
    trades: tradeData || [],
  });
}
