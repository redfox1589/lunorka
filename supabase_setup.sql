-- Lunorka: таблицы и правила доступа
-- Выполнить один раз в Supabase → SQL Editor → New query → Run

create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  name text not null,
  photo text default '',
  emoji text default '',
  description text default '',
  tags jsonb default '[]'::jsonb,
  category text default 'mains',
  time int default 30,
  servings int default 2,
  ingredients jsonb default '[]'::jsonb,
  steps jsonb default '[]'::jsonb,
  favorite boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.shopping_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  name text not null,
  amount text default '',
  from_name text default '',
  done boolean default false,
  created_at timestamptz default now()
);

alter table public.recipes enable row level security;
alter table public.shopping_items enable row level security;

-- каждый пользователь видит и изменяет только свои данные
create policy "own recipes" on public.recipes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own shopping" on public.shopping_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
