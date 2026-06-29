import { useTranslation } from '@/i18n/I18nContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const industries = [
  {
    title: 'Real Estate',
    details: ['Lead handling', 'CRM', 'Follow-up', 'Property content', 'Broker outreach', 'Reporting'],
  },
  {
    title: 'Clinics',
    details: ['Enquiries', 'Appointments', 'Reminders', 'Approved FAQs', 'Front-desk workflows'],
  },
  {
    title: 'B2B Businesses',
    details: ['Research', 'Outreach', 'CRM', 'Reporting', 'Workflow automation'],
  },
  {
    title: 'Agencies',
    details: ['AI implementation', 'Websites', 'Automation support', 'Partnership delivery'],
  },
];

const others = ['Hospitality', 'E-commerce', 'Education', 'Recruitment', 'Automotive', 'Fitness', 'Professional services'];

export default function WhoWeWorkWith() {
  const { t } = useTranslation();
  const ref = useScrollAnimation();

  return (
    <section id="industries" className="section-padding">
      <div ref={ref} className="content-max">
        <div className="text-center mb-16">
          <p className="label-text text-purple mb-4 animate-item">{t('industries.label')}</p>
          <h2 className="heading-section animate-item">{t('industries.title')}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {industries.map((ind, i) => (
            <div
              key={ind.title}
              className="card-surface p-8 animate-item"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <h3 className="font-body font-semibold text-lg text-white mb-4">{ind.title}</h3>
              <div className="flex flex-wrap gap-2">
                {ind.details.map((d) => (
                  <span key={d} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/50 border border-white/5">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 animate-item">
          {others.map((o) => (
            <span key={o} className="text-sm px-4 py-2 rounded-full border border-white/8 text-white/40">
              {o}
            </span>
          ))}
        </div>

        <p className="body-text text-center mt-12 max-w-xl mx-auto animate-item">
          {t('industries.tagline')}
        </p>
        <p className="text-xs text-white/20 text-center mt-4 animate-item">
          {t('industries.description')}
        </p>
      </div>
    </section>
  );
}
