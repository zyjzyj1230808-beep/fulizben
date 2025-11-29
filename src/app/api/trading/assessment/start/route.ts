import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: Request) {
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
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ message: '找不到用户资料' }, { status: 400 });
  }

  if (profile.role !== 'trainee') {
    return NextResponse.json({ message: '只有见习学员可以报名该考核' }, { status: 403 });
  }

  const { error: upsertError } = await supabase
    .from('assessments')
    .upsert(
      {
        user_id: user.id,
        rule: '10_days_no_loss',
        status: 'started',
      },
      {
        onConflict: 'user_id,rule',
      }
    );

  if (upsertError) {
    return NextResponse.json({ message: upsertError.message }, { status: 400 });
  }

  return NextResponse.json({ message: '考核已开始，接下来会自动统计最近 10 个交易日盈亏。' });
}

