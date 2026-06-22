-- AI Handle CMS Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Create tables

-- Site settings
CREATE TABLE public.site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_name text DEFAULT 'AI Handle',
  tagline text,
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

-- AI Agents / Robots
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

-- Clients
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
  visibility text DEFAULT 'public',
  permission_to_display boolean DEFAULT false,
  private_note text,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Projects
CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid REFERENCES public.clients(id),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  public_client_name text,
  category text,
  country text,
  business_challenge text,
  ai_solution text,
  agents_included jsonb DEFAULT '[]'::jsonb,
  automations_included jsonb DEFAULT '[]'::jsonb,
  services_included jsonb DEFAULT '[]'::jsonb,
  project_status text,
  project_type text,
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

-- Testimonials
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

-- Videos
CREATE TABLE public.videos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  source_type text,
  url text NOT NULL,
  poster_image text,
  placement text,
  is_published boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Team Members
CREATE TABLE public.team_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  title text NOT NULL,
  nationality text,
  phone text,
  email text,
  linkedin_url text,
  whatsapp_url text,
  image text,
  image_alt text,
  bio text,
  responsibilities jsonb DEFAULT '[]'::jsonb,
  languages jsonb DEFAULT '[]'::jsonb,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT false,
  is_founder boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Site Knowledge Chunks (for ChatBot grounding)
CREATE TABLE public.site_knowledge_chunks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  source_url text,
  tags jsonb DEFAULT '[]'::jsonb,
  is_published boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Contact Submissions
CREATE TABLE public.contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Chat Sessions
CREATE TABLE public.chat_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text UNIQUE NOT NULL,
  ip_address text,
  user_agent text,
  message_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Chat Messages
CREATE TABLE public.chat_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text REFERENCES public.chat_sessions(session_id),
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Notification Events
CREATE TABLE public.notification_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type text NOT NULL,
  source text,
  payload jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'pending',
  sent_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Integration Settings
CREATE TABLE public.integration_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  service text UNIQUE NOT NULL,
  display_name text,
  is_configured boolean DEFAULT false,
  status text DEFAULT 'disconnected',
  config jsonb DEFAULT '{}'::jsonb,
  last_checked_at timestamp with time zone,
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
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_knowledge_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integration_settings ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies

-- Public read access for published/visible records
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view published robots" ON public.robots FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view visible clients" ON public.clients FOR SELECT USING (visibility = 'public' AND permission_to_display = true);
CREATE POLICY "Public can view published projects" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING (is_published = true AND permission_to_publish = true);
CREATE POLICY "Public can view published videos" ON public.videos FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published team members" ON public.team_members FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published knowledge" ON public.site_knowledge_chunks FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone can insert contact submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Authenticated read/write for all tables
CREATE POLICY "Admins can read all site settings" ON public.site_settings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can insert site settings" ON public.site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update site settings" ON public.site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete site settings" ON public.site_settings FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage robots" ON public.robots USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage clients" ON public.clients USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage projects" ON public.projects USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage testimonials" ON public.testimonials USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage videos" ON public.videos USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage team members" ON public.team_members USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage knowledge" ON public.site_knowledge_chunks USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage contact submissions" ON public.contact_submissions USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage chat data" ON public.chat_sessions USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage chat messages" ON public.chat_messages USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage notifications" ON public.notification_events USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage integrations" ON public.integration_settings USING (auth.role() = 'authenticated');

-- 4. Setup Storage
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Media objects are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Authenticated users can upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update media" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- 5. Insert default integration records
INSERT INTO public.integration_settings (service, display_name, status) VALUES
  ('supabase', 'Supabase Database', 'disconnected'),
  ('mistral', 'Mistral AI', 'disconnected'),
  ('telegram', 'Telegram Bot', 'disconnected'),
  ('jarvis', 'Jarvis Command Center', 'disconnected')
ON CONFLICT (service) DO NOTHING;
