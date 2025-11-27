import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function authorize(request: Request) {
  if (!serviceKey) {
    return { error: NextResponse.json({ message: 'Service key missing' }, { status: 500 }) };
  }
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return { error: NextResponse.json({ message: 'Missing Authorization header' }, { status: 401 }) };
  }
  const token = authHeader.replace('Bearer', '').trim();
  if (!token) {
    return { error: NextResponse.json({ message: 'Invalid token' }, { status: 401 }) };
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false },
  });

  const { data: userData, error: userError } = await userClient.auth.getUser();
  if (userError || !userData.user) {
    return { error: NextResponse.json({ message: 'Invalid session' }, { status: 401 }) };
  }

  const { data: profile, error: profileError } = await userClient
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single();

  if (profileError || profile?.role !== 'admin') {
    return { error: NextResponse.json({ message: 'Forbidden' }, { status: 403 }) };
  }

  const adminClient = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  return { adminClient, actorId: userData.user.id };
}

export async function POST(request: Request) {
  const auth = await authorize(request);
  if ('error' in auth) return auth.error;
  const { adminClient, actorId } = auth;

  const body = await request.json();
  const { email, password, nickname, role } = body;

  if (!email || !password) {
    return NextResponse.json({ message: '邮箱与初始密码必填' }, { status: 400 });
  }

  const { data, error } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    return NextResponse.json({ message: error?.message || '创建用户失败' }, { status: 400 });
  }

  await adminClient.from('profiles').upsert({
    id: data.user.id,
    email,
    nickname,
    role: role || 'newbie',
    study_status: role === 'newbie' ? 'pending' : 'approved',
    is_active: true,
  });

  await adminClient.from('identity_logs').insert({
    actor_id: actorId,
    target_email: email,
    action: 'create_user',
    detail: body,
  });

  return NextResponse.json({ message: '创建成功' });
}

export async function PATCH(request: Request) {
  const auth = await authorize(request);
  if ('error' in auth) return auth.error;
  const { adminClient, actorId } = auth;

  const { id, updates } = await request.json();
  if (!id || !updates) {
    return NextResponse.json({ message: '缺少参数' }, { status: 400 });
  }

  const { error } = await adminClient.from('profiles').update(updates).eq('id', id);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  await adminClient.from('identity_logs').insert({
    actor_id: actorId,
    target_email: updates.email || '',
    action: 'update_profile',
    detail: { id, updates },
  });

  return NextResponse.json({ message: '更新成功' });
}

export async function PUT(request: Request) {
  const auth = await authorize(request);
  if ('error' in auth) return auth.error;
  const { adminClient, actorId } = auth;

  const { id, password } = await request.json();
  if (!id || !password) {
    return NextResponse.json({ message: '缺少参数' }, { status: 400 });
  }

  const { error } = await adminClient.auth.admin.updateUserById(id, { password });
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  await adminClient.from('identity_logs').insert({
    actor_id: actorId,
    target_email: id,
    action: 'reset_password',
    detail: {},
  });

  return NextResponse.json({ message: '密码已重置' });
}

