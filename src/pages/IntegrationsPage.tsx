import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const platforms = [
  { name: 'Gmail', icon: '✉️', status: 'Supported' },
  { name: 'Google Calendar', icon: '📅', status: 'Supported' },
  { name: 'Google Drive', icon: '📁', status: 'Supported' },
  { name: 'WhatsApp', icon: '💬', status: 'Supported' },
  { name: 'Telegram', icon: '✈️', status: 'Supported' },
  { name: 'CRM Platforms', icon: '📊', status: 'Supported' },
  { name: 'Websites', icon: '🌐', status: 'Supported' },
  { name: 'Databases', icon: '🗄️', status: 'Supported' },
  { name: 'Cloud Storage', icon: '☁️', status: 'Supported' },
  { name: 'LinkedIn', icon: '💼', status: 'Supported' },
  { name: 'Instagram', icon: '📷', status: 'Supported' },
  { name: 'Facebook', icon: '👥', status: 'Supported' },
  { name: 'YouTube', icon: '▶️', status: 'Supported' },
  { name: 'TikTok', icon: '🎵', status: 'Supported' },
  { name: 'Custom APIs', icon: '🔌', status: 'Supported — access required' },
  { name: 'Internal Systems', icon: '⚙️', status: 'Requires approval' },
];

const controls = [
  'OAuth authentication',
  'Official APIs',
  'Limited permissions',
  'Revocable access',
  'Approval controls',
  'Audit logs',
];

export default function IntegrationsPage() {
  const ref = useScrollAnimation();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="mb-16">
            <p className="label-text text-purple mb-4 animate-item">Integrations</p>
            <h1 className="heading-display mb-6 animate-item">Connected to the Tools Your Business Already Uses</h1>
            <p className="body-text max-w-2xl animate-item">
              Connections are configured only after the business authorises the account and required permissions.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
            {platforms.map((p, i) => (
              <div key={p.name} className="card-surface px-4 py-4 flex flex-col gap-2 animate-item" style={{ animationDelay: `${i * 0.03}s` }}>
                <div className="flex items-center gap-3">
                  <span className="text-lg">{p.icon}</span>
                  <span className="text-sm font-medium text-white">{p.name}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full w-fit ${p.status === 'Supported' ? 'bg-purple/10 text-purple' : p.status === 'Requires approval' ? 'bg-yellow-500/10 text-yellow-500/70' : 'bg-white/5 text-white/40'}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {controls.map((c) => (
              <span key={c} className="text-xs px-3 py-1.5 rounded-full border border-white/8 text-white/40">
                {c}
              </span>
            ))}
          </div>

          <div className="text-center animate-item max-w-2xl mx-auto">
            <p className="text-sm text-white/40 leading-relaxed">
              AI Handle systems can run in AI Handle-controlled private cloud infrastructure, so the client's personal computer does not need to remain switched on.
            </p>
            <p className="text-sm text-white/30 mt-3 leading-relaxed">
              For businesses that require stronger infrastructure, AI Handle can provide or connect a dedicated CRM platform and private operational environment.
            </p>
            <p className="text-xs text-white/20 mt-4">
              Private cloud environment · AI Handle-controlled infrastructure · Encrypted cloud storage · Isolated client workspace · Continuous hosted operation
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#070707]">
        <div className="content-max text-center">
          <h2 className="heading-section mb-4">Ready to Connect Your Tools?</h2>
          <p className="body-text mb-8 max-w-lg mx-auto">We integrate with the platforms your business already uses.</p>
          <Link to="/contact" className="btn-primary">Get Started</Link>
        </div>
      </section>
    </div>
  );
}
