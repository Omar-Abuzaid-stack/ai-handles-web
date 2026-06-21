import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { brand } from '@/data';
import QRCodeDisplay from '@/components/QRCode';

export default function Founder() {
  const ref = useScrollAnimation();
  const { founder, salesManager } = brand;

  return (
    <section id="team" className="section-padding bg-[#070707]">
      <div ref={ref} className="content-max">
        <div className="text-center mb-16">
          <p className="label-text text-purple mb-4 animate-item">Team</p>
          <h2 className="heading-section animate-item">The People Behind AI Handle</h2>
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
            <div className="space-y-3 mb-6">
              <p className="text-sm text-white/50">Phone: {founder.phone}</p>
              <p className="text-sm text-white/50">Email: {founder.email}</p>
            </div>
            <div className="flex gap-3">
              <a href={founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-2 px-4">WhatsApp</a>
              <a href={`tel:${founder.phoneRaw}`} className="btn-secondary text-xs py-2 px-4">Call</a>
              <a href={`mailto:${founder.email}`} className="btn-secondary text-xs py-2 px-4">Email</a>
            </div>
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
            <div className="space-y-3 mb-6">
              <p className="text-sm text-white/50">Phone: {salesManager.phone}</p>
              <p className="text-sm text-white/50">Email: {salesManager.email}</p>
            </div>
            <div className="flex gap-3">
              <a href={salesManager.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-2 px-4">WhatsApp</a>
              <a href={`tel:${salesManager.phoneRaw}`} className="btn-secondary text-xs py-2 px-4">Call</a>
              <a href={`mailto:${salesManager.email}`} className="btn-secondary text-xs py-2 px-4">Email</a>
            </div>
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
