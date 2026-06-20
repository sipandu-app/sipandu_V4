-- Skema Database untuk Sistem Monitoring Kesehatan PM (YASEHATI)
-- Tambahkan ekstensi uuid-ossp jika belum ada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabel 1: Master Data Penerima Manfaat (PM)
CREATE TABLE IF NOT EXISTS pm_list (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reg TEXT UNIQUE NOT NULL, -- Nomor Registrasi
    name TEXT NOT NULL, -- Nama Lengkap
    pob TEXT, -- Tempat Lahir
    dob DATE, -- Tanggal Lahir
    unit TEXT, -- Unit Pelayanan (Raharjo, Mojomulyo, dll)
    status TEXT DEFAULT 'Aktif', -- Aktif / Tidak Aktif
    family TEXT, -- Penanggung Jawab & Kontak
    chronic_illness TEXT, -- Riwayat Penyakit Penyerta
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel 2: Data Pemeriksaan Kesehatan Harian
CREATE TABLE IF NOT EXISTS kesehatan_harian (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pm_id UUID REFERENCES pm_list(id) ON DELETE CASCADE, -- Relasi ke Tabel PM
    date DATE NOT NULL, -- Tanggal Pemeriksaan
    td TEXT, -- Tensi (Tingkat Darah, misal: 120/80)
    hr INTEGER, -- Heart Rate (Detak Jantung)
    temp DECIMAL(4,1), -- Suhu Tubuh (misal: 36.5)
    weight DECIMAL(5,1), -- Berat Badan
    sugar INTEGER, -- Gula Darah (GDS)
    status TEXT, -- Kondisi Umum (Stabil, Observasi, Rujuk)
    complaint TEXT, -- Catatan Keluhan / Tindakan
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk mempercepat pencarian (hanya dibuat jika belum ada)
CREATE INDEX IF NOT EXISTS idx_kesehatan_pm_id ON kesehatan_harian(pm_id);
CREATE INDEX IF NOT EXISTS idx_kesehatan_date ON kesehatan_harian(date);
CREATE INDEX IF NOT EXISTS idx_pm_unit ON pm_list(unit);
