import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const modes = [
  { name: 'Draft Mode', description: 'The AI prepares the work, but a human completes the action.' },
  { name: 'Approval Mode', description: 'The AI performs routine tasks but asks for permission before sensitive actions.' },
  { name: 'Autopilot Mode', description: 'The AI completes selected low-risk actions inside strict rules and limits.' },
];

const controls = [
  'Pause Agent', 'Pause Workflow', 'Emergency Stop', 'Activity History',
  'Permission Limits', 'Human Escalation',
];

export default function SafetyCentre() {
  const ref = useScrollAnimation();

  return (
    <section id="safety" className="section-padding">
      <div ref={ref} className="content-max">
        <div className="text-center mb-16">
          <p className="label-text text-purple mb-4 animate-item">Security & Control</p>
          <h2 className="heading-section mb-4 animate-item">
            Powerful Automation. <span className="serif-italic text-white/50">Human Authority.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {modes.map((mode, i) => (
            <div key={mode.name} className="card-surface p-8 animate-item" style={{ animationDelay: `${i * 0.1}s` }}>
              <h3 className="font-body font-semibold text-lg text-white mb-3">{mode.name}</h3>
              <p className="body-text text-sm">{mode.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-item">
          {controls.map((c) => (
            <span key={c} className="text-xs px-3 py-1.5 rounded-full border border-white/8 text-white/40">{c}</span>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center animate-item">
          <h3 className="font-body font-semibold text-lg text-white mb-3">AI Handle Aegis</h3>
          <p className="body-text">
            AI Handle Aegis is the security and coordination layer that manages permissions, approvals, duplicate-action protection, agent activity, and audit history.
          </p>
        </div>
      </div>
    </section>
  );
}
