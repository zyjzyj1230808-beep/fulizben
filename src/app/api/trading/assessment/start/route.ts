import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    account?: string;
    server?: string;
    investorPassword?: string;
  };

  const account = (body.account || '').trim();
  const server = (body.server || '').trim();
  const investorPassword = (body.investorPassword || '').trim();

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

  if (profileError || !profile) {
    return NextResponse.json({ message: '找不到用户资料' }, { status: 400 });
  }

  if (profile.role !== 'trainee') {
    return NextResponse.json({ message: '只有见习学员可以报名该考核' }, { status: 403 });
  }

  // 手动 upsert assessments，避免依赖唯一约束
  const { data: existingAssess } = await supabase
    .from('assessments')
    .select('id')
    .eq('user_id', user.id)
    .eq('rule', '10_days_no_loss')
    .maybeSingle();

  if (existingAssess?.id) {
    const { error: updateAssessError } = await supabase
      .from('assessments')
      .update({ status: 'started' })
      .eq('id', existingAssess.id);
    if (updateAssessError) {
      return NextResponse.json({ message: updateAssessError.message }, { status: 400 });
    }
  } else {
    const { error: insertAssessError } = await supabase
      .from('assessments')
      .insert({ user_id: user.id, rule: '10_days_no_loss', status: 'started' });
    if (insertAssessError) {
      return NextResponse.json({ message: insertAssessError.message }, { status: 400 });
    }
  }

  // 手动 upsert assessment_enrollments
  const { data: existingEnroll } = await supabase
    .from('assessment_enrollments')
    .select('user_id')
    .eq('user_id', user.id)
    .eq('rule', '10_days_no_loss')
    .maybeSingle();

  if (account || server || investorPassword) {
    if (existingEnroll) {
      const { error: updateEnrollError } = await supabase
        .from('assessment_enrollments')
        .update({
          account: account || null,
          server: server || null,
          investor_password: investorPassword || null,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .eq('rule', '10_days_no_loss');

      if (updateEnrollError) {
        return NextResponse.json({ message: updateEnrollError.message }, { status: 400 });
      }
    } else {
      const { error: insertEnrollError } = await supabase.from('assessment_enrollments').insert({
        user_id: user.id,
        rule: '10_days_no_loss',
        account: account || null,
        server: server || null,
        investor_password: investorPassword || null,
      });

      if (insertEnrollError) {
        return NextResponse.json({ message: insertEnrollError.message }, { status: 400 });
      }
    }
  }

  return NextResponse.json({ message: '考核已开始，接下来会自动统计最近 10 个交易日盈亏。' });
}
