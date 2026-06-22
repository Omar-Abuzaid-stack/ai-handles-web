import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Robot } from '@/data';

interface AIWorkforceProps {
  robots: Robot[];
}

export default function AIWorkforce({ robots }: AIWorkforceProps) {
  const ref = useScrollAnimation();

  return (
    <section id="agents" className="section-padding">
      <div ref={ref} className="content-max">
        <div className="text-center mb-16">
          <p className="label-text mb-4 text-purple animate-item">Digital Workforce</p>
          <h2 className="heading-section mb-4 animate-item">Meet the Team Behind Your Business</h2>
          <p className="body-text max-w-[600px] mx-auto animate-item">
            Every agent is assigned to a specific role, operating your business around the clock.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {robots.slice(0, 8).map((robot) => (
            <div key={robot.id} className="card-surface p-6 group hover:border-purple/20 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-purple">{robot.acronym.slice(0, 2)}</span>
                </div>
                <div>
                  <h3 className="font-body font-semibold text-sm text-white">{robot.name}</h3>
                  <p className="text-xs text-white/40">{robot.department}</p>
                </div>
              </div>
              <p className="body-text text-sm mb-4">{robot.tagline}</p>
              <div className="flex flex-wrap gap-1.5">
                {robot.responsibilities.slice(0, 3).map((r, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-white/40 border border-white/5">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
