import { Link } from 'react-router';
import { Calendar, Phone, Mail, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { brand } from '@/data';

export default function TeamPreview() {
  const ref = useScrollAnimation();
  const founder = brand.founder;

  return (
    <section id="team" className="section-padding bg-[#070707] relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#7E22CE]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div ref={ref} className="content-max relative z-10">
        <div className="text-center mb-10">
          <p className="label-text text-[#7E22CE] mb-4 animate-item">Meet the Team</p>
          <h2 className="heading-section mb-4 animate-item">The Humans Behind the System</h2>
        </div>

        <div className="flex justify-center mb-12">
          <div 
            className="group relative card-surface overflow-hidden hover:border-[#7E22CE]/40 transition-all duration-500 animate-item w-full max-w-2xl bg-[#0a0a0a]"
            style={{ boxShadow: '0 0 40px rgba(126, 34, 206, 0.15)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7E22CE]/10 to-transparent opacity-50"></div>
            
            <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <img
                  src={founder.image}
                  alt={founder.imageAlt}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png'; }}
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-body text-2xl font-semibold text-[#7E22CE]">{founder.name}</h3>
                  <a href={founder.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[#7E22CE]/60 hover:text-[#7E22CE] transition-colors">
                    <ExternalLink size={16} />
                  </a>
                </div>
                <p className="text-[#7E22CE]/70 font-medium mb-3">{founder.title}</p>
                
                <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2 sm:line-clamp-none">
                  {founder.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-white/40">
                  <a href={`tel:${founder.phoneRaw}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Phone size={14} /> {founder.phone}
                  </a>
                  <a href={`mailto:${founder.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Mail size={14} /> Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center animate-item flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/team" className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors">
            View Full Team →
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7E22CE]/10 border border-[#7E22CE]/30 text-[#7E22CE] hover:bg-[#7E22CE]/20 hover:border-[#7E22CE]/50 transition-all duration-300 text-sm font-semibold"
          >
            <Calendar size={15} />
            Book a Meeting With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
