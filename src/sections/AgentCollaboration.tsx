import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const workflowSteps = [
  { name: 'Research Agent', desc: 'Verifies the lead and gathers intelligence', color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
  { name: 'Sales & Follow-Up', desc: 'Prepares approved outreach and manages replies', color: 'bg-purple/10 border-purple/20 text-purple' },
  { name: 'Content Agent', desc: 'Creates post-ready content and scripts', color: 'bg-pink-500/10 border-pink-500/20 text-pink-400' },
  { name: 'Operations Tracker', desc: 'Monitors tasks, deadlines, and escalations', color: 'bg-amber-500/10 border-amber-500/20 text-amber-400' },
  { name: 'Reporting Agent', desc: 'Prepares summaries and management reports', color: 'bg-green-500/10 border-green-500/20 text-green-400' },
];

export default function AgentCollaboration() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding bg-[#070707]">
      <div ref={ref} className="content-max">
        <div className="text-center mb-12">
          <p className="label-text text-purple mb-4 animate-item">Workflow</p>
          <h2 className="heading-section mb-4 animate-item">A Team That Works Together</h2>
          <p className="body-text max-w-lg mx-auto animate-item">
            One enquiry triggers a coordinated response across multiple specialised agents — each handling its own responsibility with precision.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="space-y-3">
            {workflowSteps.map((step, i) => (
              <div key={step.name} className="animate-item" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-purple">{i + 1}</span>
                  </div>
                  <div className="flex-1 card-surface px-5 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-body font-semibold text-sm text-white">{step.name}</p>
                      <p className="text-xs text-white/40 mt-0.5">{step.desc}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${step.color}`}>Active</span>
                  </div>
                  {i < workflowSteps.length - 1 && (
                    <div className="absolute left-[19px] mt-12 w-px h-3 bg-white/10" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center animate-item">
          <p className="body-text text-white/50 mb-2">
            <strong className="text-white/70">Automation is the workflow.</strong> The AI agent is the digital worker operating inside or around that workflow.
          </p>
          <p className="text-xs text-white/20">
            The AI Orchestrator coordinates all agents. The Safety Agent monitors permissions. Humans maintain final authority at every stage.
          </p>
        </div>
      </div>
    </section>
  );
}
