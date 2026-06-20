-- SQL Schema untuk Monitoring Rehabilitasi Sosial (Mutasi PM)
-- Jalankan kode ini di SQL Editor Supabase

-- 1. Hapus Tabel Lama (Jika Ada)
DROP TABLE IF EXISTS public.mutasi_pm;

-- 2. Buat Tabel mutasi_pm
CREATE TABLE public.mutasi_pm (
    id TEXT PRIMARY KEY,
    unit_pelayanan TEXT NOT NULL,
    bulan_tahun TEXT NOT NULL,
    jumlah_awal INTEGER DEFAULT 0,
    pm_masuk INTEGER DEFAULT 0,
    pm_keluar INTEGER DEFAULT 0,
    jumlah_akhir INTEGER DEFAULT 0,
    catatan TEXT,
    pdf_url TEXT,
    pdf_name TEXT,
    public_id TEXT,
    file_type TEXT,
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Aktifkan Row Level Security (RLS)
ALTER TABLE public.mutasi_pm ENABLE ROW LEVEL SECURITY;

-- 4. Buat Kebijakan Akses Publik (Development Mode)
CREATE POLICY "Akses Publik Select" ON public.mutasi_pm FOR SELECT USING (true);
CREATE POLICY "Akses Publik Insert" ON public.mutasi_pm FOR INSERT WITH CHECK (true);
CREATE POLICY "Akses Publik Update" ON public.mutasi_pm FOR UPDATE USING (true);
CREATE POLICY "Akses Publik Delete" ON public.mutasi_pm FOR DELETE USING (true);

-- 5. Grant permissions
GRANT ALL ON TABLE public.mutasi_pm TO anon;
GRANT ALL ON TABLE public.mutasi_pm TO authenticated;
GRANT ALL ON TABLE public.mutasi_pm TO service_role;
