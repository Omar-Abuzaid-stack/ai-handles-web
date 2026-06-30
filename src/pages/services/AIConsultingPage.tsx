import { Link } from 'react-router';
import { ArrowLeft, Brain, ShieldCheck, CheckCircle, Search, Lightbulb, Map, MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AIConsultingPage() {
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
            <h1 className="heading-display mb-6 animate-item">AI Consulting & Advisory</h1>
            <p className="body-text max-w-2xl animate-item">
              We keep researching the best AI tools and strategies for you. Learn from our mistakes so you don't have to make them, saving you time, money, and headaches while keeping your business at the bleeding edge.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-body font-semibold text-white mb-6">Strategic Guidance in a Noisy Market</h2>
            <p className="body-text text-white/70 mb-12">
              The AI landscape moves too fast for most businesses to keep up. We act as your external R&D department, continually testing new tools, optimizing workflows, and uncovering the strategies that actually work in the real world—so you don't have to waste expensive trial-and-error cycles.
            </p>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-black/5 dark:bg-[#050505] border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Search size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-black dark:text-white mb-2">Continuous AI Tool Research</h3>
                  <p className="text-black/60 dark:text-white/60 leading-relaxed">
                    We constantly test the latest platforms and AI tools on the market. We separate the hype from the practical utilities so you only adopt technology that drives real ROI.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-black/5 dark:bg-[#050505] border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Map size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-black dark:text-white mb-2">Strategic Roadmap Planning</h3>
                  <p className="text-black/60 dark:text-white/60 leading-relaxed">
                    We help you build a clear, phased roadmap for AI integration in your business. No overwhelming overnight changes, just a methodical scale-up of your capabilities.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-black/5 dark:bg-[#050505] border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-black dark:text-white mb-2">Avoiding Costly Implementation Mistakes</h3>
                  <p className="text-black/60 dark:text-white/60 leading-relaxed">
                    We've built and deployed dozens of systems. We know exactly where the technical debt, integration nightmares, and logic loops hide. Learn from our past mistakes instead of paying for your own.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-black/5 dark:bg-[#050505] border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Lightbulb size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-black dark:text-white mb-2">Process Optimization Reviews</h3>
                  <p className="text-black/60 dark:text-white/60 leading-relaxed">
                    We dive into your existing operational processes to uncover hidden inefficiencies, identifying the exact bottlenecks where AI or automation will have the highest immediate impact.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-black/5 dark:bg-[#050505] border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-black dark:text-white mb-2">Executive AI Briefings</h3>
                  <p className="text-black/60 dark:text-white/60 leading-relaxed">
                    Regular, direct consultations with your leadership team to keep you updated on the tools you should care about, ensuring your business never falls behind the technology curve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-black/5 dark:bg-[#050505] border-t border-black/10 dark:border-white/5">
        <div className="content-max">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#7E22CE]/10 border border-[#7E22CE]/20 flex items-center justify-center text-[#7E22CE]">
                <Brain size={20} />
              </div>
              <h2 className="font-body font-semibold text-2xl text-black dark:text-white">Why Partner With Us?</h2>
            </div>
            
            <p className="body-text text-black/70 dark:text-white/70 mb-8">
              True innovation requires failure, but those failures don't have to be on your dime. We absorb the risk of testing unproven systems so you only get what works.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#7E22CE] flex-shrink-0 mt-1" />
                <p className="text-sm text-black/60 dark:text-white/60">We test tools extensively before recommending them.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#7E22CE] flex-shrink-0 mt-1" />
                <p className="text-sm text-black/60 dark:text-white/60">We prioritize ROI over bleeding-edge hype.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#7E22CE] flex-shrink-0 mt-1" />
                <p className="text-sm text-black/60 dark:text-white/60">We provide direct, unfiltered advice on what not to do.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#7E22CE] flex-shrink-0 mt-1" />
                <p className="text-sm text-black/60 dark:text-white/60">We focus strictly on practical business implementations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
