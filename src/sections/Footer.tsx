import { brand } from '@/data';
import { Phone, Mail, MessageCircle, Instagram, Linkedin } from 'lucide-react';
import { TikTokIcon } from '@/components/SocialIcons';

const { founder } = brand;

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="content-max section-padding py-12">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                <img src="/brand/ai-handle-logo.png" alt="AI Handle" className="w-full h-full object-cover" />
              </div>
              <span className="font-body font-semibold text-xs tracking-[0.12em] text-white">AI HANDLE</span>
            </div>
            <p className="text-xs text-white/30 leading-relaxed mb-4">
              UAE-based global AI agency deploying AI agents, automations, websites, and growth infrastructure into businesses across the Gulf and globally.
            </p>
            <p className="text-[10px] text-white/20 leading-relaxed">
              Every system is built specifically for your business. Full privacy. No data leaks. No shared infrastructure.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                { label: 'AI Agents', href: '#services' },
                { label: 'Automations', href: '#services' },
                { label: 'Websites', href: '#services' },
                { label: 'Voice AI', href: '#services' },
                { label: 'Growth Systems', href: '#services' },
                { label: 'B2B Solutions', href: '#industries' },
                { label: 'B2Agent Systems', href: '#agents' },
              ].map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-sm text-white/30 hover:text-white/60 transition-colors">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'Industries', href: '#industries' },
                { label: 'Selected Work', href: '#work' },
                { label: 'Our Team', href: '#team' },
                { label: 'Contact Us', href: '#contact' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
              ].map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-sm text-white/30 hover:text-white/60 transition-colors">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-2.5">
              <li>
                <a href={`tel:${founder.phoneRaw}`} className="flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors">
                  <Phone size={12} /> {founder.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${founder.email}`} className="flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors">
                  <Mail size={12} /> {founder.email}
                </a>
              </li>
              <li>
                <a href={founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/30 hover:text-green-400 transition-colors">
                  <MessageCircle size={12} className="text-green-400" /> WhatsApp
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              <a href={founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-white/30 hover:text-green-400 hover:border-green-400/30 transition-all" aria-label="WhatsApp">
                <MessageCircle size={13} />
              </a>
              <a href={`mailto:${founder.email}`} className="w-8 h-8 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-white/30 hover:text-red-400 hover:border-red-400/30 transition-all" aria-label="Email">
                <Mail size={13} />
              </a>
              <a href={founder.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-white/30 hover:text-blue-400 hover:border-blue-400/30 transition-all" aria-label="LinkedIn">
                <Linkedin size={13} />
              </a>
              <a href={brand.social.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-white/30 hover:text-pink-400 hover:border-pink-400/30 transition-all" aria-label="Instagram">
                <Instagram size={13} />
              </a>
              <a href={brand.social.tiktok} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-white/30 hover:text-white/70 hover:border-white/20 transition-all" aria-label="TikTok">
                <TikTokIcon size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20">
              © {new Date().getFullYear()} AI Handle. All rights reserved. Based in the UAE.
            </p>
            <div className="flex items-center gap-4 text-[10px] text-white/15">
              <span>Custom AI Systems</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span>Full Privacy</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span>No Data Leaks</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span>Made for You</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
