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
          <div className="relative rounded-2xl p-8 lg:p-10 animate-item overflow-hidden border border-[rgba(42,42,42,0.5)] bg-gradient-to-br from-[rgba(30,30,30,0.8)] to-[rgba(20,20,20,0.9)] backdrop-blur-sm shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
            {/* Subtle gold corner accent */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#C9A96E]/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#C9A96E]/5 to-transparent pointer-events-none" />
            
            <h3 className="font-display font-semibold text-lg text-[#F5F0EB] mb-8 relative z-10">
              Every system is designed around:
            </h3>
            <div ref={listRef} className="grid sm:grid-cols-2 gap-y-5 gap-x-6 relative z-10">
              {[
                { icon: <Target size={16} />, label: 'Your Projects' },
                { icon: <Layers size={16} />, label: 'Your Lead Sources' },
                { icon: <Zap size={16} />, label: 'Your Sales Process' },
                { icon: <Settings size={16} />, label: 'Your CRM' },
                { icon: <ShieldCheck size={16} />, label: 'Your Approval Rules' },
                { icon: <Target size={16} />, label: 'Your Reporting' },
              ].map((item, i) => (
                <div key={i} className="pillar-item flex items-center gap-3 text-[#8A8478] group cursor-default py-1">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/5 border border-[#C9A96E]/10 flex items-center justify-center text-[#5A5550] group-hover:text-[#C9A96E] group-hover:bg-[#C9A96E]/10 group-hover:border-[#C9A96E]/20 transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="font-body text-sm tracking-wide group-hover:text-[#F5F0EB] transition-colors duration-300">{item.label}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-[rgba(42,42,42,0.6)] flex items-center justify-between relative z-10">
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
