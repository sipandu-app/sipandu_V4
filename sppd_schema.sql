-- KODE SQL UNTUK TABEL SPPD (REKAPITULASI OPERASIONAL)
-- Jalankan di SQL Editor Supabase Anda

-- 1. Buat tabel jika belum ada
CREATE TABLE IF NOT EXISTS sppd_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tanggal_bp DATE NOT NULL,
    no_bp TEXT,
    ssk TEXT NOT NULL,
    kegiatan TEXT,
    penerima TEXT[] DEFAULT '{}',
    sppd DECIMAL DEFAULT 0,
    bensin DECIMAL DEFAULT 0,
    tol DECIMAL DEFAULT 0,
    hotel DECIMAL DEFAULT 0,
    total DECIMAL DEFAULT 0,
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Pastikan kolom-kolom baru ada (Migrasi jika tabel sudah ada versi lama)
ALTER TABLE sppd_data ADD COLUMN IF NOT EXISTS bensin DECIMAL DEFAULT 0;
ALTER TABLE sppd_data ADD COLUMN IF NOT EXISTS tol DECIMAL DEFAULT 0;
ALTER TABLE sppd_data ADD COLUMN IF NOT EXISTS hotel DECIMAL DEFAULT 0;
ALTER TABLE sppd_data ADD COLUMN IF NOT EXISTS total DECIMAL DEFAULT 0;
ALTER TABLE sppd_data ADD COLUMN IF NOT EXISTS no_bp TEXT;
ALTER TABLE sppd_data ADD COLUMN IF NOT EXISTS kegiatan TEXT;

-- 3. Aktifkan RLS
ALTER TABLE sppd_data ENABLE ROW LEVEL SECURITY;

-- 4. Policy Akses Publik (Hapus dulu jika sudah ada untuk menghindari duplikasi)
DROP POLICY IF EXISTS "Akses Publik SPPD Data" ON sppd_data;
CREATE POLICY "Akses Publik SPPD Data" 
ON sppd_data FOR ALL 
USING (true) 
WITH CHECK (true);

-- 5. Indeks untuk performa
CREATE INDEX IF NOT EXISTS idx_sppd_tgl ON sppd_data(tanggal_bp);
CREATE INDEX IF NOT EXISTS idx_sppd_no ON sppd_data(no_bp);
CREATE INDEX IF NOT EXISTS idx_sppd_ssk ON sppd_data(ssk);
