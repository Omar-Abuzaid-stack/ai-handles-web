import { Link } from 'react-router';
import { ArrowRight, Building2, User, CheckCircle } from 'lucide-react';
import { plans, brand } from '@/data';
import { useTranslation } from '@/i18n/I18nContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const planIcons: Record<string, React.ReactNode> = {
  Building2: <Building2 size={24} />,
  User: <User size={24} />,
};

export default function PlansCTA() {
  const { t, lang } = useTranslation();
  const ref = useScrollAnimation();

  const localize = (path: string) => lang === 'ar' ? `/ar${path}` : path;

  return (
    <section id="plans" className="section-padding bg-black/5 dark:bg-[#070707]">
      <div ref={ref} className="content-max">
        <div className="text-center mb-12">
          <p className="label-text text-purple mb-4 animate-item">{t('plans.label')}</p>
          <h2 className="heading-section mb-4 animate-item">{t('plans.title')}</h2>
          <p className="body-text max-w-xl mx-auto animate-item">
            {t('plans.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className={`card-surface p-8 animate-item ${plan.featured ? 'border-purple/30 relative' : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {plan.featured && (
                <span className="absolute -top-2.5 left-6 text-[10px] px-2.5 py-1 rounded-full bg-purple/10 text-purple border border-purple/20">
                  {t('plans.recommended')}
                </span>
              )}

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center text-purple">
                  {planIcons[plan.icon] || <Building2 size={24} />}
                </div>
                <div>
                  <h3 className="font-body font-semibold text-lg text-white">{plan.name}</h3>
                  <p className="text-xs text-purple/60">{plan.title}</p>
                </div>
              </div>

              <p className="body-text text-sm mb-4">{plan.description}</p>
              <p className="text-xs text-white/30 mb-6 leading-relaxed">{plan.audience}</p>

              <div className="mb-8">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">{t('plans.customLabel')}</p>
                <div className="space-y-2">
                  {plan.customOptions.map((opt, j) => (
                    <div key={j} className="flex items-start gap-2 text-sm text-white/50">
                      <CheckCircle size={12} className="text-purple/40 mt-0.5 flex-shrink-0" />
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={localize('/contact')}
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-purple hover:bg-purple/90 text-black font-medium text-sm transition-all"
              >
                {t('plans.contactCta')} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        {/* Team Profiles */}
        <div className="text-center animate-item">
          <p className="text-xs text-white/30 mb-6">{t('plans.teamReach')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={localize('/team/omar-mohamed')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8 hover:border-purple/20 hover:bg-white/[0.07] transition-all group"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                <img
                  src={brand.founder.image}
                  alt="Omar Mohamed"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png'; }}
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white group-hover:text-purple transition-colors">{brand.founder.name}</p>
                <p className="text-[10px] text-white/30">{t('founder.founderLabel')}</p>
              </div>
            </Link>
            <Link
              to={localize('/team/mohamed-rayan')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8 hover:border-purple/20 hover:bg-white/[0.07] transition-all group"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                <img
                  src={brand.salesManager.image}
                  alt="Mohamed Rayan"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png'; }}
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white group-hover:text-purple transition-colors">{brand.salesManager.name}</p>
                <p className="text-[10px] text-white/30">{t('founder.salesLabel')}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
