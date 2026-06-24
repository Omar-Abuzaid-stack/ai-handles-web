import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ChevronDown, ChevronUp, Shield, ArrowRight } from 'lucide-react';
import { robots } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AIWorkforcePage() {
  const ref = useScrollAnimation();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="mb-16">
            <p className="label-text text-purple mb-4 animate-item">Digital Workforce</p>
            <h1 className="heading-display mb-6 animate-item">The AI Handle Workforce</h1>
            <p className="body-text max-w-2xl animate-item">
              Every agent owns a defined responsibility, while an AI Orchestrator coordinates the complete system. Click any agent to see its full role.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="space-y-4">
            {robots.map((robot, i) => {
              const isExpanded = expandedId === robot.id;
              return (
                <div key={robot.id} className={`card-surface overflow-hidden animate-item transition-all duration-300 ${isExpanded ? 'border-purple/30' : ''}`} style={{ animationDelay: `${i * 0.03}s` }}>
                  <button onClick={() => toggle(robot.id)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.01] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {robot.image ? (
                          <img src={robot.image} alt={robot.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        ) : (
                          <span className="text-sm font-bold text-purple">{robot.acronym.slice(0, 3)}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-body font-semibold text-white">{robot.name}</h3>
                        <p className="text-xs text-purple/60">{robot.title}</p>
                        <p className="text-xs text-white/30 mt-0.5">{robot.department}</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp size={18} className="text-white/30" /> : <ChevronDown size={18} className="text-white/30" />}
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-white/5 pt-5">
                      <p className="body-text text-sm mb-4">{robot.description}</p>
                      <p className="text-xs text-white/40 italic mb-4">"{robot.tagline}"</p>

                      <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Responsibilities</h4>
                      <div className="grid md:grid-cols-2 gap-2 mb-5">
                        {robot.responsibilities.map((r, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm text-white/60">
                            <span className="w-1 h-1 rounded-full bg-purple/40 flex-shrink-0" />
                            {r}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                        <Shield size={14} className="text-yellow-500/60 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-yellow-500/60 mb-1">Human Escalation</p>
                          <p className="text-xs text-white/40">{robot.humanEscalation}</p>
                        </div>
                      </div>

                      {robot.modes && robot.modes.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Operating Modes</h4>
                          <div className="flex flex-wrap gap-2">
                            {robot.modes.map((mode, j) => (
                              <span key={j} className="text-[10px] px-2.5 py-1 rounded-full bg-purple/10 text-purple/70 border border-purple/20">
                                {mode.name}: {mode.description}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Orchestrator Highlight */}
      <section className="section-padding bg-[#070707]">
        <div className="content-max text-center">
          <div className="w-16 h-16 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-lg font-bold text-purple">AI</span>
          </div>
          <h2 className="heading-section mb-4">AI Orchestrator</h2>
          <p className="body-text max-w-xl mx-auto mb-6">
            The Orchestrator coordinates all agents by assigning tasks, routing verified information, monitoring status, preventing duplicate actions, requesting approvals, escalating exceptions, and maintaining operational visibility.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="content-max text-center">
          <h2 className="heading-section mb-4">Deploy This Workforce Into Your Business</h2>
          <p className="body-text mb-8 max-w-lg mx-auto">Each agent operates with approved tools, clear permissions, and human escalation rules.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">Build My AI Team <ArrowRight size={16} /></Link>
            <Link to="/services" className="btn-secondary">Explore Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
