-- Skema Tabel visitor_logs untuk Supabase (Versi Final)
-- Buat tabel ini di Supabase Dashboard -> SQL Editor

create table public.visitor_logs ( 
   id bigserial not null, 
   nip character varying(50) not null, 
   nama character varying(255) not null, 
   role character varying(100) not null, 
   activity_type character varying(50) not null, 
   page_name character varying(255) null, 
   timestamp timestamp with time zone null default now(), 
   created_at timestamp with time zone null default now(), 
   constraint visitor_logs_pkey primary key (id) 
 ) TABLESPACE pg_default; 
 
 create index IF not exists idx_visitor_logs_timestamp on public.visitor_logs using btree ("timestamp" desc) TABLESPACE pg_default; 
 
 create index IF not exists idx_visitor_logs_nip on public.visitor_logs using btree (nip) TABLESPACE pg_default; 
 
 create index IF not exists idx_visitor_logs_activity_type on public.visitor_logs using btree (activity_type) TABLESPACE pg_default;

-- Aktifkan Row Level Security (RLS)
alter table public.visitor_logs enable row level security;

-- Kebijakan RLS: Izinkan semua orang untuk membaca dan menulis (sesuai kebutuhan)
create policy "Enable read access for all users" on public.visitor_logs
    for select using (true);

create policy "Enable insert access for all users" on public.visitor_logs
    for insert with check (true);

create policy "Enable update access for all users" on public.visitor_logs
    for update using (true);

create policy "Enable delete access for all users" on public.visitor_logs
    for delete using (true);