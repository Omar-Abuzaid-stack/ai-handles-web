-- Vantility CMS Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Create tables
CREATE TABLE public.site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_name text DEFAULT 'Vantility',
  short_description text,
  main_email text,
  phone text,
  whatsapp_link text,
  booking_link text,
  telegram_link text,
  footer_copyright text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.robots (
  id text PRIMARY KEY,
  name text NOT NULL,
  acronym text,
  title text,
  department text,
  floor text,
  image text,
  tagline text,
  description text,
  responsibilities jsonb DEFAULT '[]'::jsonb,
  human_escalation text,
  modes jsonb DEFAULT '[]'::jsonb,
  pillars jsonb DEFAULT '[]'::jsonb,
  notes jsonb DEFAULT '[]'::jsonb,
  workflow jsonb DEFAULT '[]'::jsonb,
  is_published boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.clients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  display_name text,
  category text,
  industry text,
  country text,
  website text,
  logo text,
  cover_image text,
  short_description text,
  visibility text DEFAULT 'public', -- 'public', 'private', 'hidden'
  permission_to_display boolean DEFAULT false,
  private_note text,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid REFERENCES public.clients(id),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  public_client_name text,
  category text,
  country text,
  business_challenge text,
  vantility_solution text,
  agents_included jsonb DEFAULT '[]'::jsonb,
  automations_included jsonb DEFAULT '[]'::jsonb,
  services_included jsonb DEFAULT '[]'::jsonb,
  project_status text,
  project_type text, -- 'Live Client Project', 'Demonstration', etc.
  cover_image text,
  gallery jsonb DEFAULT '[]'::jsonb,
  demo_video text,
  results jsonb DEFAULT '[]'::jsonb,
  disclaimer text,
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name text NOT NULL,
  role text,
  company text,
  country text,
  feedback text NOT NULL,
  project_id uuid REFERENCES public.projects(id),
  client_image text,
  company_logo text,
  video_url text,
  permission_to_publish boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  is_published boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.videos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  source_type text, -- 'upload', 'youtube', 'vimeo', 'url'
  url text NOT NULL,
  poster_image text,
  placement text, -- 'hero', 'lobby', 'gallery'
  is_published boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Setup Row Level Security (RLS)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.robots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies
-- Read access for public on published/visible records
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view published robots" ON public.robots FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view visible clients" ON public.clients FOR SELECT USING (visibility = 'public' AND permission_to_display = true);
CREATE POLICY "Public can view published projects" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING (is_published = true AND permission_to_publish = true);
CREATE POLICY "Public can view published videos" ON public.videos FOR SELECT USING (is_published = true);

-- Write access for authenticated admins only
CREATE POLICY "Admins can insert site settings" ON public.site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update site settings" ON public.site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete site settings" ON public.site_settings FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert robots" ON public.robots FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update robots" ON public.robots FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete robots" ON public.robots FOR DELETE USING (auth.role() = 'authenticated');
-- (Repeat for clients, projects, testimonials, videos)
CREATE POLICY "Admins can manage clients" ON public.clients USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage projects" ON public.projects USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage testimonials" ON public.testimonials USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage videos" ON public.videos USING (auth.role() = 'authenticated');

-- 4. Setup Storage
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

CREATE POLICY "Media objects are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Authenticated users can upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update media" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
