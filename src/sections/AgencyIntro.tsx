import { useTranslation } from '@/i18n/I18nContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AgencyIntro() {
  const { t } = useTranslation();
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div ref={ref} className="content-max">
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-text text-purple mb-6 animate-item">{t('agencyIntro.title')}</p>
          <h2 className="heading-section mb-8 animate-item">
            {t('agencyIntro.subtitle')}
          </h2>
          <p className="body-text mb-6 animate-item">
            {t('agencyIntro.description')}
          </p>
          <p className="body-text mb-6 animate-item">
            {t('agencyIntro.description2')}
          </p>
          <p className="body-text animate-item">
            {t('agencyIntro.description3')}
          </p>
        </div>
      </div>
    </section>
  );
}
