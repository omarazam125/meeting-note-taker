-- Meeting Note Taker schema
-- Profiles, meetings, transcript segments, timeline events, tasks, speakers

-- =========================================================
-- profiles
-- =========================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_delete_own" on public.profiles;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = id);

-- =========================================================
-- meetings
-- =========================================================
create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Untitled meeting',
  description text,
  language text not null default 'en',
  source text not null default 'upload', -- 'upload' | 'record'
  status text not null default 'processing', -- 'processing' | 'ready' | 'failed'
  duration_seconds integer not null default 0,
  audio_url text,
  transcript text,
  summary text,
  key_points jsonb not null default '[]'::jsonb,
  sentiment text,
  meeting_date timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.meetings enable row level security;

drop policy if exists "meetings_select_own" on public.meetings;
drop policy if exists "meetings_insert_own" on public.meetings;
drop policy if exists "meetings_update_own" on public.meetings;
drop policy if exists "meetings_delete_own" on public.meetings;

create policy "meetings_select_own" on public.meetings for select using (auth.uid() = user_id);
create policy "meetings_insert_own" on public.meetings for insert with check (auth.uid() = user_id);
create policy "meetings_update_own" on public.meetings for update using (auth.uid() = user_id);
create policy "meetings_delete_own" on public.meetings for delete using (auth.uid() = user_id);

create index if not exists meetings_user_id_idx on public.meetings(user_id);
create index if not exists meetings_created_at_idx on public.meetings(created_at desc);

-- =========================================================
-- speakers
-- =========================================================
create table if not exists public.speakers (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,            -- e.g. "Speaker 1"
  display_name text,              -- editable friendly name
  color text,
  talk_seconds integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.speakers enable row level security;

drop policy if exists "speakers_all_own" on public.speakers;
create policy "speakers_all_own" on public.speakers for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists speakers_meeting_id_idx on public.speakers(meeting_id);

-- =========================================================
-- transcript segments
-- =========================================================
create table if not exists public.segments (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  speaker_label text,
  start_seconds numeric not null default 0,
  end_seconds numeric not null default 0,
  text text not null,
  created_at timestamptz not null default now()
);

alter table public.segments enable row level security;

drop policy if exists "segments_all_own" on public.segments;
create policy "segments_all_own" on public.segments for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists segments_meeting_id_idx on public.segments(meeting_id);
create index if not exists segments_start_idx on public.segments(meeting_id, start_seconds);

-- =========================================================
-- timeline events
-- =========================================================
create table if not exists public.timeline_events (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  timestamp_seconds numeric not null default 0,
  title text not null,
  description text,
  category text not null default 'discussion', -- 'discussion' | 'decision' | 'action' | 'question'
  created_at timestamptz not null default now()
);

alter table public.timeline_events enable row level security;

drop policy if exists "timeline_all_own" on public.timeline_events;
create policy "timeline_all_own" on public.timeline_events for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists timeline_meeting_id_idx on public.timeline_events(meeting_id, timestamp_seconds);

-- =========================================================
-- tasks / action items
-- =========================================================
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  assignee text,
  due_date text,
  priority text not null default 'medium', -- 'low' | 'medium' | 'high'
  status text not null default 'open',     -- 'open' | 'done'
  created_at timestamptz not null default now()
);

alter table public.tasks enable row level security;

drop policy if exists "tasks_all_own" on public.tasks;
create policy "tasks_all_own" on public.tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists tasks_meeting_id_idx on public.tasks(meeting_id);

-- =========================================================
-- auto-create profile trigger
-- =========================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', null),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', null)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
