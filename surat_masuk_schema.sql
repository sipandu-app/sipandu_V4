-- MASTER RESET SQL UNTUK SURAT MASUK & STORAGE
-- Jalankan kode ini di SQL Editor Supabase Anda

-- 1. Hapus Tabel Lama (Jika Ada)
DROP TABLE IF EXISTS public.surat_masuk;

-- 2. Buat Tabel surat_masuk Baru
CREATE TABLE public.surat_masuk (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    nomor_surat TEXT,
    asal_surat TEXT,
    perihal TEXT,
    petugas TEXT,
    tgl_surat DATE,
    tgl_terima DATE DEFAULT CURRENT_DATE,
    kategori TEXT DEFAULT 'Umum',
    sifat TEXT DEFAULT 'Biasa',
    jenis TEXT DEFAULT 'Umum',
    status TEXT DEFAULT 'Menunggu Verifikasi',
    file_name TEXT,
    file_url TEXT,
    is_verified BOOLEAN DEFAULT false
);

-- 3. Aktifkan Row Level Security (RLS)
ALTER TABLE public.surat_masuk ENABLE ROW LEVEL SECURITY;

-- 4. Buat Kebijakan Akses Publik (Development Mode)
CREATE POLICY "Akses Publik Select" ON public.surat_masuk FOR SELECT USING (true);
CREATE POLICY "Akses Publik Insert" ON public.surat_masuk FOR INSERT WITH CHECK (true);
CREATE POLICY "Akses Publik Update" ON public.surat_masuk FOR UPDATE USING (true);
CREATE POLICY "Akses Publik Delete" ON public.surat_masuk FOR DELETE USING (true);

-- 5. Konfigurasi Storage (Bucket: pdf)
-- Catatan: Jika bucket sudah ada, bagian ini mungkin memberikan peringatan, abaikan saja.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('pdf', 'pdf', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 6. Kebijakan Storage agar bisa Upload/Download Publik
CREATE POLICY "Storage Select Publik" ON storage.objects FOR SELECT USING (bucket_id = 'pdf');
CREATE POLICY "Storage Insert Publik" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'pdf');
CREATE POLICY "Storage Update Publik" ON storage.objects FOR UPDATE USING (bucket_id = 'pdf');
CREATE POLICY "Storage Delete Publik" ON storage.objects FOR DELETE USING (bucket_id = 'pdf');

-- 7. Grant permissions
GRANT ALL ON TABLE public.surat_masuk TO anon;
GRANT ALL ON TABLE public.surat_masuk TO authenticated;
GRANT ALL ON TABLE public.surat_masuk TO service_role;
