import { Link } from 'react-router';
import { ArrowLeft, Bot, Workflow, Cpu, Layout, TrendingUp, Phone, PenTool, BarChart3, Building2, User, CheckCircle, ArrowRight } from 'lucide-react';
import { services, engagementModels, timeline, plans } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const iconMap: Record<string, React.ReactNode> = {
  Bot: <Bot size={20} />,
  Workflow: <Workflow size={20} />,
  Cpu: <Cpu size={20} />,
  Layout: <Layout size={20} />,
  TrendingUp: <TrendingUp size={20} />,
  Phone: <Phone size={20} />,
  PenTool: <PenTool size={20} />,
  BarChart3: <BarChart3 size={20} />,
};

export default function ServicesPage() {
  const ref = useScrollAnimation();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="mb-16">
            <p className="label-text text-purple mb-4 animate-item">Our Services</p>
            <h1 className="heading-display mb-6 animate-item">What AI Handle Builds</h1>
            <p className="body-text max-w-2xl animate-item">
              AI Handle builds AI agents, automations, websites, communication systems, voice reception, content systems, and growth infrastructure for businesses across the Gulf.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <div key={service.id} className="card-surface p-8 animate-item" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center text-purple">
                    {iconMap[service.icon] || <Bot size={20} />}
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-lg text-white">{service.title}</h3>
                    <p className="text-xs text-purple/60 uppercase tracking-wider">{service.label}</p>
                  </div>
                </div>
                <p className="body-text text-sm mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.features.map((f, j) => (
                    <span key={j} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-white/40 border border-white/5">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans: B2B & B2Agent */}
      <section className="section-padding bg-[#070707]">
        <div className="content-max">
          <div className="text-center mb-12">
            <p className="label-text text-purple mb-4 animate-item">Plans</p>
            <h2 className="heading-section mb-4 animate-item">How We Work With You</h2>
            <p className="body-text max-w-xl mx-auto animate-item">Everything is custom-built — you decide how many agents, how many connections, what workflows, and what controls.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan, i) => (
              <div key={plan.id} className={`card-surface p-8 animate-item ${plan.featured ? 'border-purple/30 relative' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
                {plan.featured && (
                  <span className="absolute -top-2.5 left-6 text-[10px] px-2.5 py-1 rounded-full bg-purple/10 text-purple border border-purple/20">Recommended</span>
                )}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center text-purple">
                    {plan.icon === 'Building2' ? <Building2 size={24} /> : <User size={24} />}
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-lg text-white">{plan.name}</h3>
                    <p className="text-xs text-purple/60">{plan.title}</p>
                  </div>
                </div>
                <p className="body-text text-sm mb-4">{plan.description}</p>
                <p className="text-xs text-white/30 mb-6 leading-relaxed">{plan.audience}</p>
                <div className="mb-8">
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Everything is custom:</p>
                  <div className="space-y-2">
                    {plan.customOptions.map((opt, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-white/50">
                        <CheckCircle size={12} className="text-purple/40 mt-0.5 flex-shrink-0" />
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-purple hover:bg-purple/90 text-black font-medium text-sm transition-all">
                  Contact Us <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="section-padding">
        <div className="content-max">
          <div className="text-center mb-12">
            <p className="label-text text-purple mb-4 animate-item">How We Work</p>
            <h2 className="heading-section mb-4 animate-item">Engagement Models</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engagementModels.map((model, i) => (
              <div key={model.title} className={`card-surface p-6 animate-item ${model.highlighted ? 'border-purple/30' : ''}`} style={{ animationDelay: `${i * 0.05}s` }}>
                <h3 className="font-body font-semibold text-white mb-2">{model.title}</h3>
                <p className="body-text text-sm mb-4">{model.description}</p>
                <ul className="space-y-1.5">
                  {model.features.map((f, j) => (
                    <li key={j} className="text-xs text-white/40 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-purple/40" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding bg-[#070707]">
        <div className="content-max">
          <div className="text-center mb-12">
            <p className="label-text text-purple mb-4 animate-item">Our Process</p>
            <h2 className="heading-section mb-4 animate-item">How We Deploy AI</h2>
          </div>
          <div className="space-y-4">
            {timeline.map((phase, i) => (
              <div key={phase.step} className="card-surface p-6 flex items-start gap-6 animate-item" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="w-12 h-12 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-purple">{phase.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-body font-semibold text-white mb-2">{phase.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.tasks.map((task, j) => (
                      <span key={j} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-white/40 border border-white/5">
                        {task}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="content-max text-center">
          <h2 className="heading-section mb-4">Ready to Build Your AI System?</h2>
          <p className="body-text mb-8 max-w-lg mx-auto">Start with one agent, one workflow, or a complete infrastructure.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">Get Started</Link>
            <Link to="/ai-workforce" className="btn-secondary">Explore the AI Team</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
