-- Guest checkout schema with extended order analytics

create extension if not exists "pgcrypto";

-- PRODUCTS
create table if not exists products (
  id bigint generated always as identity primary key,
  name text not null,
  description text,
  price_cents integer not null check (price_cents > 0),
  image_url text,
  category text,
  inventory_count integer not null default 0 check (inventory_count >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_active_idx on products (active) where active;

-- CUSTOMERS
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  phone text,
  address_line1 text,
  address_line2 text,
  city text,
  region text,
  postal_code text,
  country text default 'ZA',
  company text,
  vat_number text,
  newsletter_opt_in boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists customers_email_idx on customers (lower(email));

-- ORDERS
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  status text not null default 'created', -- created|pending|paid|failed|cancelled|shipped
  customer_id uuid references customers(id),
  currency text not null default 'ZAR',
  subtotal_cents integer not null default 0,
  shipping_cents integer not null default 0,
  discount_cents integer not null default 0,
  gift_wrap_cents integer not null default 0,
  donation_cents integer not null default 0,
  tax_cents integer not null default 0,
  pre_tax_total_cents integer not null default 0,
  total_cents integer not null,
  gift_wrap boolean not null default false,
  shipping_method text,
  shipping_eta text,
  shipping_amount_cents integer,
  requested_delivery_date date,
  notes text,
  promo_code text,
  payment_method text,
  gateway_status text,
  gateway_reference text,
  metadata jsonb not null default '{}'::jsonb,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_status_idx on orders(status);
create index if not exists orders_customer_idx on orders(customer_id);
create index if not exists orders_paid_at_idx on orders(paid_at) where paid_at is not null;

-- ORDER ITEMS
create table if not exists order_items (
  id bigint generated always as identity primary key,
  order_id uuid references orders(id) on delete cascade,
  product_id bigint references products(id),
  sku text,
  name text not null,
  unit_price_cents integer not null,
  quantity integer not null check (quantity > 0),
  line_total_cents integer not null
);

create index if not exists order_items_order_idx on order_items(order_id);

-- ORDER EVENTS / TIMELINE
create table if not exists order_events (
  id bigint generated always as identity primary key,
  order_id uuid references orders(id) on delete cascade,
  status text not null,
  message text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists order_events_order_idx on order_events(order_id);

-- SAMPLE DATA
insert into products (name, description, price_cents, image_url, category, inventory_count)
values
  ('Karate Gi', 'Lightweight karate uniform with reinforced stitching.', 119900, 'https://picsum.photos/seed/gi/600/400', 'Apparel', 12),
  ('Judo Belt', '100% cotton belt available in multiple colours.', 19900, 'https://picsum.photos/seed/belt/600/400', 'Accessories', 48)
on conflict do nothing;

-- Helper view for analytics
create view if not exists order_totals_view as
select
  o.order_number,
  o.status,
  o.total_cents,
  o.tax_cents,
  o.donation_cents,
  o.gift_wrap_cents,
  o.created_at,
  c.email as customer_email,
  c.newsletter_opt_in
from orders o
left join customers c on c.id = o.customer_id;
