import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { brand } from '@/data';
import QRCodeDisplay from '@/components/QRCode';

export default function RooftopCTA() {
  const ref = useScrollAnimation();
  const { founder } = brand;

  return (
    <section id="contact" className="section-padding bg-[#070707]">
      <div ref={ref} className="content-max text-center">
        <h2 className="heading-section mb-6 animate-item">
          Build the Team That <span className="serif-italic text-white/50">Never Sleeps.</span>
        </h2>
        <p className="body-text max-w-xl mx-auto mb-10 animate-item">
          Start with one AI agent, automate one workflow, or build a complete digital workforce around your business.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-item">
          <a href={founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle size={16} /> Speak With Omar
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); }} className="btn-primary">
            Build My AI Team
          </a>
          <a href="#demo" onClick={(e) => { e.preventDefault(); document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary">
            Watch the Demo
          </a>
        </div>

        {/* Contact Details */}
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-item">
          <div className="space-y-4">
            <h3 className="font-body font-semibold text-sm text-white">Contact</h3>
            <a href={`tel:${founder.phoneRaw}`} className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <Phone size={14} className="text-purple" /> {founder.phone}
            </a>
            <a href={`mailto:${founder.email}`} className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <Mail size={14} className="text-purple" /> {founder.email}
            </a>
            <a href={founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <MessageCircle size={14} className="text-green-400" /> WhatsApp
            </a>
          </div>

          <div className="flex justify-center">
            <QRCodeDisplay size={140} showLabel />
          </div>

          <div className="space-y-4">
            <h3 className="font-body font-semibold text-sm text-white">Sales</h3>
            <a href={`tel:${brand.salesManager.phoneRaw}`} className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <Phone size={14} className="text-purple" /> {brand.salesManager.phone}
            </a>
            <a href={`mailto:${brand.salesManager.email}`} className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <Mail size={14} className="text-purple" /> {brand.salesManager.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
