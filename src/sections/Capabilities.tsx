import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { Bot, Workflow, Layout, Database, Phone, BarChart3, ArrowRight } from 'lucide-react';

const capabilities = [
  {
    icon: <Bot size={24} />,
    title: 'AI Agents',
    desc: 'Specialised digital workers designed for clear business responsibilities, capable of reasoning and independent execution.',
    label: 'Reasoning Engine'
  },
  {
    icon: <Workflow size={24} />,
    title: 'Business Automations',
    desc: 'Structured, deterministic workflows that reduce repetitive manual processes and organise the movement of information.',
    label: 'Deterministic Logic'
  },
  {
    icon: <Layout size={24} />,
    title: 'Premium AI Websites',
    desc: 'High-quality websites that communicate your offer, generate demand, and prepare the structure for future integrations.',
    label: 'Frontend Experience'
  },
  {
    icon: <Database size={24} />,
    title: 'CRM Workflows',
    desc: 'Processes that organise lead information, stages, notes, reminders, ownership, and executive reporting.',
    label: 'Data Architecture'
  },
  {
    icon: <Phone size={24} />,
    title: 'AI Voice Reception',
    desc: 'Inbound call experiences that collect information, answer approved questions, qualify callers, and route important leads.',
    label: 'Voice Interface'
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Executive Reporting',
    desc: 'Daily, weekly, and monthly operational summaries for management, delivered via Telegram or email.',
    label: 'Business Intelligence'
  }
];

export default function Capabilities() {
  const sectionRef = useScrollAnimation();
  const gridRef = useStaggerAnimation('.capability-card');

  return (
    <section id="capabilities" className="bg-[#141414] section-padding relative">
      {/* Connector lines to previous section */}
      <div className="absolute top-0 left-[10%] w-px h-16 bg-gradient-to-b from-[#C9A96E]/50 to-transparent" />
      <div className="absolute top-0 right-[10%] w-px h-16 bg-gradient-to-b from-[#C9A96E]/50 to-transparent" />

      <div ref={sectionRef} className="content-max">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 animate-item uppercase">
              AI Handle Capabilities
            </p>
            <h2 className="section-title text-[#F5F0EB] mb-6 animate-item">
              Infrastructure That Scales Without the Admin Overhead
            </h2>
            <p className="font-body text-base text-[#8A8478] animate-item leading-relaxed">
              We build the technical layers that allow businesses to handle more leads, process more data, and manage more communication — while maintaining absolute control.
            </p>
          </div>
          <a href="#system-builder" className="btn-secondary hidden md:inline-flex animate-item">
            Design Your System
          </a>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <div key={i} className="capability-card card-base border-[#2A2A2A] hover:border-[#C9A96E]/50 group transition-all duration-500 relative overflow-hidden">
              {/* Hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A96E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-[#C9A96E] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                    {cap.icon}
                  </div>
                  <span className="font-mono text-[9px] px-2 py-1 border border-[#2A2A2A] rounded-full text-[#5A5550] group-hover:border-[#C9A96E]/30 group-hover:text-[#C9A96E] transition-colors">
                    {cap.label}
                  </span>
                </div>
                <h3 className="font-body font-semibold text-lg text-[#F5F0EB] mb-3">
                  {cap.title}
                </h3>
                <p className="font-body text-sm text-[#8A8478] leading-relaxed mb-6">
                  {cap.desc}
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-[11px] font-mono text-[#5A5550] group-hover:text-[#C9A96E] transition-colors cursor-pointer w-fit">
                  <span>EXPLORE MODULE</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
