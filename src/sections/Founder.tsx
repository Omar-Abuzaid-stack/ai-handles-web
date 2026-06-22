import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { brand } from '@/data';
import QRCodeDisplay from '@/components/QRCode';
import { SocialIconRow } from '@/components/SocialIcons';

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
