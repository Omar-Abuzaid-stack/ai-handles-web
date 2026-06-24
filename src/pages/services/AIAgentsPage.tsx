import { Link } from 'react-router';
import { ArrowLeft, Bot, Search, PhoneForwarded, Edit3, BarChart, Settings, CheckCircle, ShieldCheck } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AIAgentsPage() {
  const ref = useScrollAnimation();

  const agents = [
    { title: 'Research Agent', description: 'Deep-dives into data, competitors, and market trends to give you actionable intelligence.', icon: <Search size={24} /> },
    { title: 'Sales & Follow-Up Agent', description: 'Engages leads and follows up systematically to push them down the funnel.', icon: <PhoneForwarded size={24} /> },
    { title: 'Content Posting Agent', description: 'Automates content scheduling and publishing across platforms.', icon: <Edit3 size={24} /> },
    { title: 'Operations Tracker', description: 'Monitors workflows and ensures team and system operations are running smoothly.', icon: <Settings size={24} /> },
    { title: 'Reporting Agent', description: 'Generates comprehensive performance reports automatically.', icon: <BarChart size={24} /> },
    { title: 'AI Orchestrator', description: 'Manages other agents, routing tasks and ensuring seamless collaboration.', icon: <Bot size={24} /> },
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
            <h1 className="heading-display mb-6 animate-item">AI Agents</h1>
            <p className="body-text max-w-2xl animate-item">
              Deploy specialized AI agents designed to handle your repetitive, data-heavy, and engagement-focused tasks. Operating 24/7 with zero downtime.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, i) => (
              <div key={i} className="card-surface p-8 animate-item flex flex-col border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="w-12 h-12 rounded-xl bg-[#1A0B2E] border border-[#2D1B4E] flex items-center justify-center text-[#7E22CE] shadow-[0_0_15px_rgba(157,78,221,0.15)] mb-6">
                  {agent.icon}
                </div>
                <h3 className="font-body font-semibold text-lg text-white mb-2">{agent.title}</h3>
                <p className="body-text text-sm text-white/70">{agent.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#070707]">
        <div className="content-max">
          <div className="card-surface p-8 border-purple/30 relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center text-purple">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-body font-semibold text-xl text-white">Our Commitment to Compliance</h3>
            </div>
            <p className="body-text mb-6">All AI Agents are built and deployed with strict adherence to legal and ethical standards:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/70"><CheckCircle size={18} className="text-purple flex-shrink-0" /> We respect local and international laws.</li>
              <li className="flex items-start gap-3 text-sm text-white/70"><CheckCircle size={18} className="text-purple flex-shrink-0" /> Strict adherence to consent rules and opt-outs.</li>
              <li className="flex items-start gap-3 text-sm text-white/70"><CheckCircle size={18} className="text-purple flex-shrink-0" /> No illegal data scraping or unauthorized extraction.</li>
              <li className="flex items-start gap-3 text-sm text-white/70"><CheckCircle size={18} className="text-purple flex-shrink-0" /> Zero tolerance for spamming or harassment.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
