import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Building2 } from 'lucide-react';

export default function Entrance() {
  const ref = useScrollAnimation();

  return (
    <section id="entrance" className="min-h-screen bg-transparent flex items-center relative overflow-hidden group">
      {/* Cinematic Doors Transition (CSS based fallback/addition to 3D) */}
      <div className="absolute inset-0 z-0 pointer-events-none flex">
         <div className="w-1/2 h-full bg-[#0A0A0A]/20 backdrop-blur-sm border-r border-[#C9A96E]/20 transition-transform duration-1000 group-hover:-translate-x-full" />
         <div className="w-1/2 h-full bg-[#0A0A0A]/20 backdrop-blur-sm border-l border-[#C9A96E]/20 transition-transform duration-1000 group-hover:translate-x-full" />
      </div>

      <div ref={ref} className="content-max w-full section-padding relative z-10">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Left - Building Entrance Detail */}
          <div className="relative animate-item">
            <div className="relative rounded-xl overflow-hidden aspect-[3/4] max-h-[700px] border border-[#2A2A2A]/50 bg-[#141414]/20 backdrop-blur-sm shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                 <div className="space-y-4">
                    <div className="w-20 h-20 rounded-full border-2 border-[#C9A96E] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(201,169,110,0.2)]">
                       <span className="font-display text-4xl text-[#C9A96E]">V</span>
                    </div>
                    <p className="font-mono text-[10px] text-[#8A8478] tracking-[0.3em] uppercase">Initializing AI Handle</p>
                    <div className="w-48 h-1 bg-[#2A2A2A] rounded-full mx-auto overflow-hidden">
                       <div className="w-full h-full bg-[#C9A96E] animate-scan" />
                    </div>
                 </div>
              </div>
              {/* Label Overlay */}
              <div className="absolute top-6 left-6 right-6">
                <p className="font-mono text-[11px] tracking-[0.2em] text-[#C9A96E] bg-[#0A0A0A]/70 backdrop-blur-sm px-4 py-2 rounded-full inline-block border border-[#C9A96E]/20">
                  WELCOME TO THE TEAM THAT NEVER SLEEPS
                </p>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex flex-col gap-8 animate-item">
            <div>
              <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4">
                THE ENTRANCE
              </p>
              <h2 className="section-title text-[#F5F0EB] mb-6">
                Welcome to AI Handle
              </h2>
              <p className="font-body text-base text-[#8A8478] max-w-[480px] leading-relaxed">
                This building contains specialized AI departments, each staffed by professional digital workers. Every agent handles a specific responsibility — from qualifying leads to preparing reports.
              </p>
            </div>

            {/* Receptionist Card */}
            <div className="card-base flex items-start gap-4 !p-5 hover:bg-[#C9A96E]/5 transition-colors group/card">
              <div className="w-16 h-16 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center flex-shrink-0 overflow-hidden group-hover/card:border-[#C9A96E]/50 transition-colors">
                <img
                  src="/images/robots/vox.jpg"
                  alt="A.R.I.A Reception Robot"
                  className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-all"
                />
              </div>
              <div>
                <h3 className="font-body font-semibold text-sm text-[#F5F0EB] mb-1">
                  A.R.I.A — AI Reception & Information Agent
                </h3>
                <p className="font-body text-xs text-[#8A8478]">
                  First point of contact for all visitors and enquiries
                </p>
              </div>
            </div>

            {/* Floor Directory Teaser */}
            <div className="flex items-center gap-3 text-[#C9A96E]">
              <Building2 size={20} className="animate-pulse" />
              <span className="font-body text-sm tracking-wide">
                Explore 7 floors of AI departments
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
