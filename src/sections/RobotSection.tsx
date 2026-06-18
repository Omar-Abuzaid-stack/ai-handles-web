import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Check, Shield, FileEdit, Zap, GitBranch, Activity, Database, Key } from 'lucide-react';
import type { Robot } from '@/data';

interface RobotSectionProps {
  robot: Robot;
  bgClass?: string;
  children?: React.ReactNode;
}

export default function RobotSection({ robot, bgClass = 'bg-[#0A0A0A]', children }: RobotSectionProps) {
  const ref = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<'input' | 'process' | 'output'>('process');

  return (
    <section id={`robot-${robot.id}`} className={`${bgClass} section-padding relative overflow-hidden`}>
      {/* Background ambient light */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[400px] h-[400px] bg-[#C9A96E]/5 blur-[100px] rounded-full pointer-events-none opacity-30" />

      <div ref={ref} className="content-max relative z-10">
        <div className="grid lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-start">
          {/* Left - Visual Workstation */}
          <div className="animate-item space-y-6 sticky top-24">
            <div className="relative rounded-xl overflow-hidden aspect-[3/4] max-h-[600px] border border-[#2A2A2A] bg-[#0A0A0A] group shadow-2xl">
              
              {/* Working Agent Overlay */}
              {robot.id !== 'flux' && (
                <div className="absolute inset-0 z-20 pointer-events-none">
                   {/* Scanning Line */}
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent animate-scan" />
                   {/* HUD Elements */}
                   <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5 opacity-60">
                      <div className="w-10 h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-[#C9A96E] animate-pulse" />
                      </div>
                      <span className="font-mono text-[8px] text-[#C9A96E] tracking-widest uppercase">Agent_Active</span>
                   </div>
                   <div className="absolute bottom-6 left-6 font-mono text-[8px] text-[#C9A96E]/40 space-y-1 max-w-[150px]">
                      <p className="animate-pulse">PROCESS_ID: {robot.id.toUpperCase()}_v1.2</p>
                      <p>STATUS: SYNC_COMPLETE</p>
                   </div>
                </div>
              )}

              {robot.id === 'flux' ? (
                <div className="relative w-full h-full flex items-center justify-center p-8 bg-[#0A0A0A]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent z-10 pointer-events-none" />
                  
                  {/* Workflow Diagram */}
                  <div className="w-full max-w-sm relative z-20 space-y-8">
                    <div className="flex justify-between items-center relative">
                       <div className="w-14 h-14 rounded-2xl bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center shadow-lg z-20 group-hover:-translate-y-1 transition-transform">
                         <Database size={20} className="text-[#C9A96E]" />
                       </div>
                       <div className="absolute left-14 right-14 h-px bg-gradient-to-r from-[#C9A96E]/30 to-transparent overflow-hidden">
                         <div className="w-full h-full bg-[#C9A96E] animate-[slide-right_2s_linear_infinite]" />
                       </div>
                       <div className="w-14 h-14 rounded-2xl bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center shadow-lg z-20 group-hover:-translate-y-1 transition-transform">
                         <span className="font-mono text-[10px] font-bold text-[#F5F0EB]">CRM</span>
                       </div>
                    </div>
                    
                    <div className="flex justify-center relative py-4">
                       <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C9A96E]/30 to-transparent" />
                       <div className="w-16 h-16 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/40 flex items-center justify-center shadow-[0_0_30px_rgba(201,169,110,0.15)] z-20 group-hover:scale-105 transition-transform">
                         <GitBranch size={24} className="text-[#C9A96E]" />
                       </div>
                    </div>

                    <div className="flex justify-between items-center relative">
                       <div className="w-14 h-14 rounded-2xl bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center shadow-lg z-20 group-hover:translate-y-1 transition-transform">
                         <span className="font-mono text-[10px] font-bold text-[#4ADE80]">WA</span>
                       </div>
                       <div className="absolute left-14 right-14 h-px bg-gradient-to-r from-transparent to-[#C9A96E]/30 overflow-hidden">
                         <div className="w-full h-full bg-[#C9A96E] animate-[slide-left_2s_linear_infinite]" />
                       </div>
                       <div className="w-14 h-14 rounded-2xl bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center shadow-lg z-20 group-hover:translate-y-1 transition-transform">
                         <span className="font-mono text-[10px] font-bold text-[#3B82F6]">MAIL</span>
                       </div>
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={robot.image}
                  alt={`${robot.name} — ${robot.title}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
              )}
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#C9A96E]/30 z-30" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#C9A96E]/30 z-30" />

              {/* Department badge */}
              <div className="absolute top-4 left-4 z-30">
                <span className="font-mono text-[9px] tracking-[0.15em] text-[#C9A96E] bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#C9A96E]/20 px-3 py-1 rounded-full uppercase">
                  {robot.department}
                </span>
              </div>
            </div>

            {/* Interaction Selector */}
            <div className="bg-[#141414]/90 backdrop-blur-md border border-[#2A2A2A] rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 border-b border-[#2A2A2A]">
                {(['input', 'process', 'output'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 font-mono text-[9px] tracking-widest uppercase transition-all ${
                      activeTab === tab 
                        ? 'bg-[#C9A96E]/10 text-[#C9A96E] border-b-2 border-[#C9A96E]' 
                        : 'text-[#5A5550] hover:text-[#8A8478]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-4 h-24 flex items-center justify-center text-center">
                {activeTab === 'input' && (
                  <div className="space-y-2 animate-fade-in w-full">
                    <Database size={16} className="text-[#8A8478] mx-auto opacity-50" />
                    <p className="font-mono text-[10px] text-[#8A8478] leading-tight uppercase tracking-tight">Ingesting specific triggers, data, and context for {robot.name}.</p>
                  </div>
                )}
                {activeTab === 'process' && (
                  <div className="space-y-2 animate-fade-in w-full">
                    <Activity size={16} className="text-[#C9A96E] mx-auto animate-pulse" />
                    <p className="font-mono text-[10px] text-[#C9A96E] leading-tight uppercase tracking-tight">Analyzing real estate context and executing determined responsibilities.</p>
                  </div>
                )}
                {activeTab === 'output' && (
                  <div className="space-y-2 animate-fade-in w-full">
                    <Key size={16} className="text-[#4ADE80] mx-auto opacity-70" />
                    <p className="font-mono text-[10px] text-[#4ADE80] leading-tight uppercase tracking-tight">Updating systems, sending comms, or escalating to management.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 animate-item">
            {/* Department & Name */}
            <div>
              <p className="font-mono text-[11px] tracking-[0.15em] text-[#C9A96E] mb-3">
                {robot.floor} — {robot.department}
              </p>
              <h2 className="subsection-title text-[#F5F0EB] mb-2">
                {robot.name} — {robot.title}
              </h2>
              <p className="font-body font-medium text-base text-[#C9A96E] mb-4">
                {robot.tagline}
              </p>
              <p className="font-body text-[15px] text-[#8A8478] leading-relaxed max-w-[500px]">
                {robot.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div>
              <h3 className="font-body font-semibold text-sm text-[#F5F0EB] mb-4">
                Key Responsibilities
              </h3>
              <ul className="space-y-2.5">
                {robot.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-[#C9A96E] mt-0.5 flex-shrink-0" />
                    <span className="font-body text-sm text-[#8A8478]">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modes (for WASP) */}
            {robot.modes && (
              <div>
                <h3 className="font-body font-semibold text-sm text-[#F5F0EB] mb-4">
                  Operating Modes
                </h3>
                <div className="grid gap-3">
                  {robot.modes.map((mode, i) => (
                    <div key={i} className="card-base !p-4 flex items-start gap-3">
                      {i === 0 && <FileEdit size={18} className="text-[#C9A96E] mt-0.5 flex-shrink-0" />}
                      {i === 1 && <Shield size={18} className="text-[#C9A96E] mt-0.5 flex-shrink-0" />}
                      {i === 2 && <Zap size={18} className="text-[#C9A96E] mt-0.5 flex-shrink-0" />}
                      <div>
                        <h4 className="font-body font-semibold text-sm text-[#F5F0EB]">
                          {mode.name}
                        </h4>
                        <p className="font-body text-xs text-[#8A8478]">{mode.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="font-body text-xs text-[#5A5550] mt-3">
                  No uncontrolled spam. The company defines the rules.
                </p>
              </div>
            )}

            {/* Workflow (for ECHO) */}
            {robot.workflow && robot.workflow.length > 0 && (
              <div>
                <h3 className="font-body font-semibold text-sm text-[#F5F0EB] mb-4">
                  Outreach Workflow
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  {robot.workflow!.map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg px-3 py-2 font-mono text-[11px] text-[#8A8478]">
                        {step}
                      </span>
                      {i < robot.workflow!.length - 1 && (
                        <GitBranch size={14} className="text-[#C9A96E]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pillars (for VISTA) */}
            {robot.pillars && (
              <div>
                <h3 className="font-body font-semibold text-sm text-[#F5F0EB] mb-4">
                  Three Visibility Pillars
                </h3>
                <div className="grid gap-3">
                  {robot.pillars.map((pillar, i) => (
                    <div key={i} className="card-base !p-4">
                      <h4 className="font-body font-semibold text-sm text-[#C9A96E] mb-1">
                        {pillar.name}
                      </h4>
                      <p className="font-body text-xs text-[#8A8478]">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes (for VOX, PULSE) */}
            {robot.notes && (
              <div className="space-y-2">
                {robot.notes.map((note, i) => (
                  <div key={i} className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg p-3">
                    <p className="font-mono text-xs text-[#F59E0B]">{note}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Custom children */}
            {children}

            {/* Human Escalation */}
            <div className="flex items-start gap-3 bg-[#141414] border border-[#2A2A2A] rounded-lg p-4">
              <Shield size={18} className="text-[#F59E0B] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-body font-semibold text-xs text-[#F59E0B] mb-1">
                  HUMAN CONTROL
                </h4>
                <p className="font-body text-sm text-[#8A8478]">
                  {robot.humanEscalation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
