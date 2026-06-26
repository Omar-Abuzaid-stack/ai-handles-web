create table if not exists public.bookings (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  date text not null,
  time text not null,
  meeting_type text not null,
  location text,
  status text default 'pending',
  created_at timestamptz default now()
);

alter table public.bookings enable row level security;

create policy "Allow insert from anon" on public.bookings
  for insert with check (true);

create policy "Allow read for service role" on public.bookings
  for select using (true);
