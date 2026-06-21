import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { engagementModels } from '@/data';
import { UserCheck, Bot, Users, Building2, Handshake, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Direct Business Engagement': <UserCheck size={24} />,
  'Agent Package': <Bot size={24} />,
  'Department System': <Users size={24} />,
  'Full AI Infrastructure': <Building2 size={24} />,
  'Agency Partnership': <Handshake size={24} />,
};

export default function Partnerships() {
  const sectionRef = useScrollAnimation();
  const gridRef = useStaggerAnimation('.partner-card');

  return (
    <section id="engagement" className="bg-[#0A0A0A] section-padding border-t border-[#2A2A2A]">
      <div ref={sectionRef} className="content-max">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 animate-item uppercase">
            How You Can Work With AI Handle
          </p>
          <h2 className="section-title text-[#F5F0EB] mb-6 animate-item">
            Engagement Models
          </h2>
          <p className="font-body text-base text-[#8A8478] max-w-[600px] mx-auto animate-item leading-relaxed">
            Choose the engagement model that fits your business needs and scale.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engagementModels.map((model, i) => (
            <div
              key={i}
              className={`partner-card relative bg-[#141414] border rounded-2xl p-8 transition-all duration-500 group overflow-hidden ${
                model.highlighted
                  ? 'border-[#C9A96E] shadow-[0_0_30px_rgba(201,169,110,0.1)]'
                  : 'border-[#2A2A2A] hover:border-[#C9A96E]/30'
              }`}
            >
              {/* Badge */}
              {model.highlighted && (
                <span className="absolute -top-0 -right-0 bg-[#C9A96E] text-[#0A0A0A] font-mono text-[10px] px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                  Most Popular
                </span>
              )}

              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0A0A0A] pointer-events-none" />

              <div className="w-12 h-12 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center text-[#F5F0EB] mb-6 relative z-10 group-hover:border-[#C9A96E] transition-colors">
                {iconMap[model.title] || <UserCheck size={24} />}
              </div>

              <h3 className="font-body font-semibold text-lg text-[#F5F0EB] mb-3 relative z-10">
                {model.title}
              </h3>

              <p className="font-body text-[13px] text-[#8A8478] leading-relaxed mb-6 relative z-10">
                {model.description}
              </p>

              <ul className="space-y-3 relative z-10">
                {model.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#C9A96E] flex-shrink-0" />
                    <span className="font-body text-[13px] text-[#F5F0EB]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
