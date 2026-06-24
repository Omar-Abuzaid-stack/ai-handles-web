import { Link } from 'react-router';
import { ArrowLeft, TrendingUp, Users, Target, Activity } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function GrowthPage() {
  const ref = useScrollAnimation();

  const features = [
    { title: 'Data-Driven Strategies', description: 'Utilize AI to uncover hidden patterns and predict market shifts.', icon: <Activity size={24} /> },
    { title: 'Targeted Outreach', description: 'Reach exactly who you want, when you want, with personalized messaging at scale.', icon: <Target size={24} /> },
    { title: 'Lead Generation Engines', description: 'Build automated funnels that consistently turn cold traffic into qualified leads.', icon: <Users size={24} /> },
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
            <h1 className="heading-display mb-6 animate-item">Growth Systems</h1>
            <p className="body-text max-w-2xl animate-item">
              Don't just run ads. Build a complete growth engine. We combine AI, automations, and deep analytics to scale your customer acquisition efficiently.
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
            <TrendingUp size={32} />
          </div>
          <h2 className="heading-section mb-6">Scale with Precision</h2>
          <p className="body-text max-w-2xl mx-auto">
            Growth isn't luck—it's engineering. We track every click, optimize every conversion rate, and refine your campaigns to ensure maximum ROI.
          </p>
        </div>
      </section>
    </div>
  );
}
