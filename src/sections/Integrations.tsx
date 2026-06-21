import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const platforms = [
  { name: 'Gmail', status: 'Supported' },
  { name: 'Google Calendar', status: 'Supported' },
  { name: 'Google Drive', status: 'Supported' },
  { name: 'WhatsApp', status: 'Supported' },
  { name: 'Telegram', status: 'Supported' },
  { name: 'CRM Platforms', status: 'Supported' },
  { name: 'Websites', status: 'Supported' },
  { name: 'Databases', status: 'Available by scope' },
  { name: 'LinkedIn', status: 'Available by scope' },
  { name: 'Instagram', status: 'Available by scope' },
  { name: 'Facebook', status: 'Available by scope' },
  { name: 'YouTube', status: 'Available by scope' },
  { name: 'Cloud Storage', status: 'Supported' },
  { name: 'Internal Systems', status: 'Requires approval' },
];

const controls = [
  'OAuth authentication',
  'Official APIs',
  'MCP integration',
  'Limited permissions',
  'Revocable access',
  'Approval controls',
  'Audit logs',
];

export default function Integrations() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding bg-[#070707]">
      <div ref={ref} className="content-max">
        <div className="text-center mb-16">
          <p className="label-text text-purple mb-4 animate-item">Integrations</p>
          <h2 className="heading-section mb-4 animate-item">
            Connected to the Tools Your Business Already Uses
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
          {platforms.map((p, i) => (
            <div
              key={p.name}
              className="card-surface px-4 py-3 flex items-center justify-between animate-item"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className="text-sm font-medium text-white">{p.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                p.status === 'Supported' ? 'bg-purple/10 text-purple' :
                p.status === 'Available by scope' ? 'bg-white/5 text-white/40' :
                'bg-yellow-500/10 text-yellow-500/70'
              }`}>
                {p.status}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {controls.map((c) => (
            <span key={c} className="text-xs px-3 py-1.5 rounded-full border border-white/8 text-white/40">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
