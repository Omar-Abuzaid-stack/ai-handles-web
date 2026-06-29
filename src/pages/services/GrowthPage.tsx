import { Link } from 'react-router';
import { ArrowLeft, TrendingUp, Users, Target, Activity } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function GrowthPage() {
  const ref = useScrollAnimation();

  return (
    <div className="min-h-screen">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/#what-we-deploy" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-4">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="mb-12">
            <p className="label-text text-purple mb-4 animate-item">Service Detail</p>
            <h1 className="heading-display mb-6 animate-item">Growth Systems</h1>
            <p className="body-text max-w-2xl animate-item">
              Don't just run ads. Build a complete growth engine. We combine AI, automations, and deep analytics to scale your customer acquisition efficiently.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-body font-semibold text-white mb-6">Engineered Customer Acquisition</h2>
            <p className="body-text text-white/70 mb-12">
              Most businesses just run ads and hope for the best. We build complete growth engines. By combining AI-driven targeting, structured automations, and deep analytics, we scale your customer acquisition efficiently and predictably.
            </p>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Data-Driven Strategies</h3>
                  <p className="text-white/60 leading-relaxed">
                    Utilize advanced analytics to uncover hidden patterns and predict market shifts. We don't guess; we let the data dictate the most profitable growth avenues.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Target size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Targeted Outreach</h3>
                  <p className="text-white/60 leading-relaxed">
                    Reach exactly who you want, when you want, with highly personalized messaging at scale. We eliminate wasted ad spend by focusing entirely on your ideal customer profile.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Lead Generation Engines</h3>
                  <p className="text-white/60 leading-relaxed">
                    Build automated funnels that consistently turn cold traffic into qualified leads. Every step of the user journey is optimized to maximize conversion and reduce friction.
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
                <TrendingUp size={20} />
              </div>
              <h2 className="font-body font-semibold text-2xl text-white">Scale with Precision</h2>
            </div>
            <p className="body-text text-white/70">
              Growth isn't luck—it's engineering. We track every click, optimize every conversion rate, and continually refine your campaigns to ensure maximum return on investment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
