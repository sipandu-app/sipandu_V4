-- Create table for SIPD Main Document
CREATE TABLE IF NOT EXISTS sipd_main_document (
    app_id TEXT PRIMARY KEY,
    pagu JSONB DEFAULT '[]'::jsonb,
    realisasi JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE sipd_main_document ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all access
CREATE POLICY "Allow all access to sipd_main_document" ON sipd_main_document
    FOR ALL
    USING (true)
    WITH CHECK (true);
