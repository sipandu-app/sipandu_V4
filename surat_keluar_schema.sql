-- SQL SCHEMA UNTUK SURAT KELUAR
-- Jalankan di SQL Editor Supabase

-- 1. Hapus Tabel Lama (Jika Ada)
DROP TABLE IF EXISTS public.surat_keluar;

-- 2. Buat Tabel surat_keluar
CREATE TABLE public.surat_keluar (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    nomor_resmi TEXT,
    pemohon TEXT,
    kategori TEXT,
    perihal TEXT,
    tujuan TEXT,
    tanggal DATE DEFAULT CURRENT_DATE,
    file_name TEXT,
    file_url TEXT,
    status TEXT DEFAULT 'pending',
    is_verified BOOLEAN DEFAULT false
);

-- 3. Aktifkan RLS
ALTER TABLE public.surat_keluar ENABLE ROW LEVEL SECURITY;

-- 4. Kebijakan Akses Publik
CREATE POLICY "Akses Publik Select" ON public.surat_keluar FOR SELECT USING (true);
CREATE POLICY "Akses Publik Insert" ON public.surat_keluar FOR INSERT WITH CHECK (true);
CREATE POLICY "Akses Publik Update" ON public.surat_keluar FOR UPDATE USING (true);
CREATE POLICY "Akses Publik Delete" ON public.surat_keluar FOR DELETE USING (true);

-- 5. Grant Permissions
GRANT ALL ON TABLE public.surat_keluar TO anon;
GRANT ALL ON TABLE public.surat_keluar TO authenticated;
GRANT ALL ON TABLE public.surat_keluar TO service_role;
