import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Bot, Workflow, Cpu, Layout, TrendingUp, Phone, Shield, Building2, Users } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'AI Agents',
    label: 'Reasoning Engine',
    description: 'Specialised digital workers designed for clear business responsibilities.',
    features: ['Reception Agent', 'WhatsApp Agent', 'Sales Agent', 'CRM Agent', 'Follow-Up Agent', 'Research Agent', 'Content Agent', 'Reporting Agent', 'Voice Agent', 'AI Orchestrator'],
  },
  {
    icon: Workflow,
    title: 'Business Automations',
    label: 'Deterministic Logic',
    description: 'Structured workflows that move information, trigger actions, schedule follow-ups, update systems, and reduce repetitive work.',
    features: ['Lead qualification workflows', 'Follow-up sequences', 'CRM update automation', 'Notification routing', 'Data synchronisation', 'Reporting pipelines'],
  },
  {
    icon: Cpu,
    title: 'AI Deployment',
    label: 'System Integration',
    description: 'Deploy AI into your existing CRM, WhatsApp, email, calendar, Telegram, website forms, and custom systems.',
    features: ['CRM integration', 'WhatsApp API', 'Email systems', 'Calendar sync', 'Telegram', 'Custom APIs'],
  },
  {
    icon: Layout,
    title: 'Premium Websites',
    label: 'Frontend Experience',
    description: 'Professional websites that explain your business clearly, capture enquiries, and look premium on every device.',
    features: ['Business explanation', 'Enquiry capture', 'Service showcase', 'Project presentation', 'Campaign support', 'Mobile & desktop premium'],
  },
  {
    icon: TrendingUp,
    title: 'Growth Infrastructure',
    label: 'Demand Generation',
    description: 'Paid ads generate attention. We build the infrastructure that captures, qualifies, follows up, and converts that attention.',
    features: ['Ad strategy', 'Landing pages', 'Lead qualification', 'CRM connection', 'Automated follow-up', 'Campaign reporting'],
  },
  {
    icon: Phone,
    title: 'AI Voice Reception',
    label: 'Voice Interface',
    description: 'Professional inbound voice support, qualification, appointment booking, summaries, and human transfer.',
    features: ['Inbound call support', 'FAQ handling', 'Lead capture', 'Appointment booking', 'Human transfer', 'Multi-language'],
  },
];

const engagementModels = [
  {
    icon: Users,
    title: 'B2B — Business to Business',
    description: 'We build AI infrastructure for established companies, enterprises, and organisations that need coordinated AI systems across departments, teams, and customer workflows.',
    features: ['Cross-department AI agents', 'CRM coordination', 'Internal communication AI', 'Workflow automation', 'Management reporting', 'Custom integrations'],
  },
  {
    icon: Building2,
    title: 'B2Agent — Business to Agent',
    description: 'We build AI systems for individual professionals, agents, and small teams who need a focused AI workforce — one agent, one department, or a full digital team built specifically for their business.',
    features: ['Single AI agent deployment', 'Personal branding systems', 'Lead capture & follow-up', 'CRM organisation', 'Content systems', 'Appointment booking'],
  },
];

export default function Capabilities() {
  const ref = useScrollAnimation();

  return (
    <section id="services" className="section-padding">
      <div ref={ref} className="content-max">
        {/* Main Services */}
        <div className="text-center mb-16">
          <p className="label-text text-purple mb-4 animate-item">What We Build</p>
          <h2 className="heading-section mb-4 animate-item">
            Custom AI Infrastructure for Your Business
          </h2>
          <p className="body-text max-w-xl mx-auto animate-item">
            Every system is built specifically for your business. No shared platforms. No generic templates. Full privacy, no data leaks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service) => (
            <div key={service.title} className="card-surface p-6 group hover:border-purple/20 transition-all duration-300 animate-item">
              <div className="w-10 h-10 rounded-xl bg-purple/10 border border-purple/20 flex items-center justify-center mb-4">
                <service.icon size={18} className="text-purple" />
              </div>
              <p className="text-[10px] text-purple/60 uppercase tracking-wider mb-1 font-body">{service.label}</p>
              <h3 className="font-body font-semibold text-base text-white mb-2">{service.title}</h3>
              <p className="body-text text-sm mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {service.features.slice(0, 4).map((f, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-white/40 border border-white/5">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Engagement Models: B2B and B2Agent */}
        <div className="text-center mb-12">
          <p className="label-text text-purple mb-4 animate-item">Engagement Models</p>
          <h2 className="heading-section mb-4 animate-item">
            How We Work With <span className="serif-italic text-white/50">Every Business</span>
          </h2>
          <p className="body-text max-w-lg mx-auto animate-item">
            Whether you are a large organisation or an individual professional, we build a system specifically for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {engagementModels.map((model) => (
            <div key={model.title} className="card-surface p-8 animate-item">
              <div className="w-10 h-10 rounded-xl bg-purple/10 border border-purple/20 flex items-center justify-center mb-4">
                <model.icon size={18} className="text-purple" />
              </div>
              <h3 className="font-body font-semibold text-lg text-white mb-3">{model.title}</h3>
              <p className="body-text text-sm mb-5">{model.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {model.features.map((f, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-purple/5 text-purple/60 border border-purple/10">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Privacy & Custom Notice */}
        <div className="mt-16 text-center animate-item">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10">
            <Shield size={14} className="text-purple" />
            <span className="text-xs text-white/40 font-body">
              Fully custom systems · Complete privacy · No shared infrastructure · No data leaks · Built specifically for you
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
