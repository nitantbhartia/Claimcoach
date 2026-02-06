-- ClaimCoach Initial Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- Users (extends Supabase auth.users)
-- ============================================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  subscription_tier text not null default 'free' check (subscription_tier in ('free', 'per_claim', 'pro')),
  stripe_customer_id text,
  claims_used integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- Claims
-- ============================================================
create table public.claims (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  claim_type text not null default 'auto' check (claim_type in ('auto', 'home', 'health', 'renters')),
  status text not null default 'setup' check (status in ('setup', 'documenting', 'policy_review', 'filed', 'offer_received', 'negotiating', 'escalating', 'resolved')),

  -- Context
  accident_date date,
  fault_status text default 'unknown' check (fault_status in ('not_at_fault', 'partial_fault', 'at_fault', 'unknown')),
  filed_with_insurer boolean not null default false,
  insurer_name text,
  claim_number text,
  has_offer boolean not null default false,

  -- Vehicle info (auto claims)
  vehicle_year text,
  vehicle_make text,
  vehicle_model text,
  damage_description text,

  -- Offer
  offer_amount numeric(12, 2),
  desired_amount numeric(12, 2),
  fairness_score integer check (fairness_score between 0 and 100),

  -- Policy
  policy_uploaded boolean not null default false,
  policy_summary text,
  coverage_limits jsonb,
  hidden_coverages jsonb,

  -- Resolution
  final_settlement numeric(12, 2),
  resolved_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.claims enable row level security;

create policy "Users can view own claims"
  on public.claims for select
  using (auth.uid() = user_id);

create policy "Users can create claims"
  on public.claims for insert
  with check (auth.uid() = user_id);

create policy "Users can update own claims"
  on public.claims for update
  using (auth.uid() = user_id);

create policy "Users can delete own claims"
  on public.claims for delete
  using (auth.uid() = user_id);

-- ============================================================
-- Claim Documents
-- ============================================================
create table public.claim_documents (
  id uuid primary key default uuid_generate_v4(),
  claim_id uuid references public.claims(id) on delete cascade not null,
  category text not null check (category in ('vehicle_damage', 'accident_scene', 'police_report', 'medical_records', 'repair_estimates', 'receipts', 'policy', 'correspondence', 'other')),
  file_name text not null,
  file_url text not null,
  file_type text not null,
  file_size integer,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.claim_documents enable row level security;

create policy "Users can view own claim documents"
  on public.claim_documents for select
  using (
    exists (
      select 1 from public.claims
      where claims.id = claim_documents.claim_id
      and claims.user_id = auth.uid()
    )
  );

create policy "Users can create claim documents"
  on public.claim_documents for insert
  with check (
    exists (
      select 1 from public.claims
      where claims.id = claim_documents.claim_id
      and claims.user_id = auth.uid()
    )
  );

create policy "Users can delete own claim documents"
  on public.claim_documents for delete
  using (
    exists (
      select 1 from public.claims
      where claims.id = claim_documents.claim_id
      and claims.user_id = auth.uid()
    )
  );

-- ============================================================
-- Financial Impacts
-- ============================================================
create table public.financial_impacts (
  id uuid primary key default uuid_generate_v4(),
  claim_id uuid references public.claims(id) on delete cascade not null,
  category text not null,
  description text not null,
  amount numeric(12, 2) not null,
  date date not null,
  receipt_url text,
  created_at timestamptz not null default now()
);

alter table public.financial_impacts enable row level security;

create policy "Users can view own financial impacts"
  on public.financial_impacts for select
  using (
    exists (
      select 1 from public.claims
      where claims.id = financial_impacts.claim_id
      and claims.user_id = auth.uid()
    )
  );

create policy "Users can create financial impacts"
  on public.financial_impacts for insert
  with check (
    exists (
      select 1 from public.claims
      where claims.id = financial_impacts.claim_id
      and claims.user_id = auth.uid()
    )
  );

create policy "Users can update own financial impacts"
  on public.financial_impacts for update
  using (
    exists (
      select 1 from public.claims
      where claims.id = financial_impacts.claim_id
      and claims.user_id = auth.uid()
    )
  );

create policy "Users can delete own financial impacts"
  on public.financial_impacts for delete
  using (
    exists (
      select 1 from public.claims
      where claims.id = financial_impacts.claim_id
      and claims.user_id = auth.uid()
    )
  );

-- ============================================================
-- Policy Analyses (cached AI results)
-- ============================================================
create table public.policy_analyses (
  id uuid primary key default uuid_generate_v4(),
  claim_id uuid references public.claims(id) on delete cascade not null unique,
  analysis jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.policy_analyses enable row level security;

create policy "Users can view own policy analyses"
  on public.policy_analyses for select
  using (
    exists (
      select 1 from public.claims
      where claims.id = policy_analyses.claim_id
      and claims.user_id = auth.uid()
    )
  );

create policy "Users can create policy analyses"
  on public.policy_analyses for insert
  with check (
    exists (
      select 1 from public.claims
      where claims.id = policy_analyses.claim_id
      and claims.user_id = auth.uid()
    )
  );

-- ============================================================
-- Offer Analyses (cached AI results)
-- ============================================================
create table public.offer_analyses (
  id uuid primary key default uuid_generate_v4(),
  claim_id uuid references public.claims(id) on delete cascade not null,
  offer_amount numeric(12, 2) not null,
  analysis jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.offer_analyses enable row level security;

create policy "Users can view own offer analyses"
  on public.offer_analyses for select
  using (
    exists (
      select 1 from public.claims
      where claims.id = offer_analyses.claim_id
      and claims.user_id = auth.uid()
    )
  );

create policy "Users can create offer analyses"
  on public.offer_analyses for insert
  with check (
    exists (
      select 1 from public.claims
      where claims.id = offer_analyses.claim_id
      and claims.user_id = auth.uid()
    )
  );

-- ============================================================
-- Counter Offers (cached AI results)
-- ============================================================
create table public.counter_offers (
  id uuid primary key default uuid_generate_v4(),
  claim_id uuid references public.claims(id) on delete cascade not null,
  demand_amount numeric(12, 2) not null,
  counter_offer jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.counter_offers enable row level security;

create policy "Users can view own counter offers"
  on public.counter_offers for select
  using (
    exists (
      select 1 from public.claims
      where claims.id = counter_offers.claim_id
      and claims.user_id = auth.uid()
    )
  );

create policy "Users can create counter offers"
  on public.counter_offers for insert
  with check (
    exists (
      select 1 from public.claims
      where claims.id = counter_offers.claim_id
      and claims.user_id = auth.uid()
    )
  );

-- ============================================================
-- Indexes
-- ============================================================
create index idx_claims_user_id on public.claims(user_id);
create index idx_claims_status on public.claims(status);
create index idx_claim_documents_claim_id on public.claim_documents(claim_id);
create index idx_financial_impacts_claim_id on public.financial_impacts(claim_id);
create index idx_policy_analyses_claim_id on public.policy_analyses(claim_id);
create index idx_offer_analyses_claim_id on public.offer_analyses(claim_id);
create index idx_counter_offers_claim_id on public.counter_offers(claim_id);

-- ============================================================
-- Updated_at trigger
-- ============================================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at();

create trigger update_claims_updated_at
  before update on public.claims
  for each row execute procedure public.update_updated_at();

-- ============================================================
-- Storage bucket for claim documents
-- ============================================================
insert into storage.buckets (id, name, public)
values ('claim-documents', 'claim-documents', false);

create policy "Users can upload claim documents"
  on storage.objects for insert
  with check (
    bucket_id = 'claim-documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can view own claim documents"
  on storage.objects for select
  using (
    bucket_id = 'claim-documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete own claim documents"
  on storage.objects for delete
  using (
    bucket_id = 'claim-documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
