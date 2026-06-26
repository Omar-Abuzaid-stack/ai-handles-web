import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Robot } from '@/data';

interface AIWorkforceProps {
  robots: Robot[];
}

export default function AIWorkforce({ robots }: AIWorkforceProps) {
  const ref = useScrollAnimation();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="agents" className="section-padding">
      <div ref={ref} className="content-max">
        <div className="text-center mb-12">
          <p className="label-text mb-4 text-[#7E22CE] animate-item">Digital Workforce</p>
          <h2 className="heading-section mb-4 animate-item">Meet the AI Team</h2>
          <p className="body-text max-w-[600px] mx-auto animate-item">
            Each agent has one clear job. They work independently and hand off approved tasks to each other.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {robots.slice(0, 8).map((robot) => {
            const isOpen = openId === robot.id;
            return (
              <div key={robot.id} className="card-surface group hover:border-[#7E22CE]/20 transition-colors duration-300 flex flex-col overflow-hidden">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-white/[0.03] border-b border-white/5">
                  <img
                    src={robot.image}
                    alt={robot.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7E22CE]/20 text-[#7E22CE] border border-[#7E22CE]/20 backdrop-blur-sm">
                      {robot.department}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-body font-semibold text-sm text-white mb-1">{robot.name}</h3>
                  <p className="text-xs text-white/40 mb-3 line-clamp-2">{robot.tagline}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {robot.responsibilities.slice(0, 2).map((r, i) => (
                      <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/5">
                        {r}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setOpenId(isOpen ? null : robot.id)}
                    className="mt-auto flex items-center gap-1 text-[11px] text-[#7E22CE]/70 hover:text-[#7E22CE] transition-colors"
                  >
                    {isOpen ? 'Show less' : 'Learn more'}
                    <ChevronDown size={13} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-white/5 animate-fade-up">
                      <p className="text-xs text-white/50 leading-relaxed mb-2">{robot.description}</p>
                      {robot.responsibilities.length > 2 && (
                        <ul className="space-y-1">
                          {robot.responsibilities.slice(2).map((r, i) => (
                            <li key={i} className="text-[10px] text-white/30 flex items-start gap-1.5">
                              <span className="text-[#7E22CE] mt-0.5">›</span> {r}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
