import { Link } from 'react-router';
import { Phone, Mail, MessageCircle, Linkedin, ArrowRight } from 'lucide-react';
import { brand } from '@/data';
import { useTranslation } from '@/i18n/I18nContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const { founder, salesManager } = brand;

export default function Founder() {
  const { t, lang } = useTranslation();
  const ref = useScrollAnimation();

  const localize = (path: string) => lang === 'ar' ? `/ar${path}` : path;

  return (
    <section id="team" className="section-padding">
      <div ref={ref} className="content-max">
        <div className="text-center mb-12">
          <p className="label-text text-purple mb-4 animate-item">{t('founder.label')}</p>
          <h2 className="heading-section mb-4 animate-item">{t('founder.title')}</h2>
          <p className="body-text max-w-lg mx-auto animate-item">
            {t('founder.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Founder */}
          <div className="card-surface p-8 animate-item">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                <img
                  src={founder.image}
                  alt={founder.imageAlt}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png'; }}
                />
              </div>
              <div>
                <h3 className="font-body font-semibold text-lg text-white">{founder.name}</h3>
                <p className="text-xs text-purple/60">{founder.title}</p>
              </div>
            </div>
            <p className="body-text text-sm mb-4">{founder.description}</p>
            <div className="space-y-2 mb-4">
              <a href={`tel:${founder.phoneRaw}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                <Phone size={12} className="text-purple/60" /> {founder.phone}
              </a>
              <a href={`mailto:${founder.email}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                <Mail size={12} className="text-purple/60" /> {founder.email}
              </a>
              <a href={founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/50 hover:text-green-400 transition-colors">
                <MessageCircle size={12} className="text-green-400" /> {t('founder.whatsapp')}
              </a>
              <a href={founder.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/50 hover:text-blue-400 transition-colors">
                <Linkedin size={12} className="text-blue-400" /> LinkedIn
              </a>
            </div>
            <Link to={localize('/team/omar-mohamed')} className="inline-flex items-center gap-1.5 text-xs font-medium text-purple hover:text-purple/80 transition-colors">
              {t('founder.viewProfile')} <ArrowRight size={12} />
            </Link>
          </div>

          {/* Sales Manager */}
          <div className="card-surface p-8 animate-item" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                <img
                  src={salesManager.image}
                  alt={salesManager.imageAlt}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png'; }}
                />
              </div>
              <div>
                <h3 className="font-body font-semibold text-lg text-white">{salesManager.name}</h3>
                <p className="text-xs text-purple/60">{salesManager.title}</p>
              </div>
            </div>
            <p className="body-text text-sm mb-4">{t('founder.salesDescription')}</p>
            <div className="space-y-2 mb-4">
              <a href={`tel:${salesManager.phoneRaw}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                <Phone size={12} className="text-purple/60" /> {salesManager.phone}
              </a>
              <a href={`mailto:${salesManager.email}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                <Mail size={12} className="text-purple/60" /> {salesManager.email}
              </a>
              <a href={salesManager.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/50 hover:text-green-400 transition-colors">
                <MessageCircle size={12} className="text-green-400" /> {t('founder.whatsapp')}
              </a>
            </div>
            <Link to={localize('/team/mohamed-rayan')} className="inline-flex items-center gap-1.5 text-xs font-medium text-purple hover:text-purple/80 transition-colors">
              {t('founder.viewProfile')} <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        <div className="text-center mt-8 animate-item">
          <Link to={localize('/team')} className="inline-flex items-center gap-2 text-sm font-medium text-purple hover:text-purple/80 transition-colors">
            {t('founder.viewFullTeam')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
