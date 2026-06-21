import { useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { floors } from '@/data';
import {
  Info, MessageSquare, Database, Search, PenTool,
  Workflow, BarChart3, Shield, Building2,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Info: <Info size={24} />,
  MessageSquare: <MessageSquare size={24} />,
  Database: <Database size={24} />,
  Search: <Search size={24} />,
  PenTool: <PenTool size={24} />,
  Workflow: <Workflow size={24} />,
  BarChart3: <BarChart3 size={24} />,
  Shield: <Shield size={24} />,
  Building2: <Building2 size={24} />,
};

export default function Lobby() {
  const gridRef = useStaggerAnimation('.floor-card');

  const handleFloorClick = (link: string) => {
    const el = document.querySelector(link);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="lobby" className="bg-transparent section-padding">
      <div className="content-max">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A0A0A]/50 backdrop-blur-md border border-[#2A2A2A] rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
            <span className="font-mono text-[10px] text-[#C9A96E] tracking-widest uppercase">Building Directory</span>
          </div>
          <h2 className="section-title text-[#F5F0EB] mb-4">
            Welcome to AI Handle
          </h2>
          <p className="font-body text-base text-[#8A8478] max-w-[600px] mx-auto">
            Navigate through our specialized departments to meet the AI digital workforce.
          </p>
        </div>

        {/* Floor Directory Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {floors.map((floor) => (
            <button
              key={floor.id}
              onClick={() => handleFloorClick(floor.sectionLink)}
              className="floor-card card-base text-left group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono text-[11px] text-[#5A5550]">
                  {floor.floor}
                </span>
                <span className="text-[#C9A96E] group-hover:scale-110 transition-transform">
                  {iconMap[floor.icon]}
                </span>
              </div>
              <h3 className="font-body font-semibold text-base text-[#F5F0EB] mb-1">
                {floor.name}
              </h3>
              <p className="font-body text-sm text-[#8A8478]">
                {floor.description}
              </p>
            </button>
          ))}
        </div>

        {/* Orchestrator Status Panel */}
        <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Left - Orchestrator Info */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9A96E]">
                <img
                  src="/images/robots/orion.jpg"
                  alt="ORION AI Orchestrator"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-body font-semibold text-sm text-[#F5F0EB]">
                  ORION — AI Orchestrator
                </h4>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                  <span className="font-mono text-xs text-[#8A8478]">
                    Active — Coordinating 11 Agents
                  </span>
                </div>
              </div>
            </div>

            {/* Center - Connection Diagram */}
            <div className="flex-1 flex items-center justify-center py-4">
              <div className="flex items-center gap-1 flex-wrap justify-center">
                {/* Central Node */}
                <div className="relative mx-2">
                  <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 border-2 border-[#C9A96E] flex items-center justify-center">
                    <span className="font-mono text-[10px] text-[#C9A96E] font-bold">O</span>
                  </div>
                  {/* Connection Lines */}
                  <div className="absolute top-full left-1/2 w-px h-4 bg-gradient-to-b from-[#C9A96E] to-transparent" />
                </div>
                {/* Agent Nodes */}
                {['W', 'C', 'S', 'E', 'M', 'V', 'X', 'L', 'P', 'F', 'G'].map((letter, i) => (
                  <div key={i} className="relative mx-1">
                    <div className="w-6 h-6 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center hover:border-[#C9A96E] hover:bg-[#C9A96E]/10 transition-all cursor-pointer group/node">
                      <span className="font-mono text-[8px] text-[#8A8478] group-hover/node:text-[#C9A96E]">{letter}</span>
                    </div>
                    {/* Animated connection */}
                    <div
                      className="absolute -top-2 left-1/2 w-px h-3 bg-gradient-to-t from-[#C9A96E] to-transparent opacity-50"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right - System Status */}
            <div className="flex-shrink-0 font-mono text-xs text-[#8A8478] space-y-2">
              <p className="flex items-center justify-between gap-4">System Status: <span className="text-[#4ADE80]">Operational</span></p>
              <p className="flex items-center justify-between gap-4">Active Workflows: <span className="text-[#C9A96E]">47</span></p>
              <p className="flex items-center justify-between gap-4">Pending Approvals: <span className="text-[#F59E0B] font-bold border border-[#F59E0B]/30 px-1.5 rounded animate-pulse">3</span></p>
              <p className="pt-2 border-t border-[#2A2A2A] text-[#5A5550] text-[9px] mt-2 uppercase">Human Oversite Active</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
