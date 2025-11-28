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

  return { adminClient };
}

export async function GET(request: Request) {
  const auth = await authorize(request);
  if ('error' in auth) return auth.error;
  const { adminClient } = auth;

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '100');
  const offset = parseInt(searchParams.get('offset') || '0');

  const { data: logsData, error } = await adminClient
    .from('identity_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  if (!logsData || logsData.length === 0) {
    return NextResponse.json([]);
  }

  // 获取所有操作者的信息
  const actorIds = [...new Set(logsData.map((log) => log.actor_id).filter(Boolean))];
  const { data: actorsData } = await adminClient
    .from('profiles')
    .select('id, email, nickname')
    .in('id', actorIds);

  const actorsMap = new Map();
  if (actorsData) {
    actorsData.forEach((actor) => {
      actorsMap.set(actor.id, actor);
    });
  }

  // 合并操作者信息
  const result = logsData.map((log) => ({
    ...log,
    actor: actorsMap.get(log.actor_id) || null,
  }));

  return NextResponse.json(result);
}

