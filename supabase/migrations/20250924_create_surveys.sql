-- Create surveys table to store customer satisfaction survey results
-- Run this migration in Supabase (SQL editor) or via supabase CLI

-- 1) Optional: create enum types (or use TEXT with CHECK). We'll use TEXT + CHECK for portability.
-- Ensure gen_random_uuid() is available
create extension if not exists "pgcrypto";

create table if not exists public.surveys (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Basic fields for quick filters
  company_name text not null,
  partnership_duration text check (partnership_duration in ('menos_6m','6m_1a','1a_2a','mais_2a')),
  locale text,
  user_agent text,

  -- Full answers payload for analytics
  answers_json jsonb not null,

  -- Owner session (optional) if you later add auth
  created_by uuid null
);

comment on table public.surveys is 'Stores survey submissions from the Survey page (TopPronto website)';
comment on column public.surveys.answers_json is 'Full structured JSON payload of the survey answers';

-- 2) Indexes for common queries
create index if not exists surveys_created_at_idx on public.surveys (created_at desc);
create index if not exists surveys_company_name_idx on public.surveys (company_name);
create index if not exists surveys_locale_idx on public.surveys (locale);
create index if not exists surveys_answers_gin_idx on public.surveys using gin (answers_json);

-- 3) Enable RLS and add minimal insert policy for public (anon) submissions from the website
alter table public.surveys enable row level security;

-- Allow INSERTs from anon role, but prevent reading/updating/deleting by default
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'surveys'
      and policyname = 'surveys_insert_public'
  ) then
    create policy surveys_insert_public
      on public.surveys
      for insert
      to anon
      with check (true);
  end if;
end $$;

-- Optionally allow authenticated users to read their own rows if you later set created_by
-- create policy if not exists surveys_select_own
--   on public.surveys
--   for select
--   to authenticated
--   using (auth.uid() = created_by);

-- 4) Permissions (ensure anon can insert)
grant insert on public.surveys to anon;
-- Do NOT grant select/update/delete to anon by default

-- Also allow insert for authenticated users (if you use auth)
grant insert on public.surveys to authenticated;

-- Ensure roles have USAGE on schema public (required by PostgREST)
grant usage on schema public to anon;
grant usage on schema public to authenticated;

-- Create an equivalent insert policy for authenticated role (idempotent)
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'surveys'
      and policyname = 'surveys_insert_authenticated'
  ) then
    create policy surveys_insert_authenticated
      on public.surveys
      for insert
      to authenticated
      with check (true);
  end if;
end $$;
