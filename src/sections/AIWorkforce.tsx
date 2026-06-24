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
        <div className="text-center mb-12">
          <p className="label-text mb-4 text-purple animate-item">Digital Workforce</p>
          <h2 className="heading-section mb-4 animate-item">Meet the AI Team</h2>
          <p className="body-text max-w-[600px] mx-auto animate-item">
            Each agent has one clear job. They work independently and hand off approved tasks to each other.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {robots.slice(0, 8).map((robot) => (
            <div key={robot.id} className="card-surface p-5 group hover:border-purple/20 transition-colors duration-300">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-white/[0.03] border border-white/5">
                <img
                  src={robot.image}
                  alt={robot.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple/20 text-purple border border-purple/20 backdrop-blur-sm">
                    {robot.department}
                  </span>
                </div>
              </div>
              <h3 className="font-body font-semibold text-sm text-white mb-1">{robot.name}</h3>
              <p className="text-xs text-white/40 mb-3 line-clamp-2">{robot.tagline}</p>
              <div className="flex flex-wrap gap-1">
                {robot.responsibilities.slice(0, 2).map((r, i) => (
                  <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/5">
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
