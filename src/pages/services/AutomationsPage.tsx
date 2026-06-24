import { Link } from 'react-router';
import { ArrowLeft, Workflow, Zap, Repeat, Cog } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AutomationsPage() {
  const ref = useScrollAnimation();

  const features = [
    { title: 'Workflow Optimization', description: 'Map and automate your most time-consuming business processes.', icon: <Workflow size={24} /> },
    { title: 'Instant Triggers', description: 'React immediately to customer actions, form submissions, and data updates.', icon: <Zap size={24} /> },
    { title: 'Repetitive Task Elimination', description: 'Free up your team by handing over routine tasks to reliable automated systems.', icon: <Repeat size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Services
          </Link>
          <div className="mb-16">
            <p className="label-text text-purple mb-4 animate-item">Service Detail</p>
            <h1 className="heading-display mb-6 animate-item">Automations</h1>
            <p className="body-text max-w-2xl animate-item">
              Connect your tools, sync your data, and automate the busywork. We build robust systems that work silently in the background, making your business faster and more efficient.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="card-surface p-8 animate-item flex flex-col border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="w-12 h-12 rounded-xl bg-[#1A0B2E] border border-[#2D1B4E] flex items-center justify-center text-[#7E22CE] shadow-[0_0_15px_rgba(157,78,221,0.15)] mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-body font-semibold text-lg text-white mb-2">{feature.title}</h3>
                <p className="body-text text-sm text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-[#070707]">
        <div className="content-max text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple/10 border border-purple/20 text-purple mb-6">
            <Cog size={32} />
          </div>
          <h2 className="heading-section mb-6">Custom Built for Your Stack</h2>
          <p className="body-text max-w-2xl mx-auto">
            Whether you use standard SaaS products or custom legacy systems, we integrate and automate across platforms seamlessly.
          </p>
        </div>
      </section>
    </div>
  );
}
