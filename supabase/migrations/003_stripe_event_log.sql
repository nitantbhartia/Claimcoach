-- Track processed Stripe event IDs to prevent double-processing on webhook retries.
-- The 30-day TTL matches Stripe's webhook retry window.

create table public.stripe_event_log (
  event_id text primary key,
  processed_at timestamptz not null default now()
);

-- Auto-prune events older than 30 days on insert
create or replace function public.prune_old_stripe_events()
returns trigger as $$
begin
  delete from public.stripe_event_log
  where processed_at < now() - interval '30 days';
  return new;
end;
$$ language plpgsql security definer;

create trigger stripe_event_log_prune
  after insert on public.stripe_event_log
  for each statement execute procedure public.prune_old_stripe_events();

-- Only the service role (server-side) should touch this table
alter table public.stripe_event_log enable row level security;
-- No RLS policies needed — service role bypasses RLS by default
