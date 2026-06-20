-- KODE SQL UNTUK TABEL BELANJA LAINNYA
-- Jalankan di SQL Editor Supabase Anda

-- 1. Buat Tabel belanja_lainnya
CREATE TABLE IF NOT EXISTS belanja_lainnya (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_kerja TEXT NOT NULL,
    tanggal_belanja DATE NOT NULL,
    nomor_bp TEXT,
    jenis_pakaian TEXT, -- Digunakan sebagai Kategori Belanja
    uraian TEXT NOT NULL,
    penyedia TEXT,
    penerima_barang TEXT,
    volume DECIMAL DEFAULT 1,
    satuan TEXT DEFAULT 'Unit',
    harga_satuan DECIMAL DEFAULT 0,
    nominal DECIMAL DEFAULT 0,
    photos TEXT[] DEFAULT '{}', -- Array URL foto dari Cloudinary
    document_url TEXT, -- URL PDF dari Cloudinary
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE belanja_lainnya ENABLE ROW LEVEL SECURITY;

-- 3. Buat Policy Akses Publik (Supaya bisa diakses dari aplikasi)
CREATE POLICY "Akses Publik Belanja Lainnya" 
ON belanja_lainnya FOR ALL 
USING (true) 
WITH CHECK (true);

-- 4. Indeks untuk optimasi pencarian
CREATE INDEX IF NOT EXISTS idx_belanja_lain_unit ON belanja_lainnya(unit_kerja);
CREATE INDEX IF NOT EXISTS idx_belanja_lain_tanggal ON belanja_lainnya(tanggal_belanja);
CREATE INDEX IF NOT EXISTS idx_belanja_lain_kategori ON belanja_lainnya(jenis_pakaian);

-- Catatan: Jika Anda ingin menggunakan nama kolom yang berbeda, silakan sesuaikan di file belanja_lain.html nanti.
