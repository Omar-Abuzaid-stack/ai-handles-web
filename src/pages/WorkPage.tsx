import { Link } from 'react-router';
import { ArrowLeft, Briefcase, Zap, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function WorkPage() {
  const ref = useScrollAnimation();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="mb-16">
            <p className="label-text text-[#7E22CE] mb-4 animate-item">Partnership Models</p>
            <h1 className="heading-display mb-6 animate-item">Ways to Work With AI Handle</h1>
            <p className="body-text max-w-2xl animate-item">
              We don't sell off-the-shelf software. We build, deploy, and manage professional AI infrastructure tailored specifically to your business operations.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* One-Time Implementation */}
            <div className="card-surface p-8 animate-item flex flex-col justify-between border border-white/5 hover:border-[#7E22CE]/30 transition-colors bg-gradient-to-b from-white/[0.02] to-transparent">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1A0B2E] border border-[#2D1B4E] flex items-center justify-center text-[#7E22CE] shadow-[0_0_15px_rgba(157,78,221,0.15)] mb-6">
                  <Zap size={24} />
                </div>
                <h3 className="font-body font-semibold text-xl text-white mb-3">One-Time Implementation</h3>
                <p className="body-text text-sm mb-6 text-white/70">
                  AI Handle builds and deploys the agreed system as a one-time project. After delivery, future repairs, maintenance, or upgrades can be provided through a reasonable maintenance fee or separate support agreement.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-2 text-sm text-white/50">
                    <CheckCircle size={14} className="text-[#7E22CE] mt-0.5 flex-shrink-0" />
                    <span>Custom workflow mapping</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/50">
                    <CheckCircle size={14} className="text-[#7E22CE] mt-0.5 flex-shrink-0" />
                    <span>System design and build</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/50">
                    <CheckCircle size={14} className="text-[#7E22CE] mt-0.5 flex-shrink-0" />
                    <span>Integration with existing tools</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/50">
                    <CheckCircle size={14} className="text-[#7E22CE] mt-0.5 flex-shrink-0" />
                    <span>Testing and launch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Managed Partnership */}
            <div className="card-surface p-8 animate-item flex flex-col justify-between border border-[#7E22CE]/30 transition-colors bg-gradient-to-b from-[#7E22CE]/[0.05] to-transparent relative">
              <span className="absolute -top-3 left-8 text-[10px] px-3 py-1 rounded-full bg-[#1A0B2E] text-[#7E22CE] border border-[#2D1B4E] uppercase tracking-wider font-semibold">Recommended</span>
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1A0B2E] border border-[#2D1B4E] flex items-center justify-center text-[#7E22CE] shadow-[0_0_15px_rgba(157,78,221,0.15)] mb-6">
                  <Briefcase size={24} />
                </div>
                <h3 className="font-body font-semibold text-xl text-white mb-3">Monthly Managed Partnership</h3>
                <p className="body-text text-sm mb-6 text-white/70">
                  AI Handle can manage the deployed AI agents and infrastructure every month, ensuring smooth operations, continuous improvements, and technical support.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-2 text-sm text-white/50">
                    <CheckCircle size={14} className="text-[#7E22CE] mt-0.5 flex-shrink-0" />
                    <span>Agent monitoring & Workflow maintenance</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/50">
                    <CheckCircle size={14} className="text-[#7E22CE] mt-0.5 flex-shrink-0" />
                    <span>CRM management & Reporting</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/50">
                    <CheckCircle size={14} className="text-[#7E22CE] mt-0.5 flex-shrink-0" />
                    <span>Improvements & New integrations</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/50">
                    <CheckCircle size={14} className="text-[#7E22CE] mt-0.5 flex-shrink-0" />
                    <span>Content systems & Technical support</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/50">
                    <CheckCircle size={14} className="text-[#7E22CE] mt-0.5 flex-shrink-0" />
                    <span>Security and approval reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Partnership */}
            <div className="card-surface p-8 animate-item flex flex-col justify-between border border-white/5 hover:border-[#7E22CE]/30 transition-colors bg-gradient-to-b from-white/[0.02] to-transparent">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1A0B2E] border border-[#2D1B4E] flex items-center justify-center text-[#7E22CE] shadow-[0_0_15px_rgba(157,78,221,0.15)] mb-6">
                  <TrendingUp size={24} />
                </div>
                <h3 className="font-body font-semibold text-xl text-white mb-3">Growth Partnership</h3>
                <p className="body-text text-sm mb-6 text-white/70">
                  AI Handle can help scale the business by generating attention and capturing it with AI-driven infrastructure.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-2 text-sm text-white/50">
                    <CheckCircle size={14} className="text-[#7E22CE] mt-0.5 flex-shrink-0" />
                    <span>Paid advertising & Landing pages</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/50">
                    <CheckCircle size={14} className="text-[#7E22CE] mt-0.5 flex-shrink-0" />
                    <span>AI lead qualification & Automated follow-up</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/50">
                    <CheckCircle size={14} className="text-[#7E22CE] mt-0.5 flex-shrink-0" />
                    <span>Organic content planning & Social publishing</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/50">
                    <CheckCircle size={14} className="text-[#7E22CE] mt-0.5 flex-shrink-0" />
                    <span>AI-assisted videos & Approved repurposing</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/50">
                    <CheckCircle size={14} className="text-[#7E22CE] mt-0.5 flex-shrink-0" />
                    <span>Campaign reporting</span>
                  </div>
                </div>
                <p className="text-[10px] text-white/30 italic mt-4">Note: We do not guarantee revenue, sales, or advertising performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#070707]">
        <div className="content-max text-center">
          <h2 className="heading-section mb-4">Ready to Discuss Your Setup?</h2>
          <p className="body-text mb-8 max-w-lg mx-auto">Contact us to map out the best infrastructure for your business.</p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#7E22CE] hover:bg-[#7E22CE]/90 text-white font-medium text-sm transition-all group">
            Start Your Project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
