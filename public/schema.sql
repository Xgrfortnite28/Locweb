create table if not exists public.appointments (
  id bigint generated always as identity primary key,
  customer_name text not null,
  phone text not null,
  service_type text not null,
  booking_date date not null,
  booking_window text not null,
  details text not null default '',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create unique index if not exists appointments_unique_active_slot
on public.appointments (booking_date, booking_window)
where status in ('pending', 'confirmed');

create table if not exists public.owner_availability (
  id bigint generated always as identity primary key,
  date date not null,
  booking_window text not null,
  is_available boolean not null default true,
  reason text,
  created_at timestamptz not null default now()
);

create unique index if not exists owner_availability_unique_slot
on public.owner_availability (date, booking_window);
