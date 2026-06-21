import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Phone, Mail, MessageCircle, User, Copy, Check, Globe } from 'lucide-react';
import { brand } from '@/data';
import QRCodeDisplay from '@/components/QRCode';
import LinkedInIcon from '@/components/LinkedInIcon';

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="flex items-center gap-1.5 text-[11px] font-mono text-[#5A5550] hover:text-[#C9A96E] transition-colors" title={`Copy ${label}`}>
      {copied ? <Check size={12} className="text-[#4ADE80]" /> : <Copy size={12} />}
      {copied ? 'Copied' : `Copy ${label}`}
    </button>
  );
}

function PersonCard({ name, title, nationality, phone, phoneRaw, email, whatsappUrl, linkedinUrl, image, imageAlt, variant }: {
  name: string; title: string; nationality: string; phone: string; phoneRaw: string; email: string; whatsappUrl: string; linkedinUrl?: string; image?: string; imageAlt?: string; variant: 'founder' | 'sales';
}) {
  return (
    <div className="space-y-8 animate-item">
      {/* Portrait + QR */}
      <div className="space-y-6">
        <div className="relative max-w-[340px] mx-auto">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#2A2A2A] bg-[#0A0A0A] relative group">
            {image ? (
              <img
                src={image}
                alt={imageAlt || name}
                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#141414] to-[#0A0A0A]">
                <div className="w-20 h-20 rounded-full bg-[#1E1E1E] border-2 border-[#2A2A2A] flex items-center justify-center group-hover:border-[#C9A96E]/50 transition-colors duration-500">
                  <User size={36} className="text-[#5A5550]" />
                </div>
                <p className="font-mono text-[10px] text-[#5A5550] tracking-[0.2em] uppercase">Replace with photograph</p>
              </div>
            )}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C9A96E]/30 rounded-tl-2xl z-10" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C9A96E]/30 rounded-br-2xl z-10" />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#141414] border border-[#2A2A2A] rounded-full px-5 py-2 shadow-xl">
            <p className="font-body font-semibold text-sm text-[#F5F0EB] whitespace-nowrap">{name}</p>
          </div>
        </div>
        <QRCodeDisplay size={variant === 'founder' ? 140 : 140} variant={variant} showLabel showSupporting />
      </div>
      {/* Bio + Contact */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <p className="font-mono text-[11px] tracking-[0.15em] text-[#C9A96E] uppercase">{title}</p>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#2A2A2A] bg-[#0A0A0A]">
              <Globe size={10} className="text-[#C9A96E]" />
              <span className="font-mono text-[10px] text-[#8A8478] tracking-wide">{nationality}</span>
            </span>
          </div>
          <h3 className="font-display text-2xl lg:text-3xl text-[#F5F0EB] mb-4">{name}</h3>
          <p className="font-body text-[15px] text-[#8A8478] leading-relaxed max-w-[480px]">
            {variant === 'founder'
              ? 'Founded AI Handle to help businesses deploy coordinated AI systems directly into their operations. Focused on building practical AI agents, automations, websites, lead-generation systems, and growth infrastructure.'
              : 'Handles pricing, packages, and partnership enquiries. Connect directly with Mohamed for a quick response.'}
          </p>
        </div>
        <div className="space-y-3">
          <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 hover:border-[#C9A96E]/50 transition-all group">
            <a href={`tel:${phoneRaw}`} className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center flex-shrink-0 group-hover:border-[#C9A96E]/50 transition-colors">
                <Phone size={18} className="text-[#C9A96E]" />
              </div>
              <div className="flex-1">
                <p className="font-body font-semibold text-sm text-[#F5F0EB]">Call {variant === 'founder' ? 'Omar' : 'Mohamed'}</p>
                <p className="font-body text-xs text-[#8A8478]">{phone}</p>
              </div>
              <CopyButton text={phoneRaw} label="phone" />
            </a>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 hover:border-[#C9A96E]/50 transition-all group">
            <div className="w-11 h-11 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center flex-shrink-0 group-hover:border-[#C9A96E]/50 transition-colors">
              <MessageCircle size={18} className="text-[#4ADE80]" />
            </div>
            <div>
              <p className="font-body font-semibold text-sm text-[#F5F0EB]">WhatsApp</p>
              <p className="font-body text-xs text-[#8A8478]">Quick response</p>
            </div>
          </a>
          <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 hover:border-[#C9A96E]/50 transition-all group">
            <a href={`mailto:${email}`} className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center flex-shrink-0 group-hover:border-[#C9A96E]/50 transition-colors">
                <Mail size={18} className="text-[#C9A96E]" />
              </div>
              <div className="flex-1">
                <p className="font-body font-semibold text-sm text-[#F5F0EB]">Email</p>
                <p className="font-body text-xs text-[#8A8478]">{email}</p>
              </div>
              <CopyButton text={email} label="email" />
            </a>
          </div>
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 hover:border-[#C9A96E]/50 transition-all group">
              <div className="w-11 h-11 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center flex-shrink-0 group-hover:border-[#C9A96E]/50 transition-colors">
                <LinkedInIcon size={18} className="text-[#0A66C2]" />
              </div>
              <div>
                <p className="font-body font-semibold text-sm text-[#F5F0EB]">LinkedIn</p>
                <p className="font-body text-xs text-[#8A8478]">Connect on LinkedIn</p>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Founder() {
  const ref = useScrollAnimation();
  const { founder, salesManager } = brand;

  return (
    <section id="founder" className="bg-[#141414] section-padding border-t border-[#2A2A2A]">
      <div ref={ref} className="content-max">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 animate-item uppercase">The Team</p>
          <h2 className="section-title text-[#F5F0EB] mb-4 animate-item">Meet the Team Behind AI Handle</h2>
          <p className="font-body text-base text-[#8A8478] max-w-[600px] mx-auto animate-item leading-relaxed">
            AI Handle is built by a team based in the UAE, deploying practical AI systems for businesses worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Omar Mohamed — Founder */}
          <PersonCard
            name={founder.name}
            title={founder.title}
            nationality={founder.nationality}
            phone={founder.phone}
            phoneRaw={founder.phoneRaw}
            email={founder.email}
            whatsappUrl={founder.whatsappUrl}
            linkedinUrl={founder.linkedinUrl}
            image={founder.image}
            imageAlt={founder.imageAlt}
            variant="founder"
          />
          {/* Mohamed Rayan — Sales Manager */}
          <PersonCard
            name={salesManager.name}
            title={salesManager.title}
            nationality={salesManager.nationality}
            phone={salesManager.phone}
            phoneRaw={salesManager.phoneRaw}
            email={salesManager.email}
            whatsappUrl={salesManager.whatsappUrl}
            image={salesManager.image}
            imageAlt={salesManager.imageAlt}
            variant="sales"
          />
        </div>
      </div>
    </section>
  );
}
