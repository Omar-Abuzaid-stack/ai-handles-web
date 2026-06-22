import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Philosophy() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding bg-[#070707]">
      <div ref={ref} className="content-max">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="heading-section mb-8 animate-item">
              Intelligence{' '}
              <span className="serif-italic text-white/40">x</span>{' '}
              Execution
            </h2>
            <div className="space-y-8">
              <div className="animate-item">
                <h3 className="heading-sub mb-2">AI Agent vs Automation</h3>
                <p className="body-text">
                  An automation follows a fixed sequence — reliable but rigid. An AI agent understands context, reasons through situations, makes decisions, and adapts in real time. We deploy both: agents where judgement matters, automations where consistency is everything.
                </p>
              </div>
              <div className="animate-item">
                <h3 className="heading-sub mb-2">Specialised Roles</h3>
                <p className="body-text">
                  Every AI agent has one clear responsibility, a defined set of approved tools, operational limits, and explicit escalation rules. No agent does everything. Each does one thing exceptionally well.
                </p>
              </div>
              <div className="animate-item">
                <h3 className="heading-sub mb-2">Coordinated Work</h3>
                <p className="body-text">
                  Agents pass verified tasks and structured information to one another — creating a controlled digital workforce that operates with precision, not isolated tools working in silos.
                </p>
              </div>
            </div>
          </div>
          <div className="card-surface p-8 animate-item">
            <p className="label-text mb-6">Agent Workflow</p>
            <div className="space-y-3">
              {['Research Agent', 'Sales Agent', 'Reply Agent', 'CRM Agent', 'Reporting Agent'].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-purple">{i + 1}</span>
                  </span>
                  <span className="font-body text-sm text-white/70">{step}</span>
                  {i < 4 && <span className="text-white/20 ml-auto">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
