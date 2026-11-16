-- Lunorka: описание и теги для рецептов
-- Выполнить один раз в Supabase → SQL Editor → Run

alter table public.recipes
  add column if not exists description text default '',
  add column if not exists tags jsonb default '[]'::jsonb;
