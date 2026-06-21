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
                className="industry-card bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[#C9A96E]/30 transition-all duration-500 group"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : industry.id)}
                  className="w-full text-left p-6 flex items-start gap-4"
                >
                  <div className="text-[#5A5550] group-hover:text-[#C9A96E] transition-colors flex-shrink-0 mt-1">
                    {iconMap[industry.icon]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-semibold text-base text-[#F5F0EB] mb-2">
                      {industry.title}
                    </h3>
                    <p className="font-body text-[13px] text-[#8A8478] leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                  <div className="text-[#5A5550] flex-shrink-0 mt-1">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-0 animate-fade-in">
                    <div className="border-t border-[#2A2A2A] pt-4">
                      <p className="font-mono text-[10px] text-[#C9A96E] tracking-widest uppercase mb-3">
                        Support includes
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {industry.details.map((detail, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg font-body text-xs text-[#8A8478]"
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
