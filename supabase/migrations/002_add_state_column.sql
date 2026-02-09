-- Add the missing "state" column to the claims table.
-- Run this in the Supabase SQL Editor if you already applied 001_initial_schema.sql.
alter table public.claims add column if not exists state text;
