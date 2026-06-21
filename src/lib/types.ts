// CMS Entity Types for AI Handle Admin

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  department: string;
  shortBio: string;
  fullBio: string;
  image: string;
  imageAlt: string;
  phone: string;
  email: string;
  whatsappUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  country: string;
  languages: string[];
  responsibilities: string[];
  displayOrder: number;
  featured: boolean;
  visible: boolean;
  contactButtons: {
    phone: boolean;
    whatsapp: boolean;
    email: boolean;
    linkedin: boolean;
  };
  qrDestination: string;
  qrTitle: string;
  qrSupporting: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageContent {
  hero: {
    eyebrow: string;
    headline: string;
    supportingText: string;
    primaryCta: string;
    secondaryCta: string;
  };
  workforceIntro: {
    headline: string;
    supportingText: string;
  };
  platformControl: {
    headline: string;
    supportingText: string;
  };
  safety: {
    headline: string;
    supportingText: string;
  };
  gulfPositioning: {
    headline: string;
    supportingText: string;
    countries: string[];
  };
  finalCta: {
    headline: string;
    supportingText: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export interface ThemeSettings {
  mode: 'dark' | 'light' | 'system';
  colors: {
    background: string;
    surface: string;
    surfaceHover: string;
    primary: string;
    primaryHover: string;
    accent: string;
    text: string;
    textSecondary: string;
    border: string;
    cardBg: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: string;
  logo: string;
  favicon: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  posterImage: string;
  type: 'mp4' | 'webm' | 'youtube' | 'vimeo' | 'external';
  placement: string[];
  autoplay: boolean;
  loop: boolean;
  controls: boolean;
  muted: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  market: string;
  country: string;
  logo: string;
  website: string;
  description: string;
  permissionToDisplay: boolean;
  publicStatus: 'public' | 'private' | 'anonymous';
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  clientId: string;
  challenge: string;
  solution: string;
  agentsInvolved: string[];
  automationsInvolved: string[];
  images: string[];
  video: string;
  market: string;
  type: string;
  status: 'draft' | 'published' | 'archived';
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document' | 'other';
  size: number;
  alt: string;
  usage: string[];
  uploadedAt: string;
}

export type AdminRole = 'owner' | 'administrator' | 'editor' | 'content_manager' | 'media_manager';

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  permissions: string[];
  createdAt: string;
  lastLogin: string;
}

export interface SiteSettings {
  name: string;
  domain: string;
  tagline: string;
  positioning: string;
  social: {
    instagram: string;
    tiktok: string;
    linkedin: string;
  };
  contact: {
    businessEmail: string;
  };
}
