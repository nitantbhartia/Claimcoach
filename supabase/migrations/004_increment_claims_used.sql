-- Atomic increment of profiles.claims_used.
-- Called from the Stripe webhook to avoid hard-setting the count,
-- which would incorrectly reset it on webhook retries.

create or replace function public.increment_claims_used(user_id uuid)
returns void as $$
begin
  update public.profiles
  set claims_used = claims_used + 1
  where id = user_id;
end;
$$ language plpgsql security definer;
