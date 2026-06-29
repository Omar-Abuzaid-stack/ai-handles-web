import { Link } from 'react-router';
import { ArrowLeft, Cpu, Shield, Layers, Server } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AIDeploymentPage() {
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
            <h1 className="heading-display mb-6 animate-item">AI Deployment</h1>
            <p className="body-text max-w-2xl animate-item">
              End-to-end deployment of sophisticated AI models. We handle the technical complexities of prompt engineering, fine-tuning, integration, and continuous monitoring.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-body font-semibold text-white mb-6">Seamless Integration, Zero Disruption</h2>
            <p className="body-text text-white/70 mb-12">
              Deploying AI isn't just about calling an API. It's about securely embedding intelligence into your existing operations without breaking what already works. We handle the technical complexities of prompt engineering, fine-tuning, system architecture, and continuous monitoring.
            </p>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Secure Infrastructure</h3>
                  <p className="text-white/60 leading-relaxed">
                    Enterprise-grade security protecting your data and your AI models. We implement strict data boundaries so your proprietary business information never trains public models.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Layers size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Scalable Architecture</h3>
                  <p className="text-white/60 leading-relaxed">
                    Systems built to scale effortlessly. Whether you're processing ten queries a day or ten thousand an hour, our infrastructure automatically adjusts to meet demand without bottlenecking.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Server size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Local & Cloud Deployment</h3>
                  <p className="text-white/60 leading-relaxed">
                    Flexible deployment options suited to your specific compliance needs. We can deploy entirely within your private cloud environment or utilize secure, high-performance managed infrastructure.
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
                <Cpu size={20} />
              </div>
              <h2 className="font-body font-semibold text-2xl text-white">Built for Performance</h2>
            </div>
            <p className="body-text text-white/70">
              From low-latency APIs required for real-time customer interactions to heavy batch processing for data analysis, our deployments are strictly optimized for cost and speed. We ensure reliable AI integration that strengthens your daily operations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
