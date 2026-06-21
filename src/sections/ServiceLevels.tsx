import { useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { serviceLevels } from '@/data';
import { Bot, Building2 } from 'lucide-react';

function RobotIcon({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Bot
          key={i}
          size={20}
          className="text-[#C9A96E]"
          style={{ marginLeft: i > 0 ? '-8px' : '0', opacity: 1 - i * 0.2 }}
        />
      ))}
    </div>
  );
}

export default function ServiceLevels() {
  const ref = useStaggerAnimation('.service-card');

  return (
    <section id="services" className="bg-[#0A0A0A] section-padding">
      <div className="content-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4">
            SERVICE LEVELS
          </p>
          <h2 className="section-title text-[#F5F0EB]">
            Start Small. Scale Intelligently
          </h2>
        </div>

        {/* Service Cards */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6 mb-10">
          {serviceLevels.map((service, i) => (
            <div
              key={i}
              className={`service-card relative bg-[#1E1E1E] rounded-xl p-9 transition-all hover:-translate-y-1 ${
                service.highlighted
                  ? 'border-2 border-[#C9A96E] shadow-[0_0_30px_rgba(201,169,110,0.1)]'
                  : 'border border-[#2A2A2A] hover:border-[#C9A96E]/50'
              }`}
            >
              {/* Badge */}
              {service.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A96E] text-[#0A0A0A] font-mono text-[11px] px-3 py-1 rounded-full">
                  {service.badge}
                </span>
              )}

              {/* Icon */}
              <div className="mb-5">
                {i === 0 && <RobotIcon count={1} />}
                {i === 1 && <RobotIcon count={3} />}
                {i === 2 && <Building2 size={28} className="text-[#C9A96E]" />}
              </div>

              {/* Title */}
              <h3 className="font-display text-[22px] text-[#F5F0EB] mb-3">
                {service.name}
              </h3>

              {/* Description */}
              <p className="font-body text-[15px] text-[#8A8478] mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Example */}
            <p className="font-body text-[13px] text-[#5A5550] mb-6">
              {service.example}
            </p>

              {/* CTA */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`inline-flex items-center font-body font-medium text-sm px-6 py-3 rounded-full border transition-all ${
                  service.highlighted
                    ? 'bg-[#C9A96E] text-[#0A0A0A] border-[#C9A96E] hover:bg-[#D4BC87]'
                    : 'text-[#C9A96E] border-[#2A2A2A] hover:border-[#C9A96E] hover:bg-[#C9A96E]/5'
                }`}
              >
                {i === 0 && 'Discuss Your Workflow'}
                {i === 1 && 'Plan Your Department'}
                {i === 2 && 'Design Your Infrastructure'}
              </a>
            </div>
          ))}
        </div>

        {/* Pricing Note */}
        <p className="text-center font-body text-[13px] text-[#5A5550] max-w-[600px] mx-auto">
          Pricing depends on number of agents, workflows, channels, CRM complexity, lead volume, content requirements, voice usage, reporting needs, and support level
        </p>
      </div>
    </section>
  );
}
