import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { brand } from '@/data';
import QRCodeDisplay from '@/components/QRCode';

export default function RooftopCTA() {
  const ref = useScrollAnimation();
  const { founder } = brand;

  return (
    <section
      id="rooftop"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Content */}
      <div ref={ref} className="relative z-10 content-max text-center px-6 py-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/10 border border-[#C9A96E]/20 rounded-full mb-8 animate-item">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
          <span className="font-mono text-[10px] text-[#C9A96E] tracking-widest uppercase">Deploy AI Into Your Business</span>
        </div>

        <h2 className="hero-display text-[#F5F0EB] mb-8 animate-item">
          Deploy AI Into<br />
          <span className="text-[#C9A96E]">Your Business.</span>
        </h2>

        <p className="font-body text-lg text-[#8A8478] max-w-[620px] mx-auto mb-12 animate-item">
          Start with one agent, automate one workflow, improve your website, generate demand through paid advertising, or build a complete AI infrastructure.
        </p>

        {/* 4 CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-item">
          <a
            href={founder.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-5 shadow-[0_0_40px_rgba(201,169,110,0.2)]"
          >
            <Phone size={18} /> Speak With Omar
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary text-base px-8 py-5"
          >
            <ArrowRight size={18} /> Build My AI System
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-secondary text-base px-8 py-5"
          >
            Scan to Contact
          </a>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-secondary text-base px-8 py-5"
          >
            View Selected Work
          </a>
        </div>

        {/* Contact Details + QR */}
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-[900px] mx-auto animate-item">
          {/* Left — Contact Details */}
          <div className="space-y-6 text-left">
            <div>
              <p className="font-body font-semibold text-lg text-[#F5F0EB] mb-1">{founder.name}</p>
              <p className="font-body text-sm text-[#C9A96E]">{founder.title}</p>
            </div>

            <div className="space-y-3">
              <a
                href={`tel:${founder.phoneRaw}`}
                className="flex items-center gap-3 text-[#8A8478] hover:text-[#F5F0EB] transition-colors group"
              >
                <Phone size={16} className="text-[#C9A96E]" />
                <span className="font-body text-sm">{founder.phone}</span>
              </a>
              <a
                href={`mailto:${founder.email}`}
                className="flex items-center gap-3 text-[#8A8478] hover:text-[#F5F0EB] transition-colors group"
              >
                <Mail size={16} className="text-[#C9A96E]" />
                <span className="font-body text-sm">{founder.email}</span>
              </a>
              <a
                href={founder.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#8A8478] hover:text-[#F5F0EB] transition-colors group"
              >
                <MessageCircle size={16} className="text-[#4ADE80]" />
                <span className="font-body text-sm">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right — QR Code */}
          <div className="flex justify-center">
            <QRCodeDisplay size={140} showLabel showSupporting />
          </div>
        </div>
      </div>
    </section>
  );
}
