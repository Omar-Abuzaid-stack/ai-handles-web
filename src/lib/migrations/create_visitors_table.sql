create table if not exists public.visitors (
  id uuid default gen_random_uuid() primary key,
  session_id text,
  page text,
  referrer text,
  user_agent text,
  created_at timestamptz default now()
);

alter table public.visitors enable row level security;

create policy "Allow insert from anon" on public.visitors
  for insert with check (true);

create policy "Allow read for service role" on public.visitors
  for select using (true);
