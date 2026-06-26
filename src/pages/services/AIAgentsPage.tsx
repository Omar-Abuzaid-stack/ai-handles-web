import { Link } from 'react-router';
import { ArrowLeft, Bot, Search, PhoneForwarded, Edit3, BarChart, Settings, CheckCircle, ShieldCheck } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AIAgentsPage() {
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
            <h1 className="heading-display mb-6 animate-item">AI Agents</h1>
            <p className="body-text max-w-2xl animate-item">
              Deploy specialized AI agents designed to handle your repetitive, data-heavy, and engagement-focused tasks. Operating 24/7 with zero downtime.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-body font-semibold text-white mb-6">The Next Evolution of Work</h2>
            <p className="body-text text-white/70 mb-12">
              Imagine having a dedicated workforce that doesn't sleep, doesn't make manual errors, and scales instantly. Our AI agents are built to handle the heavy lifting, allowing your human team to focus entirely on strategy, relationships, and closing deals.
            </p>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Search size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Research Agent</h3>
                  <p className="text-white/60 leading-relaxed">
                    Deep-dives into data, competitors, and market trends. It gathers and synthesizes actionable intelligence so you always walk into a meeting prepared.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <PhoneForwarded size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Sales & Follow-Up Agent</h3>
                  <p className="text-white/60 leading-relaxed">
                    Engages leads and follows up systematically. It answers questions, qualifies prospects, and pushes them down the funnel until they are ready for a human closer.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Edit3 size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Content Posting Agent</h3>
                  <p className="text-white/60 leading-relaxed">
                    Automates content creation, scheduling, and publishing across your platforms, maintaining a consistent brand voice without the daily manual effort.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Settings size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Operations Tracker</h3>
                  <p className="text-white/60 leading-relaxed">
                    Monitors internal workflows, tracking tasks and ensuring that team operations run smoothly. Nothing falls through the cracks.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <BarChart size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Reporting Agent</h3>
                  <p className="text-white/60 leading-relaxed">
                    Automatically generates comprehensive performance reports. Get the insights you need instantly, without spending hours in spreadsheets.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">AI Orchestrator</h3>
                  <p className="text-white/60 leading-relaxed">
                    The central command. It manages the other agents, routes tasks, resolves conflicts, and ensures seamless collaboration across the entire digital workforce.
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
                <ShieldCheck size={20} />
              </div>
              <h2 className="font-body font-semibold text-2xl text-white">Our Commitment to Compliance</h2>
            </div>
            
            <p className="body-text text-white/70 mb-8">
              All AI Agents are built and deployed with strict adherence to legal and ethical standards. We believe in powerful automation that operates safely within the bounds of your industry.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#7E22CE] flex-shrink-0 mt-1" />
                <p className="text-sm text-white/60">We respect local and international laws.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#7E22CE] flex-shrink-0 mt-1" />
                <p className="text-sm text-white/60">Strict adherence to consent rules and opt-outs.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#7E22CE] flex-shrink-0 mt-1" />
                <p className="text-sm text-white/60">No illegal data scraping or unauthorized extraction.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#7E22CE] flex-shrink-0 mt-1" />
                <p className="text-sm text-white/60">Zero tolerance for spamming or harassment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
