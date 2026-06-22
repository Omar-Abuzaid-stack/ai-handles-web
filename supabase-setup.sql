-- AI Handle Supabase Database Setup
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════
-- 1. ROBOTS (AI Agent data)
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS robots (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  acronym TEXT NOT NULL,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  floor TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  tagline TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  responsibilities JSONB NOT NULL DEFAULT '[]',
  humanEscalation TEXT NOT NULL DEFAULT '',
  modes JSONB DEFAULT '[]',
  pillars JSONB DEFAULT '[]',
  notes JSONB DEFAULT '[]',
  workflow JSONB DEFAULT '[]',
  display_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══════════════════════════════════════════
-- 2. TEAM MEMBERS
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  department TEXT NOT NULL DEFAULT '',
  shortBio TEXT NOT NULL DEFAULT '',
  fullBio TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  imageAlt TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  whatsappUrl TEXT NOT NULL DEFAULT '',
  linkedinUrl TEXT NOT NULL DEFAULT '',
  instagramUrl TEXT NOT NULL DEFAULT '',
  tiktokUrl TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT '',
  languages JSONB DEFAULT '[]',
  responsibilities JSONB DEFAULT '[]',
  displayOrder INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT false,
  visible BOOLEAN NOT NULL DEFAULT true,
  contactButtons JSONB NOT NULL DEFAULT '{"phone":true,"whatsapp":true,"email":true,"linkedin":true}',
  qrDestination TEXT NOT NULL DEFAULT '',
  qrTitle TEXT NOT NULL DEFAULT '',
  qrSupporting TEXT NOT NULL DEFAULT '',
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══════════════════════════════════════════
-- 3. HOMEPAGE CONTENT
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS homepage (
  id TEXT PRIMARY KEY DEFAULT 'main',
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══════════════════════════════════════════
-- 4. THEME SETTINGS
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS theme (
  id TEXT PRIMARY KEY DEFAULT 'main',
  settings JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══════════════════════════════════════════
-- 5. VIDEOS
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  videoUrl TEXT NOT NULL DEFAULT '',
  posterImage TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'demo',
  displayOrder INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══════════════════════════════════════════
-- 6. CLIENTS
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  industry TEXT NOT NULL DEFAULT '',
  market TEXT NOT NULL DEFAULT '',
  logo TEXT NOT NULL DEFAULT '',
  website TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  visible BOOLEAN NOT NULL DEFAULT true,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══════════════════════════════════════════
-- 7. PROJECTS
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  clientType TEXT NOT NULL DEFAULT '',
  market TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  tags JSONB DEFAULT '[]',
  desc TEXT NOT NULL DEFAULT '',
  mockupType TEXT NOT NULL DEFAULT 'mobile',
  challenge TEXT NOT NULL DEFAULT '',
  solution TEXT NOT NULL DEFAULT '',
  images JSONB DEFAULT '[]',
  videoUrl TEXT NOT NULL DEFAULT '',
  visible BOOLEAN NOT NULL DEFAULT true,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══════════════════════════════════════════
-- 8. MEDIA LIBRARY
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'image',
  size INTEGER NOT NULL DEFAULT 0,
  folder TEXT NOT NULL DEFAULT '',
  alt TEXT NOT NULL DEFAULT '',
  uploadedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══════════════════════════════════════════
-- 9. SITE SETTINGS
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  settings JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══════════════════════════════════════════
-- 10. CONTACT SUBMISSIONS
-- ═══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  message TEXT NOT NULL,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════
ALTER TABLE robots ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can read published data)
CREATE POLICY "Public can read robots" ON robots FOR SELECT USING (visible = true);
CREATE POLICY "Public can read team" ON team_members FOR SELECT USING (visible = true);
CREATE POLICY "Public can read homepage" ON homepage FOR SELECT USING (true);
CREATE POLICY "Public can read theme" ON theme FOR SELECT USING (true);
CREATE POLICY "Public can read videos" ON videos FOR SELECT USING (visible = true);
CREATE POLICY "Public can read clients" ON clients FOR SELECT USING (visible = true);
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (visible = true);
CREATE POLICY "Public can read settings" ON settings FOR SELECT USING (true);

-- Contact form: anyone can insert
CREATE POLICY "Anyone can submit contact" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Authenticated admin full access
CREATE POLICY "Admin full access robots" ON robots FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access team" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access homepage" ON homepage FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access theme" ON theme FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access videos" ON videos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access clients" ON clients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access media" ON media FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access settings" ON settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access contacts" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');

-- ═══════════════════════════════════════════
-- UPDATED_AT TRIGGER
-- ═══════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_robots_updated_at BEFORE UPDATE ON robots FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_team_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_homepage_updated_at BEFORE UPDATE ON homepage FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_theme_updated_at BEFORE UPDATE ON theme FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ═══════════════════════════════════════════
-- CREATE ADMIN USER
-- ═══════════════════════════════════════════
-- Note: Create this user via Supabase Dashboard > Auth > Users
-- Email: admin@aihandle.cloud
-- Password: AIHandle123456666
-- Or use the Supabase Auth Admin API after setup

SELECT 'Database setup complete!' as status;
