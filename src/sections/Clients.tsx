import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { Building2, Home, Users, Landmark, Globe, Briefcase } from 'lucide-react';

const clientCategories = [
  { icon: <Building2 size={24} />, title: 'Real Estate Developers', desc: 'Off-plan launches, lead qualification, and buyer communication at scale.' },
  { icon: <Home size={24} />, title: 'Real Estate Agencies', desc: 'Automating B2B and B2C sales workflows, CRM management, and follow-up sequences.' },
  { icon: <Users size={24} />, title: 'B2B Real Estate Agents', desc: 'Coordinating large-scale broker outreach and partner research for independent agents.' },
  { icon: <Landmark size={24} />, title: 'Property Investment', desc: 'Structured research for acquisition opportunities and market analysis.' },
  { icon: <Globe size={24} />, title: 'International Sales', desc: 'Managing cross-border enquiries and multilingual outreach agents.' },
  { icon: <Briefcase size={24} />, title: 'Business Consultants', desc: 'Implementing AI infrastructure for corporate real estate partners.' },
];

export default function Clients() {
  const sectionRef = useScrollAnimation();
  const gridRef = useStaggerAnimation('.client-card');

  return (
    <section id="clients" className="bg-[#141414] section-padding">
      <div ref={sectionRef} className="content-max">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 animate-item uppercase">
            Built For Real Estate
          </p>
          <h2 className="section-title text-[#F5F0EB] mb-6 animate-item">
            Infrastructure Tailored to Your Model
          </h2>
          <p className="font-body text-base text-[#8A8478] max-w-[700px] mx-auto animate-item leading-relaxed">
            We don't sell generic SaaS. Vantility infrastructure is explicitly designed for the workflows of ambitious real estate companies.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-item">
          {clientCategories.map((cat, i) => (
            <div key={i} className="client-card bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-8 hover:border-[#C9A96E]/30 transition-colors duration-500 group relative overflow-hidden">
              {/* Subtle ambient glow on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A96E]/5 rounded-full blur-[40px] group-hover:bg-[#C9A96E]/10 transition-colors duration-500" />
              
              <div className="text-[#5A5550] group-hover:text-[#C9A96E] mb-6 transition-colors duration-500">
                {cat.icon}
              </div>
              <h3 className="font-body font-semibold text-base text-[#F5F0EB] mb-3">
                {cat.title}
              </h3>
              <p className="font-body text-[13px] text-[#8A8478] leading-relaxed">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
