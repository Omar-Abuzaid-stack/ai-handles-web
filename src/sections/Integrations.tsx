import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const platforms = [
  { name: 'Gmail', status: 'Supported' },
  { name: 'Google Calendar', status: 'Supported' },
  { name: 'Google Drive', status: 'Supported' },
  { name: 'WhatsApp', status: 'Supported' },
  { name: 'Telegram', status: 'Supported' },
  { name: 'CRM Platforms', status: 'Supported' },
  { name: 'Websites', status: 'Supported' },
  { name: 'Databases', status: 'Supported' },
  { name: 'LinkedIn', status: 'Supported' },
  { name: 'Instagram', status: 'Supported' },
  { name: 'Facebook', status: 'Supported' },
  { name: 'YouTube', status: 'Supported' },
  { name: 'TikTok', status: 'Supported' },
  { name: 'Cloud Storage', status: 'Supported' },
  { name: 'Custom APIs', status: 'Supported — access required' },
  { name: 'Internal Systems', status: 'Requires approval' },
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
            Connections are configured only after the business authorises the account and required permissions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
          {platforms.map((p, i) => (
            <div
              key={p.name}
              className="card-surface px-4 py-3 flex items-center justify-between animate-item"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className="text-sm font-medium text-white">{p.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap ${
                p.status === 'Supported' ? 'bg-purple/10 text-purple' :
                p.status === 'Requires approval' ? 'bg-yellow-500/10 text-yellow-500/70' :
                'bg-white/5 text-white/40'
              }`}>
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

        <div className="text-center animate-item">
          <p className="text-xs text-white/25 max-w-lg mx-auto">
            AI Handle systems can run in AI Handle-controlled private cloud infrastructure, so the client's personal computer does not need to remain switched on. For businesses that require stronger infrastructure, AI Handle can provide or connect a dedicated CRM platform and private operational environment.
          </p>
        </div>
      </div>
    </section>
  );
}
