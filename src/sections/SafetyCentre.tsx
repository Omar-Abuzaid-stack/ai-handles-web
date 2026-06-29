import { useTranslation } from '@/i18n/I18nContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const modes = [
  { nameKey: 'safety.modes.draft.name', descKey: 'safety.modes.draft.desc' },
  { nameKey: 'safety.modes.approval.name', descKey: 'safety.modes.approval.desc' },
  { nameKey: 'safety.modes.autopilot.name', descKey: 'safety.modes.autopilot.desc' },
];

const controlsKeys = [
  'safety.controls.pauseAgent',
  'safety.controls.pauseWorkflow',
  'safety.controls.emergencyStop',
  'safety.controls.activityHistory',
  'safety.controls.permissionLimits',
  'safety.controls.humanEscalation',
  'safety.controls.approvedKnowledgeBase',
];

const pointsKeys = [
  'safety.points.0',
  'safety.points.1',
  'safety.points.2',
  'safety.points.3',
  'safety.points.4',
  'safety.points.5',
];

export default function SafetyCentre() {
  const { t } = useTranslation();
  const ref = useScrollAnimation();

  return (
    <section id="safety" className="section-padding">
      <div ref={ref} className="content-max">
        <div className="text-center mb-16">
          <p className="label-text text-purple mb-4 animate-item">{t('safety.label')}</p>
          <h2 className="heading-section mb-4 animate-item">
            {t('safety.title')}
          </h2>
          <p className="body-text max-w-xl mx-auto animate-item">
            {t('safety.desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {modes.map((mode, i) => (
            <div key={mode.nameKey} className="card-surface p-8 animate-item" style={{ animationDelay: `${i * 0.1}s` }}>
              <h3 className="font-body font-semibold text-lg text-white mb-3">{t(mode.nameKey)}</h3>
              <p className="body-text text-sm">{t(mode.descKey)}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-item">
          {controlsKeys.map((key) => (
            <span key={key} className="text-xs px-3 py-1.5 rounded-full border border-white/8 text-white/40">{t(key)}</span>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center animate-item">
          <h3 className="font-body font-semibold text-lg text-white mb-4">{t('safety.subtitle')}</h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            {pointsKeys.map((key, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02]">
                <span className="w-1.5 h-1.5 rounded-full bg-purple/40 mt-2 flex-shrink-0" />
                <span className="text-sm text-white/60">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
