import { useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { timeline } from '@/data';
import { Search, Map, PenTool, Layout, Zap, Code, Users, TrendingUp, Rocket } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search size={24} />,
  Map: <Map size={24} />,
  PenTool: <PenTool size={24} />,
  Layout: <Layout size={24} />,
  Zap: <Zap size={24} />,
  Code: <Code size={24} />,
  Users: <Users size={24} />,
  TrendingUp: <TrendingUp size={24} />,
  Rocket: <Rocket size={24} />,
};

export default function ImplementationTimeline() {
  const ref = useStaggerAnimation('.phase-card');

  return (
    <section id="process" className="bg-[#141414] section-padding">
      <div className="content-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 animate-item uppercase">
            Our Process
          </p>
          <h2 className="section-title text-[#F5F0EB] mb-4 animate-item">
            How AI Handle Deploys Intelligence
          </h2>
          <p className="font-body text-sm text-[#8A8478] animate-item">
            From discovery to production — a structured approach to AI deployment
          </p>
        </div>

        {/* Timeline - 3-column grid for 9 steps */}
        <div className="relative">
          <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {timeline.map((phase, i) => (
              <div key={i} className="phase-card relative">
                <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-7 hover:border-[#C9A96E]/30 transition-all h-full">
                  {/* Icon */}
                  <div className="text-[#C9A96E] mb-4">
                    {iconMap[phase.icon] || <Zap size={24} />}
                  </div>

                  {/* Phase number */}
                  <p className="font-mono text-[11px] text-[#C9A96E] tracking-widest mb-1">
                    STEP {phase.step}
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
