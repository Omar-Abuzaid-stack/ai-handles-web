import { Link } from 'react-router';
import { ArrowLeft, Workflow, Zap, Repeat, Cog } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AutomationsPage() {
  const ref = useScrollAnimation();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-6">
            <ArrowLeft size={14} /> Back to Services
          </Link>
          <div className="mb-12">
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
          <div className="max-w-3xl">
            <h2 className="text-2xl font-body font-semibold text-white mb-6">Eliminate the Busywork</h2>
            <p className="body-text text-white/70 mb-12">
              Human capital is too expensive to spend on copy-pasting data, sending routine emails, or updating CRM statuses. We build structured workflows that connect your tools, move information instantly, and trigger actions based on precise business logic.
            </p>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Workflow size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Workflow Optimization</h3>
                  <p className="text-white/60 leading-relaxed">
                    We map out your most time-consuming business processes and replace them with bulletproof automated sequences. No dropped leads, no missed follow-ups.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Instant Triggers</h3>
                  <p className="text-white/60 leading-relaxed">
                    React immediately when a customer submits a form, opens an email, or updates their profile. Immediate responses increase conversion rates exponentially.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Repeat size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Repetitive Task Elimination</h3>
                  <p className="text-white/60 leading-relaxed">
                    Free up your team by handing over routine, mundane tasks to reliable automated systems. Let your humans do what humans do best: build relationships and strategize.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-[#050505] border-t border-white/5">
        <div className="content-max">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#7E22CE]/10 border border-[#7E22CE]/20 flex items-center justify-center text-[#7E22CE]">
                <Cog size={20} />
              </div>
              <h2 className="font-body font-semibold text-2xl text-white">Custom Built for Your Stack</h2>
            </div>
            <p className="body-text text-white/70">
              Whether you use standard SaaS products like Salesforce, HubSpot, or custom legacy systems, we integrate and automate across platforms seamlessly. We don't force you into a new ecosystem; we make your current ecosystem work flawlessly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
