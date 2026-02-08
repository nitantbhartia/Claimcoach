-- Add state column to claims table
alter table public.claims add column if not exists state text;

-- Waitlist table for collecting interested emails (home/health claims, etc.)
create table if not exists public.waitlist (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  interest text not null default 'general',
  created_at timestamptz not null default now()
);

-- Allow inserts from the anon/service role (public landing page, no auth required)
alter table public.waitlist enable row level security;

-- Allow inserts from any authenticated or anonymous user
create policy "Anyone can join waitlist"
  on public.waitlist for insert
  with check (true);

-- Only service role can read waitlist entries (admin)
create policy "Service role can read waitlist"
  on public.waitlist for select
  using (auth.role() = 'service_role');
