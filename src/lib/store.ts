import { isSupabaseConfigured, supabase } from './supabase';
import { robots as defaultRobots } from '../data';
import type { Robot } from '../data';
import type {
  TeamMember, HomepageContent, ThemeSettings, Video,
  Client, Project, MediaFile, AdminUser, SiteSettings
} from './types';

// ─── Local Storage Keys ───
const KEYS = {
  ROBOTS: 'aihandle_cms_robots',
  TEAM: 'aihandle_cms_team',
  HOMEPAGE: 'aihandle_cms_homepage',
  THEME: 'aihandle_cms_theme',
  VIDEOS: 'aihandle_cms_videos',
  CLIENTS: 'aihandle_cms_clients',
  PROJECTS: 'aihandle_cms_projects',
  MEDIA: 'aihandle_cms_media',
  ADMIN_USERS: 'aihandle_cms_admin_users',
  SETTINGS: 'aihandle_cms_settings',
};

// ─── Default Data ───
const defaultTeamMembers: TeamMember[] = [
  {
    id: 'omar-mohamed',
    name: 'Omar Mohamed',
    title: 'Founder of AI Handle',
    department: 'Leadership',
    shortBio: 'Omar Mohamed founded AI Handle to help businesses deploy practical AI agents, automations, websites, communication systems, and growth infrastructure directly into their operations.',
    fullBio: 'Omar Mohamed founded AI Handle to help businesses move beyond disconnected software and deploy coordinated AI systems directly into their real operations. His focus is building practical AI agents, automations, websites, lead-generation systems, and growth infrastructure that help teams operate more efficiently and scale.',
    image: '/brand/omar-mohamed.png',
    imageAlt: 'Omar Mohamed — Founder of AI Handle',
    phone: '+971 50 803 3084',
    email: 'AIHandle.cloud@gmail.com',
    whatsappUrl: 'https://wa.me/971508033084',
    linkedinUrl: 'https://www.linkedin.com/in/omar-elgar7y-69a763208',
    instagramUrl: '',
    country: 'UAE',
    languages: ['English', 'Arabic'],
    responsibilities: [
      'Company strategy and vision',
      'AI system architecture',
      'Client relationships',
      'Business development',
    ],
    displayOrder: 1,
    featured: true,
    visible: true,
    contactButtons: { phone: true, whatsapp: true, email: true, linkedin: true },
    qrDestination: 'https://aihandle.cloud/omar.html',
    qrTitle: "Scan to Speak With Omar",
    qrSupporting: "Scan the QR code to view Omar Mohamed's full profile and connect directly.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mohamed-rayan',
    name: 'Mohamed Rayan',
    title: 'Sales Manager at AI Handle',
    department: 'Sales',
    shortBio: 'Mohamed Rayan manages sales operations at AI Handle, helping businesses understand how AI agents and automations can improve their operations.',
    fullBio: 'Mohamed Rayan manages sales operations at AI Handle, helping businesses across the UAE and Gulf understand how AI agents, automations, and growth infrastructure can improve their communication, operations, and customer experience.',
    image: '/brand/mohamed-rayan.jpg',
    imageAlt: 'Mohamed Rayan — Sales Manager at AI Handle',
    phone: '+971 54 553 0754',
    email: 'mrayhan2005m@gmail.com',
    whatsappUrl: 'https://wa.me/971545530754',
    linkedinUrl: '',
    instagramUrl: '',
    country: 'UAE',
    languages: ['English', 'Arabic'],
    responsibilities: [
      'Client consultations',
      'Sales process management',
      'Lead qualification',
      'Proposal preparation',
    ],
    displayOrder: 2,
    featured: true,
    visible: true,
    contactButtons: { phone: true, whatsapp: true, email: true, linkedin: false },
    qrDestination: 'https://aihandle.cloud/rayan.html',
    qrTitle: "Scan to Speak With Our Sales Manager",
    qrSupporting: "Scan the QR code to view Mohamed Rayan's full profile and connect directly.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const defaultHomepage: HomepageContent = {
  hero: {
    eyebrow: 'UAE-Based AI Agency Serving the Gulf',
    headline: 'Imagine a Team That Never Sleeps.',
    supportingText: 'Imagine having a coordinated digital team working for your business around the clock. Each AI agent has one specific responsibility, approved tools, clear permissions, operational limits, and a complete activity history.',
    primaryCta: 'Build Your AI Team',
    secondaryCta: 'Watch the System Demo',
  },
  workforceIntro: {
    headline: 'Meet the Team Working Behind Your Business',
    supportingText: 'One agent handles enquiries. One qualifies leads. One manages the CRM. One prepares follow-ups. One researches opportunities. One creates content. One monitors operations. One prepares reports. Above them, an AI Orchestrator coordinates the entire team.',
  },
  platformControl: {
    headline: 'Control Your AI Team From One Place',
    supportingText: 'You are not giving control away. You are gaining clearer control over the operation.',
  },
  safety: {
    headline: 'Powerful Automation. Human Authority.',
    supportingText: 'AI should increase control, not remove it.',
  },
  gulfPositioning: {
    headline: 'Based in the UAE. Supporting businesses across the Gulf and globally.',
    supportingText: 'We work with responsible businesses where AI can improve communication, operations, customer handling, lead management, content, or reporting.',
    countries: ['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'],
  },
  finalCta: {
    headline: 'Build the Team That Never Sleeps.',
    supportingText: 'Start with one specialised agent, automate one workflow, or build a complete digital workforce around your business.',
    primaryCta: 'Build My AI Team',
    secondaryCta: 'Watch the Demo',
  },
};

const defaultTheme: ThemeSettings = {
  mode: 'dark',
  colors: {
    background: '#0A0A0A',
    surface: '#111111',
    surfaceHover: '#1A1A1A',
    primary: '#C9A96E',
    primaryHover: '#D4B881',
    accent: '#8B7355',
    text: '#F5F0EB',
    textSecondary: '#8A8478',
    border: 'rgba(255,255,255,0.08)',
    cardBg: '#111111',
  },
  fonts: {
    heading: 'Manrope',
    body: 'Inter',
  },
  borderRadius: '0.75rem',
  logo: '/brand/ai-handle-logo.png',
  favicon: '/brand/favicon.ico',
};

const defaultSettings: SiteSettings = {
  name: 'AI Handle',
  domain: 'aihandle.cloud',
  tagline: 'AI Agents, Automations and Growth Systems.',
  positioning: 'A UAE-based AI agency serving businesses across the Gulf and internationally.',
  social: {
    instagram: 'https://instagram.com/aihandle.cloud',
    tiktok: 'https://tiktok.com/@aihandle.cloud',
    linkedin: '',
  },
  contact: {
    businessEmail: 'AIHandle.cloud@gmail.com',
  },
};

// ─── Seed Local Storage ───
function seedLocalStorage() {
  const seeds: [string, unknown[] | object][] = [
    [KEYS.ROBOTS, defaultRobots],
    [KEYS.TEAM, defaultTeamMembers],
    [KEYS.HOMEPAGE, defaultHomepage],
    [KEYS.THEME, defaultTheme],
    [KEYS.VIDEOS, []],
    [KEYS.CLIENTS, []],
    [KEYS.PROJECTS, []],
    [KEYS.MEDIA, []],
    [KEYS.ADMIN_USERS, []],
    [KEYS.SETTINGS, defaultSettings],
  ];
  seeds.forEach(([key, data]) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  });
}
seedLocalStorage();

