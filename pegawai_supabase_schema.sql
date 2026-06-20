-- Query SQL untuk membuat tabel pegawai di Supabase Dashboard
-- Buka SQL Editor di Supabase, lalu tempel dan jalankan kode ini:

CREATE TABLE IF NOT EXISTS data_pegawai (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama TEXT NOT NULL,
    nip TEXT,
    nik TEXT,
    tempat_lahir TEXT,
    tanggal_lahir DATE,
    usia INTEGER,
    jenis_kelamin TEXT,
    agama TEXT DEFAULT 'Islam',
    pangkat TEXT DEFAULT '-',
    jabatan TEXT,
    status_kepegawaian TEXT,
    pendidikan TEXT,
    unit_kerja TEXT,
    alamat TEXT,
    no_hp TEXT,
    photo TEXT, -- Menyimpan URL foto atau base64
    is_locked BOOLEAN DEFAULT false, -- Menentukan apakah data dikunci
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Aktifkan Row Level Security (RLS) agar data aman
ALTER TABLE data_pegawai ENABLE ROW LEVEL SECURITY;

-- Buat policy agar semua orang bisa baca/tulis (untuk penggunaan internal/anonim sederhana)
-- Catatan: Untuk produksi yang sangat ketat, Anda bisa membatasi policy ini
CREATE POLICY "Enable all access for all users" ON data_pegawai
    FOR ALL
    USING (true)
    WITH CHECK (true);
