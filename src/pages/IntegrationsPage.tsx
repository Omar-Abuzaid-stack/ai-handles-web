import { Link } from 'react-router';
import { ArrowLeft, Mail, Calendar, FolderOpen, MessageCircle, Send, Database, Globe, Briefcase, Camera, Users, Video, Music, Cloud, Plug, Settings } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const platforms = [
  { name: 'Gmail', icon: Mail, color: 'text-red-400', status: 'Supported' },
  { name: 'Google Calendar', icon: Calendar, color: 'text-blue-400', status: 'Supported' },
  { name: 'Google Drive', icon: FolderOpen, color: 'text-green-400', status: 'Supported' },
  { name: 'WhatsApp', icon: MessageCircle, color: 'text-green-400', status: 'Supported' },
  { name: 'Telegram', icon: Send, color: 'text-blue-400', status: 'Supported' },
  { name: 'CRM Platforms', icon: Database, color: 'text-purple', status: 'Supported' },
  { name: 'Websites', icon: Globe, color: 'text-cyan-400', status: 'Supported' },
  { name: 'Databases', icon: Database, color: 'text-amber-400', status: 'Supported' },
  { name: 'Cloud Storage', icon: Cloud, color: 'text-cyan-400', status: 'Supported' },
  { name: 'LinkedIn', icon: Briefcase, color: 'text-blue-400', status: 'Supported' },
  { name: 'Instagram', icon: Camera, color: 'text-pink-400', status: 'Supported' },
  { name: 'Facebook', icon: Users, color: 'text-blue-400', status: 'Supported' },
  { name: 'YouTube', icon: Video, color: 'text-red-400', status: 'Supported' },
  { name: 'TikTok', icon: Music, color: 'text-pink-400', status: 'Supported' },
  { name: 'Custom APIs', icon: Plug, color: 'text-purple', status: 'Supported — access required' },
  { name: 'Internal Systems', icon: Settings, color: 'text-yellow-500/70', status: 'Requires approval' },
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
    <div className="min-h-screen">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="mb-16">
            <p className="label-text text-purple mb-4 animate-item">Integrations</p>
            <h1 className="heading-display mb-6 animate-item">Connected to the Tools Your Business Already Uses</h1>
            <p className="body-text max-w-2xl animate-item">
              Connections are configured after the business authorises the required accounts and permissions.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
            {platforms.map((p, i) => (
              <div key={p.name} className="card-surface px-4 py-4 flex items-center gap-3 animate-item" style={{ animationDelay: `${i * 0.03}s` }}>
                <div className={`w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0 ${p.color}`}>
                  <p.icon size={16} />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-medium text-white block truncate">{p.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap ${p.status === 'Supported' ? 'bg-purple/10 text-purple' : p.status === 'Requires approval' ? 'bg-yellow-500/10 text-yellow-500/70' : 'bg-white/5 text-white/40'}`}>
                    {p.status}
                  </span>
                </div>
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
              Connections are configured after the business authorises the required accounts and permissions. No credentials are stored on user devices.
            </p>
            <p className="text-sm text-white/30 mt-3 leading-relaxed">
              AI Handle systems can run in AI Handle-controlled private cloud infrastructure, so the client's personal computer does not need to remain switched on.
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
