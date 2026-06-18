import { useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { timeline } from '@/data';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search size={24} />,
  PenTool: <PenTool size={24} />,
  Code: <Code size={24} />,
  Rocket: <Rocket size={24} />,
};

export default function ImplementationTimeline() {
  const ref = useStaggerAnimation('.phase-card');

  return (
    <section id="timeline" className="bg-[#141414] section-padding">
      <div className="content-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4">
            GETTING STARTED
          </p>
          <h2 className="section-title text-[#F5F0EB] mb-4">
            From Planning to Production in 14 Days
          </h2>
          <p className="font-body text-sm text-[#8A8478]">
            Live integrations and backend execution can be added in a later project phase
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector Line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-px bg-[#2A2A2A]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
          </div>

          <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {timeline.map((phase, i) => (
              <div key={i} className="phase-card relative">
                {/* Dot on line (desktop) */}
                <div className="hidden lg:flex justify-center mb-6">
                  <div className="w-4 h-4 rounded-full bg-[#0A0A0A] border-2 border-[#C9A96E] relative z-10" />
                </div>

                <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-7 hover:border-[#C9A96E]/30 transition-all">
                  {/* Icon */}
                  <div className="text-[#C9A96E] mb-4">
                    {iconMap[phase.icon]}
                  </div>

                  {/* Phase number */}
                  <p className="font-display text-2xl text-[#C9A96E] mb-1">
                    {phase.step}
                  </p>

                  {/* Title */}
                  <h3 className="font-body font-semibold text-base text-[#F5F0EB] mb-4">
                    {phase.title}
                  </h3>

                  {/* Tasks */}
                  <ul className="space-y-2">
                    {phase.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#2A2A2A] mt-2 flex-shrink-0" />
                        <span className="font-body text-[13px] text-[#8A8478]">
                          {task}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
