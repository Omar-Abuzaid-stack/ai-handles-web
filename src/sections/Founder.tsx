import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { brand } from '@/data';
import { Phone, Mail, MessageCircle, Linkedin } from 'lucide-react';
import QRCodeDisplay from '@/components/QRCode';



function SocialIconRow({ whatsappUrl, phoneRaw, email, linkedinUrl }: {
  whatsappUrl: string; phoneRaw: string; email: string; linkedinUrl?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-all" aria-label="WhatsApp">
        <MessageCircle size={13} />
      </a>
      <a href={`tel:${phoneRaw}`} className="w-8 h-8 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center text-purple hover:bg-purple/20 transition-all" aria-label="Call">
        <Phone size={13} />
      </a>
      <a href={`mailto:${email}`} className="w-8 h-8 rounded-full bg-red-400/10 border border-red-400/20 flex items-center justify-center text-red-400 hover:bg-red-400/20 transition-all" aria-label="Email">
        <Mail size={13} />
      </a>
      {linkedinUrl && (
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-400/10 border border-blue-400/20 flex items-center justify-center text-blue-400 hover:bg-blue-400/20 transition-all" aria-label="LinkedIn">
          <Linkedin size={13} />
        </a>
      )}
    </div>
  );
}

export default function Founder() {
  const ref = useScrollAnimation();
  const { founder, salesManager } = brand;

  return (
    <section id="team" className="section-padding bg-[#070707]">
      <div ref={ref} className="content-max">
        <div className="text-center mb-16">
          <p className="label-text text-purple mb-4 animate-item">Team</p>
          <h2 className="heading-section animate-item">The People Behind AI Handle</h2>
          <p className="body-text max-w-lg mx-auto mt-4 animate-item">
            Every system is built and managed by real people. Your data stays private. Your business stays yours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Founder */}
          <div className="card-surface p-8 animate-item">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10">
                <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-body font-semibold text-lg text-white">{founder.name}</h3>
                <p className="text-sm text-purple">{founder.title}</p>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-white/50">Phone: {founder.phone}</p>
              <p className="text-sm text-white/50">Email: {founder.email}</p>
            </div>
            <SocialIconRow
              whatsappUrl={founder.whatsappUrl}
              phoneRaw={founder.phoneRaw}
              email={founder.email}
              linkedinUrl={founder.linkedinUrl}
            />
          </div>

          {/* Sales Manager */}
          <div className="card-surface p-8 animate-item" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10">
                <img src={salesManager.image} alt={salesManager.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-body font-semibold text-lg text-white">{salesManager.name}</h3>
                <p className="text-sm text-purple">{salesManager.title}</p>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-white/50">Phone: {salesManager.phone}</p>
              <p className="text-sm text-white/50">Email: {salesManager.email}</p>
            </div>
            <SocialIconRow
              whatsappUrl={salesManager.whatsappUrl}
              phoneRaw={salesManager.phoneRaw}
              email={salesManager.email}
              linkedinUrl={salesManager.linkedinUrl}
            />
          </div>
        </div>

        {/* QR Codes */}
        <div className="flex justify-center gap-12 mt-12 animate-item">
          <QRCodeDisplay size={120} showLabel variant="both" />
        </div>
      </div>
    </section>
  );
}
