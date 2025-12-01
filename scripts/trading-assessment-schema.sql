-- 创建交易 Webhook token（每个学员一个安全 token，绑定 user_id）
create table if not exists public.trade_webhook_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  token text not null unique,
  account text, -- 可选：记录 MT4/MT5 账号标识，便于追踪
  is_active boolean not null default true,
  provider text default 'tickmill',
  created_at timestamptz default now()
);

-- 逐笔成交流水
create table if not exists public.trades (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  ticket text not null,
  symbol text not null,
  side text check (side in ('buy','sell')),
  status text check (status in ('open','close')),
  broker text default 'tickmill',
  account text,
  volume numeric,
  open_time timestamptz,
  close_time timestamptz,
  open_price numeric,
  close_price numeric,
  profit numeric,
  commission numeric,
  swap numeric,
  comment text,
  created_at timestamptz default now()
);
create index if not exists trades_user_date_idx on public.trades (user_id, close_time);

-- 日度盈亏
create table if not exists public.daily_pnl (
  user_id uuid not null references public.profiles (id) on delete cascade,
  trade_date date not null,
  gross_pnl numeric not null default 0,
  net_pnl numeric not null default 0,
  trade_count integer not null default 0,
  primary key (user_id, trade_date)
);

-- 考核记录
create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  rule text not null,
  status text not null,
  created_at timestamptz default now()
);

-- 确保按 (user_id, rule) 去重，便于 upsert
create unique index if not exists assessments_user_rule_idx
  on public.assessments (user_id, rule);

-- 可选：用于累加日度盈亏的 RPC（防止 upsert 覆盖）
create or replace function public.increment_daily_pnl(
  p_user_id uuid,
  p_trade_date date,
  p_gross numeric,
  p_net numeric
) returns void as $$
begin
  insert into public.daily_pnl (user_id, trade_date, gross_pnl, net_pnl, trade_count)
  values (p_user_id, p_trade_date, p_gross, p_net, 1)
  on conflict (user_id, trade_date) do update
    set gross_pnl = public.daily_pnl.gross_pnl + excluded.gross_pnl,
        net_pnl   = public.daily_pnl.net_pnl + excluded.net_pnl,
        trade_count = public.daily_pnl.trade_count + 1;
end;
$$ language plpgsql;

-- 见习学员报名 10 天不亏损考核时的登记信息
create table if not exists public.assessment_enrollments (
  user_id uuid not null references public.profiles (id) on delete cascade,
  rule text not null,
  account text,
  server text,
  investor_password text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (user_id, rule)
);
