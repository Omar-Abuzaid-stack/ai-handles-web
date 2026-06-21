import { useState } from 'react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { industries } from '@/data';
import {
  Briefcase, Building2, Home, User, Heart, Handshake, Globe,
  ChevronDown, ChevronUp,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={24} />,
  Building2: <Building2 size={24} />,
  Home: <Home size={24} />,
  User: <User size={24} />,
  Heart: <Heart size={24} />,
  Handshake: <Handshake size={24} />,
  Globe: <Globe size={24} />,
};

export default function WhoWeWorkWith() {
  const sectionRef = useScrollAnimation();
  const gridRef = useStaggerAnimation('.industry-card');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="industries" className="bg-[#0A0A0A] section-padding border-t border-[#2A2A2A]">
      <div ref={sectionRef} className="content-max">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 animate-item uppercase">
            Who We Work With
          </p>
          <h2 className="section-title text-[#F5F0EB] mb-6 animate-item">
            AI Handle Works With
          </h2>
          <p className="font-body text-base text-[#8A8478] max-w-[700px] mx-auto animate-item leading-relaxed">
            We work with any responsible business model where AI can improve communication, operations, customer experience, lead handling, content, reporting, or repetitive workflows.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
          {industries.map((industry) => {
            const isExpanded = expandedId === industry.id;
            return (
              <div
                key={industry.id}
                className="industry-card rounded-2xl overflow-hidden transition-all duration-500 group border border-[rgba(42,42,42,0.5)] bg-gradient-to-b from-[rgba(30,30,30,0.7)] to-[rgba(20,20,20,0.9)] backdrop-blur-sm hover:border-[rgba(201,169,110,0.3)] hover:shadow-[0_8px_40px_rgba(201,169,110,0.04)]"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : industry.id)}
                  className="w-full text-left p-7 flex items-start gap-5"
                >
                  <div className="w-11 h-11 rounded-xl bg-[rgba(201,169,110,0.08)] border border-[rgba(201,169,110,0.15)] flex items-center justify-center text-[#5A5550] group-hover:text-[#C9A96E] group-hover:bg-[rgba(201,169,110,0.12)] transition-all duration-300 flex-shrink-0">
                    {iconMap[industry.icon]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-base text-[#F5F0EB] mb-2">
                      {industry.title}
                    </h3>
                    <p className="font-body text-[13px] text-[#8A8478] leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                  <div className="text-[#5A5550] flex-shrink-0 mt-1 transition-transform duration-300">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-7 pb-7 pt-0 animate-fade-in">
                    <div className="border-t border-[rgba(42,42,42,0.5)] pt-5">
                      <p className="font-mono text-[10px] text-[#C9A96E] tracking-widest uppercase mb-4">
                        Support includes
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {industry.details.map((detail, i) => (
                          <span
                            key={i}
                            className="px-3.5 py-2 bg-[#0A0A0A]/60 border border-[#2A2A2A]/50 rounded-lg font-body text-xs text-[#8A8478] hover:border-[#C9A96E]/20 hover:text-[#F5F0EB] transition-colors duration-300"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="font-body text-xs text-[#5A5550] max-w-[600px] mx-auto leading-relaxed">
            Suitability is assessed during discovery. AI Handle does not claim AI fits every workflow automatically.
          </p>
        </div>
      </div>
    </section>
  );
}
