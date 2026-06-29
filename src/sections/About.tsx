import { useTranslation } from '@/i18n/I18nContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const countries = [
  { name: 'United Arab Emirates', primary: true },
  { name: 'Saudi Arabia' },
  { name: 'Qatar' },
  { name: 'Kuwait' },
  { name: 'Bahrain' },
  { name: 'Oman' },
  { name: 'Global Markets' },
];

export default function About() {
  const { t } = useTranslation();
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div ref={ref} className="content-max">
        <div className="text-center mb-16">
          <p className="label-text text-purple mb-4 animate-item">{t('about.label')}</p>
          <h2 className="heading-section mb-4 animate-item">
            {t('about.title')}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto animate-item">
          {countries.map((c) => (
            <div
              key={c.name}
              className={`px-6 py-3 rounded-full border transition-colors ${
                c.primary
                  ? 'border-purple/30 bg-purple/5 text-white'
                  : 'border-white/8 text-white/50 hover:border-white/15'
              }`}
            >
              <span className="text-sm font-medium">{c.name}</span>
            </div>
          ))}
        </div>

        <p className="body-text text-center mt-12 max-w-xl mx-auto animate-item">
          {t('about.description')}
        </p>
      </div>
    </section>
  );
}
