import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AgentCollaboration() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding bg-[#070707]">
      <div ref={ref} className="content-max">
        <div className="text-center mb-12">
          <h2 className="heading-section mb-4 animate-item">A Team That Works Together</h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-2 max-w-5xl mx-auto animate-item">
          {[
            { name: 'Research Agent', desc: 'verifies a lead' },
            { name: 'Sales Agent', desc: 'prepares approved outreach' },
            { name: 'Reply Agent', desc: 'analyses response' },
            { name: 'CRM Agent', desc: 'updates record' },
            { name: 'Reporting Agent', desc: 'informs management' },
          ].map((step, i) => (
            <div key={step.name} className="flex items-center gap-2">
              <div className="card-surface px-4 py-3 text-center">
                <p className="text-sm font-medium text-white">{step.name}</p>
                <p className="text-[10px] text-white/40 mt-1">{step.desc}</p>
              </div>
              {i < 4 && <span className="text-purple text-lg">→</span>}
            </div>
          ))}
        </div>
        <p className="body-text text-center mt-12 max-w-[700px] mx-auto italic animate-item">
          "Automation is the workflow. The AI agent is the digital worker operating inside or around that workflow."
        </p>
      </div>
    </section>
  );
}
