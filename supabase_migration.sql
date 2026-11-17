-- Lunorka: описание и теги для рецептов
-- Выполнить один раз в Supabase → SQL Editor → Run

alter table public.recipes
  add column if not exists description text default '',
  add column if not exists tags jsonb default '[]'::jsonb;

-- Lunorka: меню (наборы рецептов)

create table if not exists public.menus (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  name text not null,
  recipe_ids jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

alter table public.menus enable row level security;

create policy "own menus" on public.menus
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Публичные ссылки: чем поделились, то может прочитать любой по прямой ссылке
alter table public.recipes add column if not exists is_shared boolean default false;
alter table public.menus add column if not exists is_shared boolean default false;

create policy "shared recipes are readable" on public.recipes
  for select using (is_shared = true);

create policy "shared menus are readable" on public.menus
  for select using (is_shared = true);