// ─── Helpers ───
function localGet<T>(key: string): T[] {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}
function localSet<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}
function localGetObject<T>(key: string, fallback: T): T {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : fallback;
}
function localSetObject<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ─── CMS Store ───
export const CmsStore = {
  // ── Robots ──
  getRobots: async (): Promise<Robot[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('robots').select('*').order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
      return data || [];
    }
    return localGet<Robot>(KEYS.ROBOTS);
  },

  saveRobot: async (robot: Robot): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('robots').upsert(robot);
      if (error) { console.error('Supabase error:', error); return false; }
      return true;
    }
    const robots = await CmsStore.getRobots();
    const idx = robots.findIndex(r => r.id === robot.id);
    if (idx > -1) robots[idx] = robot; else robots.push(robot);
    localSet(KEYS.ROBOTS, robots);
    return true;
  },

  // ── Team Members ──
  getTeamMembers: async (): Promise<TeamMember[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('team_members').select('*').order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    }
    // Always fall back to localStorage defaults so team pages never break
    const local = localGet<TeamMember>(KEYS.TEAM);
    return local.length > 0 ? local : defaultTeamMembers;
  },

  getTeamMember: async (id: string): Promise<TeamMember | null> => {
    // First check hardcoded defaults — these always work
    const hardcoded = defaultTeamMembers.find(m => m.id === id);
    if (hardcoded) return hardcoded;
    // Then check Supabase / localStorage
    const members = await CmsStore.getTeamMembers();
    return members.find(m => m.id === id) || null;
  },

  saveTeamMember: async (member: TeamMember): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('team_members').upsert(member);
      if (error) { console.error('Supabase error:', error); return false; }
      return true;
    }
    const members = await CmsStore.getTeamMembers();
    const idx = members.findIndex(m => m.id === member.id);
    member.updatedAt = new Date().toISOString();
    if (idx > -1) members[idx] = member; else members.push(member);
    localSet(KEYS.TEAM, members);
    return true;
  },

  deleteTeamMember: async (id: string): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) { console.error('Supabase error:', error); return false; }
      return true;
    }
    const members = await CmsStore.getTeamMembers();
    localSet(KEYS.TEAM, members.filter(m => m.id !== id));
    return true;
  },

  reorderTeamMembers: async (orderedIds: string[]): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const client = supabase;
      const updates = orderedIds.map((id, index) =>
        client.from('team_members').update({ display_order: index + 1 }).eq('id', id)
      );
      await Promise.all(updates);
      return true;
    }
    const members = await CmsStore.getTeamMembers();
    orderedIds.forEach((id, index) => {
      const member = members.find(m => m.id === id);
      if (member) member.displayOrder = index + 1;
    });
    localSet(KEYS.TEAM, members);
    return true;
  },

  // ── Homepage Content ──
  getHomepage: async (): Promise<HomepageContent> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('homepage').select('*').single();
      if (error || !data) return defaultHomepage;
      return data.content || defaultHomepage;
    }
    return localGetObject<HomepageContent>(KEYS.HOMEPAGE, defaultHomepage);
  },

  saveHomepage: async (content: HomepageContent): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('homepage').upsert({ id: 'main', content });
      if (error) { console.error('Supabase error:', error); return false; }
      return true;
    }
    localSetObject(KEYS.HOMEPAGE, content);
    return true;
  },

  // ── Theme Settings ──
  getTheme: async (): Promise<ThemeSettings> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('theme').select('*').single();
      if (error || !data) return defaultTheme;
      return data.settings || defaultTheme;
    }
    return localGetObject<ThemeSettings>(KEYS.THEME, defaultTheme);
  },

  saveTheme: async (settings: ThemeSettings): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('theme').upsert({ id: 'main', settings });
      if (error) { console.error('Supabase error:', error); return false; }
      return true;
    }
    localSetObject(KEYS.THEME, settings);
    return true;
  },

  // ── Videos ──
  getVideos: async (): Promise<Video[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
      if (error) { console.error('Supabase error:', error); return []; }
      return data || [];
    }
    return localGet<Video>(KEYS.VIDEOS);
  },

  saveVideo: async (video: Video): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('videos').upsert(video);
      if (error) { console.error('Supabase error:', error); return false; }
      return true;
    }
    const videos = await CmsStore.getVideos();
    const idx = videos.findIndex(v => v.id === video.id);
    video.updatedAt = new Date().toISOString();
    if (idx > -1) videos[idx] = video; else videos.push(video);
    localSet(KEYS.VIDEOS, videos);
    return true;
  },

  deleteVideo: async (id: string): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('videos').delete().eq('id', id);
      if (error) { console.error('Supabase error:', error); return false; }
      return true;
    }
    const videos = await CmsStore.getVideos();
    localSet(KEYS.VIDEOS, videos.filter(v => v.id !== id));
    return true;
  },

  // ── Clients ──
  getClients: async (): Promise<Client[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
      if (error) { console.error('Supabase error:', error); return []; }
      return data || [];
    }
    return localGet<Client>(KEYS.CLIENTS);
  },

  saveClient: async (client: Client): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('clients').upsert(client);
      if (error) { console.error('Supabase error:', error); return false; }
      return true;
    }
    const clients = await CmsStore.getClients();
    const idx = clients.findIndex(c => c.id === client.id);
    client.updatedAt = new Date().toISOString();
    if (idx > -1) clients[idx] = client; else clients.push(client);
    localSet(KEYS.CLIENTS, clients);
    return true;
  },

  deleteClient: async (id: string): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('clients').delete().eq('id', id);
      if (error) { console.error('Supabase error:', error); return false; }
      return true;
    }
    const clients = await CmsStore.getClients();
    localSet(KEYS.CLIENTS, clients.filter(c => c.id !== id));
    return true;
  },

  // ── Projects ──
  getProjects: async (): Promise<Project[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
      return data || [];
    }
    return localGet<Project>(KEYS.PROJECTS);
  },

  saveProject: async (project: Project): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('projects').upsert(project);
      if (error) { console.error('Supabase error:', error); return false; }
      return true;
    }
    const projects = await CmsStore.getProjects();
    const idx = projects.findIndex(p => p.id === project.id);
    project.updatedAt = new Date().toISOString();
    if (idx > -1) projects[idx] = project; else projects.push(project);
    localSet(KEYS.PROJECTS, projects);
    return true;
  },

  deleteProject: async (id: string): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) { console.error('Supabase error:', error); return false; }
      return true;
    }
    const projects = await CmsStore.getProjects();
    localSet(KEYS.PROJECTS, projects.filter(p => p.id !== id));
    return true;
  },

  // ── Media Library ──
  getMedia: async (): Promise<MediaFile[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('media').select('*').order('uploaded_at', { ascending: false });
      if (error) { console.error('Supabase error:', error); return []; }
      return data || [];
    }
    return localGet<MediaFile>(KEYS.MEDIA);
  },

  saveMedia: async (file: MediaFile): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('media').upsert(file);
      if (error) { console.error('Supabase error:', error); return false; }
      return true;
    }
    const media = await CmsStore.getMedia();
    media.unshift(file);
    localSet(KEYS.MEDIA, media);
    return true;
  },

  deleteMedia: async (id: string): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('media').delete().eq('id', id);
      if (error) { console.error('Supabase error:', error); return false; }
      return true;
    }
    const media = await CmsStore.getMedia();
    localSet(KEYS.MEDIA, media.filter(m => m.id !== id));
    return true;
  },

  // ── Site Settings ──
  getSettings: async (): Promise<SiteSettings> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('settings').select('*').single();
      if (error || !data) return defaultSettings;
      return data.settings || defaultSettings;
    }
    return localGetObject<SiteSettings>(KEYS.SETTINGS, defaultSettings);
  },

  saveSettings: async (settings: SiteSettings): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('settings').upsert({ id: 'main', settings });
      if (error) { console.error('Supabase error:', error); return false; }
      return true;
    }
    localSetObject(KEYS.SETTINGS, settings);
    return true;
  },

  // ── Admin Users (local only — Supabase auth manages real users) ──
  getAdminUsers: async (): Promise<AdminUser[]> => {
    return localGet<AdminUser>(KEYS.ADMIN_USERS);
  },
};
