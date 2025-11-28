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
  const { data: profile } = await userClient
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single();
  // 管理员和助教都可以审核资料
  if (!profile || !['admin', 'assistant'].includes(profile.role)) {
    return { error: NextResponse.json({ message: 'Forbidden' }, { status: 403 }) };
  }

  const adminClient = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  return { adminClient, actorId: userData.user.id };
}

export async function GET(request: Request) {
  const auth = await authorize(request);
  if ('error' in auth) return auth.error;
  const { adminClient } = auth;
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('file');

  if (filePath) {
    const { data, error } = await adminClient.storage
      .from('study-materials')
      .createSignedUrl(filePath, 60);
    if (error || !data) {
      return NextResponse.json({ message: error?.message || '无法生成下载链接' }, { status: 400 });
    }
    return NextResponse.json({ url: data.signedUrl });
  }

  const { data, error } = await adminClient
    .from('study_materials')
    .select('id, user_id, file_path, status, created_at')
    .order('created_at', { ascending: false });
  if (error || !data) {
    return NextResponse.json({ message: error?.message || '获取资料失败' }, { status: 400 });
  }
  const userIds = Array.from(new Set(data.map((item) => item.user_id)));
  const { data: profileRows } = await adminClient
    .from('profiles')
    .select('id, email, nickname, role, study_status')
    .in('id', userIds);
  const profileMap = new Map(profileRows?.map((row) => [row.id, row]));
  const payload = data.map((item) => ({
    ...item,
    profile: profileMap.get(item.user_id) || null,
  }));
  return NextResponse.json(payload);
}

export async function PATCH(request: Request) {
  const auth = await authorize(request);
  if ('error' in auth) return auth.error;
  const { adminClient, actorId } = auth;
  const { id, status } = await request.json();
  if (!id || !status) {
    return NextResponse.json({ message: '缺少参数' }, { status: 400 });
  }
  const { data, error } = await adminClient
    .from('study_materials')
    .update({ status })
    .eq('id', id)
    .select('user_id')
    .single();
  if (error || !data) {
    return NextResponse.json({ message: error?.message || '更新失败' }, { status: 400 });
  }
  await adminClient.from('profiles').update({ study_status: status }).eq('id', data.user_id);
  await adminClient.from('identity_logs').insert({
    actor_id: actorId,
    target_email: data.user_id,
    action: 'review_material',
    detail: { material_id: id, status },
  });
  return NextResponse.json({ message: '更新成功' });
}

