import { Phone, Mail, MessageCircle, Linkedin, Instagram } from 'lucide-react';

/** TikTok SVG icon (lucide-react doesn't include TikTok) */
export function TikTokIcon({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.28 8.28 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.28z" />
    </svg>
  );
}

interface SocialIconRowProps {
  whatsappUrl: string;
  phoneRaw: string;
  email: string;
  linkedinUrl?: string;
}

/** Colored circular icon buttons for team member cards */
export function SocialIconRow({ whatsappUrl, phoneRaw, email, linkedinUrl }: SocialIconRowProps) {
  return (
    <div className="flex items-center gap-2.5">
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-all" aria-label="WhatsApp">
        <MessageCircle size={13} />
      </a>
      <a href={`tel:${phoneRaw}`} className="w-8 h-8 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center text-purple hover:bg-purple/20 transition-all" aria-label="Call">
        <Phone size={13} />
      </a>
      <a href={`mailto:${email}`} className="w-8 h-8 rounded-full bg-red-400/10 border border-red-400/20 flex items-center justify-center text-red-400 hover:bg-red-400/20 transition-all" aria-label="Email">
        <Mail size={13} />
      </a>
      {linkedinUrl && (
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-400/10 border border-blue-400/20 flex items-center justify-center text-blue-400 hover:bg-blue-400/20 transition-all" aria-label="LinkedIn">
          <Linkedin size={13} />
        </a>
      )}
    </div>
  );
}

/** Labeled social connection pill buttons for contact sections */
export function SocialConnectPills({ whatsappUrl, phoneRaw, email, linkedinUrl, instagramUrl, tiktokUrl }: {
  whatsappUrl: string; phoneRaw: string; email: string;
  linkedinUrl?: string; instagramUrl?: string; tiktokUrl?: string;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-body hover:bg-green-500/20 transition-all">
        <MessageCircle size={14} /> WhatsApp
      </a>
      <a href={`mailto:${email}`} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-400/10 border border-red-400/20 text-red-400 text-sm font-body hover:bg-red-400/20 transition-all">
        <Mail size={14} /> Gmail
      </a>
      <a href={`tel:${phoneRaw}`} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple/10 border border-purple/20 text-purple text-sm font-body hover:bg-purple/20 transition-all">
        <Phone size={14} /> Phone
      </a>
      {linkedinUrl && (
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-400 text-sm font-body hover:bg-blue-400/20 transition-all">
          <Linkedin size={14} /> LinkedIn
        </a>
      )}
      {instagramUrl && (
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-pink-400/10 border border-pink-400/20 text-pink-400 text-sm font-body hover:bg-pink-400/20 transition-all">
          <Instagram size={14} /> Instagram
        </a>
      )}
      {tiktokUrl && (
        <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-body hover:bg-white/10 transition-all">
          <TikTokIcon size={14} /> TikTok
        </a>
      )}
    </div>
  );
}
