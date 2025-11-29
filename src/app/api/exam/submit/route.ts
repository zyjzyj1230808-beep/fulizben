import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function authorize(request: Request) {
  if (!serviceKey) {
    return { error: NextResponse.json({ message: 'Service key missing' }, { status: 500 }) };
  }

  const token = request.headers.get('authorization')?.replace('Bearer', '').trim();
  if (!token) {
    return { error: NextResponse.json({ message: 'Unauthorized' }, { status: 401 }) };
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false },
  });

  const { data: userData, error } = await userClient.auth.getUser();
  if (error || !userData.user) {
    return { error: NextResponse.json({ message: 'Invalid session' }, { status: 401 }) };
  }

  return { userId: userData.user.id };
}

export async function POST(request: Request) {
  const auth = await authorize(request);
  if ('error' in auth) return auth.error;
  const { userId } = auth;

  const { score, total } = await request.json();
  if (typeof score !== 'number' || typeof total !== 'number' || total <= 0) {
    return NextResponse.json({ message: '参数错误' }, { status: 400 });
  }
  if (score !== total) {
    return NextResponse.json({ message: '需要 100 分才能通过考核' }, { status: 400 });
  }

  const adminClient = createClient(supabaseUrl, serviceKey!, { auth: { persistSession: false } });

  const { data: profileRow } = await adminClient
    .from('profiles')
    .select('email, role')
    .eq('id', userId)
    .single();

  const nextRole = profileRow?.role === 'newbie' ? 'trainee' : profileRow?.role || 'trainee';

  const updates: Record<string, string> = { study_status: 'approved' };
  if (profileRow?.role === 'newbie') {
    updates.role = nextRole;
  }

  const { error: updateError } = await adminClient.from('profiles').update(updates).eq('id', userId);
  if (updateError) {
    return NextResponse.json({ message: updateError.message }, { status: 400 });
  }

  await adminClient.from('identity_logs').insert({
    actor_id: userId,
    target_email: profileRow?.email || userId,
    action: 'exam_pass',
    detail: { score, total, promoted_to: nextRole },
  });

  return NextResponse.json({ message: '考试通过，已升级为见习学员' });
}
