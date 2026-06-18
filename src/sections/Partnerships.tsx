import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { UserCheck, Handshake, CheckCircle2 } from 'lucide-react';

export default function Partnerships() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="partnerships" className="bg-[#0A0A0A] section-padding border-t border-[#2A2A2A]">
      <div ref={sectionRef} className="content-max">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 animate-item uppercase">
            Engagement Models
          </p>
          <h2 className="section-title text-[#F5F0EB] mb-6 animate-item">
            How We Partner With You
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Direct Client Model */}
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8 lg:p-12 animate-item relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0A0A0A] pointer-events-none" />
            <div className="w-12 h-12 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center text-[#F5F0EB] mb-8 relative z-10 group-hover:border-[#C9A96E] transition-colors">
              <UserCheck size={24} />
            </div>
            <h3 className="font-body font-semibold text-xl text-[#F5F0EB] mb-4 relative z-10">
              Direct Client Implementation
            </h3>
            <p className="font-body text-sm text-[#8A8478] leading-relaxed mb-8 relative z-10">
              Vantility works directly with your real estate company to map current workflows, design your AI workforce, and implement the automation infrastructure.
            </p>
            <ul className="space-y-4 relative z-10">
              {[
                'Workflow Mapping & Optimization',
                'Custom AI Agent Architecture',
                'Internal CRM Integration',
                'Human Control Calibration'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#C9A96E]" />
                  <span className="font-body text-[13px] text-[#F5F0EB]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Agency Partnership Model */}
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8 lg:p-12 animate-item relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0A0A0A] pointer-events-none" />
            <div className="w-12 h-12 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center text-[#F5F0EB] mb-8 relative z-10 group-hover:border-[#C9A96E] transition-colors">
              <Handshake size={24} />
            </div>
            <h3 className="font-body font-semibold text-xl text-[#F5F0EB] mb-4 relative z-10">
              Agency Partnership (White-Label)
            </h3>
            <p className="font-body text-sm text-[#8A8478] leading-relaxed mb-8 relative z-10">
              We support marketing, creative, and technology agencies by providing the complex AI and automation backend for their real estate clients.
            </p>
            <ul className="space-y-4 relative z-10">
              {[
                'White-label Technical Support',
                'AI-Agent Architecture Design',
                'Workflow Demonstrations',
                'Implementation Collaboration'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#C9A96E]" />
                  <span className="font-body text-[13px] text-[#F5F0EB]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
