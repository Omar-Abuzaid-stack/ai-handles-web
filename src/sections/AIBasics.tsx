import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { Inbox, BookOpen, CheckCircle, UserCheck, GitBranch, Bot } from 'lucide-react';

const agentSteps = [
  { icon: <Inbox size={24} />, label: 'Receives Information', desc: 'Gathers enquiry or task data' },
  { icon: <BookOpen size={24} />, label: 'Checks Knowledge Base', desc: 'Accesses company information' },
  { icon: <CheckCircle size={24} />, label: 'Completes Task', desc: 'Executes assigned responsibility' },
  { icon: <UserCheck size={24} />, label: 'Escalates to Human', desc: 'Routes exceptions to people' },
];

const comparisonRows = [
  { automation: 'Follows a predefined sequence', agent: 'Understands context' },
  { automation: 'Begins with a trigger', agent: 'Analyses unstructured information' },
  { automation: 'Repeats strict structured steps', agent: 'Personalises outputs dynamically' },
  { automation: 'Moves data between systems', agent: 'Handles variation and tone' },
  { automation: 'Works best for predictable admin', agent: 'Makes limited approved decisions' },
];

export default function AIBasics() {
  const sectionRef = useScrollAnimation();
  const stepsRef = useStaggerAnimation('.step-item');
  const compRef = useStaggerAnimation('.comp-row');

  return (
    <section id="ai-basics" className="bg-[#0A0A0A] section-padding border-t border-[#2A2A2A]">
      <div ref={sectionRef} className="content-max space-y-24">
        {/* What Is An AI Agent */}
        <div>
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 animate-item uppercase">
              Understanding AI
            </p>
            <h2 className="section-title text-[#F5F0EB] mb-6 animate-item">
              One Agent. One Clear Responsibility.
            </h2>
            <p className="font-body text-base text-[#8A8478] max-w-[640px] leading-relaxed animate-item">
              An AI agent is a digital worker assigned to a defined business responsibility. It can understand information, analyse context, prepare outputs, communicate, and perform approved actions.
            </p>
          </div>

          {/* Agent Process Visualization */}
          <div ref={stepsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {agentSteps.map((step, i) => (
              <div key={i} className="step-item relative text-center group">
                <div className="w-16 h-16 rounded-full bg-[#141414] border border-[#2A2A2A] flex items-center justify-center mx-auto mb-4 text-[#C9A96E] group-hover:border-[#C9A96E] group-hover:shadow-[0_0_20px_rgba(201,169,110,0.2)] transition-all duration-300 group-hover:-translate-y-1">
                  {step.icon}
                </div>
                {/* Arrow connector */}
                {i < agentSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+32px)] right-0 h-[2px]">
                    <div className="h-full bg-gradient-to-r from-[#C9A96E]/50 to-transparent" style={{ width: '60%' }} />
                  </div>
                )}
                <h4 className="font-body font-semibold text-sm text-[#F5F0EB] mb-1">
                  {step.label}
                </h4>
                <p className="font-body text-xs text-[#8A8478] max-w-[120px] mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Agent vs Automation */}
        <div>
          <h3 className="font-display text-2xl lg:text-3xl text-[#F5F0EB] mb-4 text-center animate-item">
            Automation is the workflow.
            <br />
            <span className="text-[#C9A96E]">The AI agent is the digital worker.</span>
          </h3>
          <p className="font-body text-[15px] text-[#8A8478] leading-relaxed mb-10 text-center max-w-2xl mx-auto animate-item">
            Traditional automation (like Zapier or Make) moves data from A to B based on strict, deterministic rules. It breaks if a situation doesn't match the rule. AI Agents, however, can reason, understand intent, read unstructured data, and make decisions before deciding which automation to trigger. Vantility systems combine both.
          </p>

          <div ref={compRef} className="grid md:grid-cols-2 gap-0 border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl">
            {/* Headers */}
            <div className="bg-[#141414] p-6 flex items-center gap-4 border-b border-[#2A2A2A]">
              <div className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[#F5F0EB]">
                <GitBranch size={20} />
              </div>
              <div>
                <span className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] block mb-1">
                  AUTOMATION
                </span>
                <span className="font-body text-[13px] text-[#5A5550]">The Infrastructure</span>
              </div>
            </div>
            <div className="bg-[#141414] p-6 flex items-center gap-4 border-b border-[#2A2A2A] md:border-l relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#C9A96E]/5 pointer-events-none" />
              <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E]">
                <Bot size={20} />
              </div>
              <div>
                <span className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] block mb-1">
                  AI AGENT
                </span>
                <span className="font-body text-[13px] text-[#5A5550]">The Worker</span>
              </div>
            </div>

            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <div key={i} className="contents group">
                <div className={`comp-row p-5 flex items-center ${i < comparisonRows.length - 1 ? 'border-b' : ''} border-[#2A2A2A] bg-[#0A0A0A] hover:bg-[#141414] transition-colors`}>
                  <span className="font-body text-sm text-[#8A8478]">{row.automation}</span>
                </div>
                <div className={`comp-row p-5 flex items-center ${i < comparisonRows.length - 1 ? 'border-b' : ''} border-[#2A2A2A] bg-[#0A0A0A] md:border-l hover:bg-[#141414] transition-colors relative`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] mr-3 opacity-50" />
                  <span className="font-body text-sm text-[#F5F0EB]">{row.agent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
