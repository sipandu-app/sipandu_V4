-- Skema Database untuk Manajemen KP & KGB
-- Menjalankan ini di Supabase SQL Editor

CREATE TABLE IF NOT EXISTS data_kp_kgb (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama TEXT NOT NULL,
    nip TEXT,
    pangkat TEXT,
    tmt_pangkat DATE,
    tanggal_lahir DATE,
    gaji_berkala BIGINT DEFAULT 0,
    tmt_gaji DATE,
    npwp TEXT,
    rek_bank TEXT,
    ktp_data TEXT, -- Base64 atau URL gambar
    kk_data TEXT,  -- Base64 atau URL gambar
    order_index INTEGER DEFAULT 0,
    is_locked BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE data_kp_kgb ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses (Policy) - Semua akses diizinkan untuk kemudahan internal
DROP POLICY IF EXISTS "Enable all access for all users" ON data_kp_kgb;
CREATE POLICY "Enable all access for all users" ON data_kp_kgb
    FOR ALL
    USING (true)
    WITH CHECK (true);
