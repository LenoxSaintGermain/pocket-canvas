-- Profiles table (basic user info)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- RLS: Users can only view/edit their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger to auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Artists table (synthetic artists created by users)
create table public.artists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  archetype text not null,
  leet_influences text[] default '{}',
  xp integer default 0,
  level integer default 1,
  created_at timestamptz default now()
);

alter table public.artists enable row level security;

-- RLS: Users can only view/edit their own artists
create policy "Users can view own artists"
  on public.artists for select
  using (auth.uid() = user_id);

create policy "Users can insert own artists"
  on public.artists for insert
  with check (auth.uid() = user_id);

create policy "Users can update own artists"
  on public.artists for update
  using (auth.uid() = user_id);

-- Tracks table (generated music tracks)
create table public.tracks (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references public.artists(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  suno_prompt text not null,
  leet_code text,
  plot_twist text,
  audio_url text,
  created_at timestamptz default now()
);

alter table public.tracks enable row level security;

-- RLS: Users can only view/edit their own tracks
create policy "Users can view own tracks"
  on public.tracks for select
  using (auth.uid() = user_id);

create policy "Users can insert own tracks"
  on public.tracks for insert
  with check (auth.uid() = user_id);