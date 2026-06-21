import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const services = [
  {
    title: 'AI Agents',
    description: 'Specialised digital workers for communication, research, sales, CRM, content, operations, and reporting.',
  },
  {
    title: 'Business Automations',
    description: 'Structured workflows that move information, trigger actions, schedule follow-ups, and reduce repetitive work.',
  },
  {
    title: 'AI Deployment',
    description: 'Secure connections between agents and authorised business platforms.',
  },
  {
    title: 'Premium Websites',
    description: 'Professional websites, landing pages, client showcases, forms, and future integration points.',
  },
  {
    title: 'Growth Infrastructure',
    description: 'Paid advertising, landing pages, lead capture, qualification, follow-up, and reporting systems.',
  },
  {
    title: 'AI Voice Reception',
    description: 'Inbound voice support, qualification, appointments, summaries, and human transfer.',
  },
];

export default function Capabilities() {
  const ref = useScrollAnimation();

  return (
    <section id="services" className="section-padding">
      <div ref={ref} className="content-max">
        <div className="text-center mb-16">
          <p className="label-text text-purple mb-4 animate-item">What We Do</p>
          <h2 className="heading-section animate-item">What We Build</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="card-surface p-8 animate-item"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-xl bg-purple/10 border border-purple/20 flex items-center justify-center mb-5">
                <span className="text-sm font-bold text-purple">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-body font-semibold text-lg text-white mb-3">{service.title}</h3>
              <p className="body-text text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
