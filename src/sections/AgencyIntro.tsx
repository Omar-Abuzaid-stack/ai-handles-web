import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { Target, Layers, Settings, ShieldCheck, Zap } from 'lucide-react';

export default function AgencyIntro() {
  const sectionRef = useScrollAnimation();
  const listRef = useStaggerAnimation('.pillar-item');

  return (
    <section id="agency-intro" className="bg-[#0A0A0A] section-padding relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C9A96E]/5 blur-[120px] rounded-full pointer-events-none" />

      <div ref={sectionRef} className="content-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Story */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#2A2A2A] rounded-full mb-6 animate-item">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
              <span className="font-mono text-[10px] text-[#C9A96E] tracking-widest uppercase">Inside AI Handle</span>
            </div>
            
            <h2 className="section-title text-[#F5F0EB] mb-8 animate-item">
              AI Infrastructure for Modern Business
            </h2>
            <div className="space-y-6 animate-item">
              <p className="font-body text-base text-[#F5F0EB] leading-relaxed">
                AI Handle is a specialised agency deploying AI agents, business automations, premium websites, communication systems, reporting tools, and human approval controls directly into businesses.
              </p>
              <p className="font-body text-base text-[#8A8478] leading-relaxed">
                We do not add AI for decoration. We design it around the way your business actually works. Every client system is tailored to their unique workflows, lead sources, sales processes, and reporting requirements.
              </p>
            </div>
          </div>

          {/* Right - Pillars */}
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8 lg:p-10 animate-item shadow-2xl shadow-black/50 hover:border-[#C9A96E]/30 transition-colors duration-500">
            <h3 className="font-body font-semibold text-lg text-[#F5F0EB] mb-8">
              Every system is designed around:
            </h3>
            <div ref={listRef} className="grid sm:grid-cols-2 gap-y-6 gap-x-4">
              {[
                { icon: <Target size={16} />, label: 'Your Projects' },
                { icon: <Layers size={16} />, label: 'Your Lead Sources' },
                { icon: <Zap size={16} />, label: 'Your Sales Process' },
                { icon: <Settings size={16} />, label: 'Your CRM' },
                { icon: <ShieldCheck size={16} />, label: 'Your Approval Rules' },
                { icon: <Target size={16} />, label: 'Your Reporting' },
              ].map((item, i) => (
                <div key={i} className="pillar-item flex items-center gap-3 text-[#8A8478] group cursor-default">
                  <div className="text-[#5A5550] group-hover:text-[#C9A96E] transition-colors">
                    {item.icon}
                  </div>
                  <span className="font-body text-sm tracking-wide group-hover:text-[#F5F0EB] transition-colors">{item.label}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-[#2A2A2A] flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5A5550]">
                AI HANDLE AGENCY INFRASTRUCTURE
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
