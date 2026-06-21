import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Phone, Mail, MessageCircle, User, Copy, Check } from 'lucide-react';
import { brand } from '@/data';
import QRCodeDisplay from '@/components/QRCode';

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-[11px] font-mono text-[#5A5550] hover:text-[#C9A96E] transition-colors"
      title={`Copy ${label}`}
    >
      {copied ? <Check size={12} className="text-[#4ADE80]" /> : <Copy size={12} />}
      {copied ? 'Copied' : `Copy ${label}`}
    </button>
  );
}

export default function Founder() {
  const ref = useScrollAnimation();
  const { founder } = brand;

  return (
    <section id="founder" className="bg-[#141414] section-padding border-t border-[#2A2A2A]">
      <div ref={ref} className="content-max">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 animate-item uppercase">
            The Founder
          </p>
          <h2 className="section-title text-[#F5F0EB] mb-4 animate-item">
            Meet the Founder Behind AI Handle
          </h2>
          <p className="font-body text-base text-[#8A8478] max-w-[600px] mx-auto animate-item leading-relaxed">
            Built by Omar Mohamed — practical AI systems that help businesses operate more efficiently and scale.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Portrait & QR */}
          <div className="space-y-8 animate-item">
            {/* Portrait Frame */}
            <div className="relative max-w-[400px] mx-auto">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#2A2A2A] bg-[#0A0A0A] relative group">
                {/* Portrait placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#141414] to-[#0A0A0A]">
                  <div className="w-24 h-24 rounded-full bg-[#1E1E1E] border-2 border-[#2A2A2A] flex items-center justify-center group-hover:border-[#C9A96E]/50 transition-colors duration-500">
                    <User size={40} className="text-[#5A5550]" />
                  </div>
                  <div className="text-center px-8">
                    <p className="font-mono text-[10px] text-[#5A5550] tracking-[0.2em] uppercase mb-2">
                      Founder Portrait
                    </p>
                    <p className="font-body text-xs text-[#3A3A3A]">
                      Replace with your photograph
                    </p>
                  </div>
                </div>
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C9A96E]/30 rounded-tl-2xl z-10" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C9A96E]/30 rounded-br-2xl z-10" />
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#C9A96E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
              {/* Name plate */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#141414] border border-[#2A2A2A] rounded-full px-6 py-2 shadow-xl">
                <p className="font-body font-semibold text-sm text-[#F5F0EB] whitespace-nowrap">
                  {founder.name}
                </p>
              </div>
            </div>

            {/* QR Code */}
            <div className="mt-12">
              <QRCodeDisplay size={140} showLabel showSupporting />
            </div>
          </div>

          {/* Right — Bio & Contact */}
          <div className="space-y-8 animate-item">
            {/* Bio */}
            <div>
              <p className="font-mono text-[11px] tracking-[0.15em] text-[#C9A96E] mb-3">
                {founder.title}
              </p>
              <h3 className="font-display text-2xl lg:text-3xl text-[#F5F0EB] mb-6">
                {founder.name}
              </h3>
              <p className="font-body text-[15px] text-[#8A8478] leading-relaxed max-w-[500px]">
                {founder.description}
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="space-y-3">
              {/* Phone */}
              <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-5 hover:border-[#C9A96E]/50 transition-all group">
                <a href={`tel:${founder.phoneRaw}`} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center flex-shrink-0 group-hover:border-[#C9A96E]/50 transition-colors">
                    <Phone size={20} className="text-[#C9A96E]" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm text-[#F5F0EB]">Call Omar</p>
                    <p className="font-body text-xs text-[#8A8478]">{founder.phone}</p>
                  </div>
                </a>
                <div className="mt-2 ml-16">
                  <CopyButton text={founder.phoneRaw} label="phone" />
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href={founder.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-5 hover:border-[#C9A96E]/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center flex-shrink-0 group-hover:border-[#C9A96E]/50 transition-colors">
                  <MessageCircle size={20} className="text-[#4ADE80]" />
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-[#F5F0EB]">WhatsApp Omar</p>
                  <p className="font-body text-xs text-[#8A8478]">Start a conversation</p>
                </div>
              </a>

              {/* Email */}
              <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-5 hover:border-[#C9A96E]/50 transition-all group">
                <a href={`mailto:${founder.email}`} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center flex-shrink-0 group-hover:border-[#C9A96E]/50 transition-colors">
                    <Mail size={20} className="text-[#C9A96E]" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm text-[#F5F0EB]">Email Omar</p>
                    <p className="font-body text-xs text-[#8A8478]">{founder.email}</p>
                  </div>
                </a>
                <div className="mt-2 ml-16">
                  <CopyButton text={founder.email} label="email" />
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href={founder.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                Start a Conversation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
