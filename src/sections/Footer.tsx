import { Link } from 'react-router';
import { brand } from '@/data';
import { Phone, Mail, MessageCircle, Instagram, Linkedin } from 'lucide-react';
import { TikTokIcon } from '@/components/SocialIcons';
import { useTranslation } from '@/i18n/I18nContext';

const { founder } = brand;

function localizePath(path: string, lang: string): string {
  if (lang === 'ar') return `/ar${path}`;
  return path;
}

export default function Footer() {
  const { t, lang } = useTranslation();

  const servicesLinks = [
    { label: t('services.title'), to: '/services' },
    { label: t('serviceDetail.aiAgents.title'), to: '/services' },
    { label: t('serviceDetail.automations.title'), to: '/services' },
    { label: t('serviceDetail.websites.title'), to: '/services' },
    { label: t('serviceDetail.voice.title'), to: '/services' },
    { label: t('serviceDetail.growth.title'), to: '/services' },
    { label: t('nav.aiWorkforce'), to: '/ai-workforce' },
  ];

  const companyLinks = [
    { label: t('nav.integrations'), to: '/integrations' },
    { label: t('nav.work'), to: '/work' },
    { label: t('nav.team'), to: '/team' },
    { label: t('nav.contact'), to: '/contact' },
  ];

  return (
    <footer className="border-t border-black/10 dark:border-white/5">
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
              {t('footer.description')}
            </p>
            <p className="text-[10px] text-white/20 leading-relaxed">
              {t('footer.privacy')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2">
              {servicesLinks.map((s) => (
                <li key={s.label}>
                  <Link to={localizePath(s.to, lang)} className="text-sm text-white/30 hover:text-white/60 transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2">
              {companyLinks.map((s) => (
                <li key={s.label}>
                  <Link to={localizePath(s.to, lang)} className="text-sm text-white/30 hover:text-white/60 transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">{t('footer.connect')}</h4>
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
              © {new Date().getFullYear()} {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-4 text-[10px] text-white/15">
              {(Array.isArray(t('footer.features')) ? (t('footer.features') as string[]) : ['Secure & Private', '24/7 Availability', 'Seamless Integration']).map((feature, i) => (
                <span key={feature}>
                  {i > 0 && <span className="mx-2" />}
                  {feature}
                  {i < (Array.isArray(t('footer.features')) ? (t('footer.features') as string[]).length : 3) - 1 && <span className="w-1 h-1 rounded-full bg-white/10 inline-block mx-2" />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
