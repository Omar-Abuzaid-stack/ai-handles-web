import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  Mail, Calendar, FolderOpen, MessageCircle, Send,
  Database, Globe, Briefcase, Camera, Users,
  Video, Music, Cloud, Plug, Settings
} from 'lucide-react';

const platforms = [
  { name: 'Gmail', status: 'Supported', icon: Mail, color: 'text-red-400' },
  { name: 'Google Calendar', status: 'Supported', icon: Calendar, color: 'text-blue-400' },
  { name: 'Google Drive', status: 'Supported', icon: FolderOpen, color: 'text-green-400' },
  { name: 'WhatsApp', status: 'Supported', icon: MessageCircle, color: 'text-green-400' },
  { name: 'Telegram', status: 'Supported', icon: Send, color: 'text-blue-400' },
  { name: 'CRM Platforms', status: 'Supported', icon: Database, color: 'text-purple' },
  { name: 'Websites', status: 'Supported', icon: Globe, color: 'text-cyan-400' },
  { name: 'Databases', status: 'Supported', icon: Database, color: 'text-amber-400' },
  { name: 'LinkedIn', status: 'Supported', icon: Briefcase, color: 'text-blue-400' },
  { name: 'Instagram', status: 'Supported', icon: Camera, color: 'text-pink-400' },
  { name: 'Facebook', status: 'Supported', icon: Users, color: 'text-blue-400' },
  { name: 'YouTube', status: 'Supported', icon: Video, color: 'text-red-400' },
  { name: 'TikTok', status: 'Supported', icon: Music, color: 'text-pink-400' },
  { name: 'Private Cloud Storage', status: 'Supported', icon: Cloud, color: 'text-cyan-400' },
  { name: 'Custom APIs', status: 'Supported — access required', icon: Plug, color: 'text-purple' },
  { name: 'Internal Systems', status: 'Requires approval', icon: Settings, color: 'text-yellow-500/70' },
];

const controls = [
  'OAuth authentication',
  'Official APIs',
  'Limited permissions',
  'Revocable access',
  'Approval controls',
  'Audit logs',
];

export default function Integrations() {
  const ref = useScrollAnimation();

  return (
    <section id="integrations" className="section-padding bg-[#070707]">
      <div ref={ref} className="content-max">
        <div className="text-center mb-16">
          <p className="label-text text-purple mb-4 animate-item">Integrations</p>
          <h2 className="heading-section mb-4 animate-item">
            Connected to the Tools Your Business Already Uses
          </h2>
          <p className="body-text max-w-lg mx-auto animate-item">
            Each connection is configured after you authorise the required accounts and permissions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
          {platforms.map((p, i) => (
            <div
              key={p.name}
              className="card-surface px-4 py-4 flex items-center gap-3 animate-item"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className={`w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0 ${p.color}`}>
                <p.icon size={16} />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-medium text-white block truncate">{p.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap ${
                  p.status === 'Supported' ? 'bg-purple/10 text-purple' :
                  p.status === 'Requires approval' ? 'bg-yellow-500/10 text-yellow-500/70' :
                  'bg-white/5 text-white/40'
                }`}>
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

        <div className="text-center animate-item">
          <p className="text-xs text-white/30 max-w-lg mx-auto">
            Connections are configured after the business authorises the required accounts and permissions. No credentials are stored on user devices.
          </p>
        </div>
      </div>
    </section>
  );
}
