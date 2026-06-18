import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { Target, Zap, ShieldCheck, IterationCw } from 'lucide-react';

const standards = [
  {
    icon: <Target size={24} />,
    title: 'Business Understanding',
    desc: 'We don\'t just deploy code. We map your exact sales process, lead sources, and communication style before proposing an architecture.'
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Human Control',
    desc: 'You dictate the boundaries. Whether an agent operates in Draft Mode or Autopilot, sensitive decisions always require your team\'s approval.'
  },
  {
    icon: <Zap size={24} />,
    title: 'Workflow Practicality',
    desc: 'We eliminate "AI for decoration." If an automation doesn\'t directly speed up follow-ups, clean data, or save hours, we don\'t build it.'
  },
  {
    icon: <IterationCw size={24} />,
    title: 'Ongoing Improvement',
    desc: 'Business changes, and your infrastructure should too. We provide continuous updates to agent prompts, workflow logic, and integrations.'
  }
];

export default function ClientStandards() {
  const sectionRef = useScrollAnimation();
  const gridRef = useStaggerAnimation('.standard-card');

  return (
    <section id="standards" className="bg-[#141414] section-padding">
      <div ref={sectionRef} className="content-max">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 animate-item uppercase">
              The Vantility Standard
            </p>
            <h2 className="section-title text-[#F5F0EB] mb-6 animate-item">
              What Clients Evaluate Us On
            </h2>
            <p className="font-body text-base text-[#8A8478] animate-item leading-relaxed">
              Until our latest client case studies are cleared for public release, this is the benchmark we hold ourselves to for every implementation.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
          {standards.map((std, i) => (
            <div key={i} className="standard-card bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-8 hover:border-[#C9A96E]/30 transition-all duration-500 flex gap-6">
              <div className="text-[#C9A96E] flex-shrink-0">
                {std.icon}
              </div>
              <div>
                <h3 className="font-body font-semibold text-base text-[#F5F0EB] mb-2">{std.title}</h3>
                <p className="font-body text-sm text-[#8A8478] leading-relaxed">{std.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
