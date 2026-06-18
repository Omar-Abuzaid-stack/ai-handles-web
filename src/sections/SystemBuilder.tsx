import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Settings, Check, Loader2, ArrowRight } from 'lucide-react';

const options = {
  challenge: ['Too many missed leads', 'Slow follow-ups', 'Disorganised CRM', 'No after-hours support', 'Manual reporting'],
  focus: ['WhatsApp Sales', 'Voice Reception', 'CRM Operations', 'Lead Research', 'Content Creation'],
  scale: ['Boutique (1-5 agents)', 'Mid-size (6-20 agents)', 'Enterprise (20+ agents)', 'Developer'],
};

export default function SystemBuilder() {
  const ref = useScrollAnimation();
  const [selections, setSelections] = useState({ challenge: '', focus: '', scale: '' });
  const [isBuilding, setIsBuilding] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (category: keyof typeof selections, value: string) => {
    setSelections(prev => ({ ...prev, [category]: value }));
    setShowResult(false);
  };

  const handleBuild = () => {
    if (!selections.challenge || !selections.focus || !selections.scale) return;
    setIsBuilding(true);
    setTimeout(() => {
      setIsBuilding(false);
      setShowResult(true);
    }, 1500);
  };

  const isReady = selections.challenge && selections.focus && selections.scale;

  return (
    <section id="system-builder" className="bg-[#0A0A0A] section-padding border-y border-[#2A2A2A]">
      <div ref={ref} className="content-max">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 animate-item uppercase">
            Interactive Configurator
          </p>
          <h2 className="section-title text-[#F5F0EB] mb-4 animate-item">
            Design Your AI Workforce
          </h2>
          <p className="font-body text-base text-[#8A8478] max-w-[600px] mx-auto animate-item">
            Select your primary business parameters below to see a simulated Vantility system recommendation.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 animate-item">
          {/* Builder Controls */}
          <div className="lg:col-span-2 space-y-8">
            {/* Category 1 */}
            <div>
              <h4 className="font-body font-semibold text-sm text-[#F5F0EB] mb-3">1. Primary Challenge</h4>
              <div className="flex flex-wrap gap-2">
                {options.challenge.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleSelect('challenge', opt)}
                    className={`px-3 py-1.5 rounded-md font-body text-[13px] transition-all border ${
                      selections.challenge === opt 
                        ? 'bg-[#C9A96E] text-[#0A0A0A] border-[#C9A96E]' 
                        : 'bg-[#141414] text-[#8A8478] border-[#2A2A2A] hover:border-[#C9A96E]/50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Category 2 */}
            <div>
              <h4 className="font-body font-semibold text-sm text-[#F5F0EB] mb-3">2. Desired AI Focus</h4>
              <div className="flex flex-wrap gap-2">
                {options.focus.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleSelect('focus', opt)}
                    className={`px-3 py-1.5 rounded-md font-body text-[13px] transition-all border ${
                      selections.focus === opt 
                        ? 'bg-[#C9A96E] text-[#0A0A0A] border-[#C9A96E]' 
                        : 'bg-[#141414] text-[#8A8478] border-[#2A2A2A] hover:border-[#C9A96E]/50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Category 3 */}
            <div>
              <h4 className="font-body font-semibold text-sm text-[#F5F0EB] mb-3">3. Operation Scale</h4>
              <div className="flex flex-wrap gap-2">
                {options.scale.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleSelect('scale', opt)}
                    className={`px-3 py-1.5 rounded-md font-body text-[13px] transition-all border ${
                      selections.scale === opt 
                        ? 'bg-[#C9A96E] text-[#0A0A0A] border-[#C9A96E]' 
                        : 'bg-[#141414] text-[#8A8478] border-[#2A2A2A] hover:border-[#C9A96E]/50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Build Button */}
            <div className="pt-4">
              <button 
                onClick={handleBuild}
                disabled={!isReady || isBuilding}
                className={`w-full py-4 rounded-xl font-body font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  isReady && !isBuilding 
                    ? 'bg-[#F5F0EB] text-[#0A0A0A] hover:bg-[#C9A96E]' 
                    : 'bg-[#1E1E1E] text-[#5A5550] border border-[#2A2A2A] cursor-not-allowed'
                }`}
              >
                {isBuilding ? (
                  <><Loader2 size={16} className="animate-spin" /> CONFIGURING INFRASTRUCTURE...</>
                ) : (
                  <><Settings size={16} /> GENERATE RECOMMENDATION</>
                )}
              </button>
            </div>
          </div>

          {/* Result Display */}
          <div className="lg:col-span-3">
            <div className="h-full bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center">
              {!showResult ? (
                <div className="text-center opacity-30">
                  <Settings size={48} className="mx-auto mb-4 text-[#C9A96E]" />
                  <p className="font-mono text-sm uppercase tracking-widest text-[#8A8478]">Awaiting Parameters</p>
                </div>
              ) : (
                <div className="animate-fade-in space-y-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] px-2 py-1 border border-[#C9A96E]/30 rounded text-[#C9A96E] uppercase mb-3 inline-block">
                        Recommended Architecture
                      </span>
                      <h3 className="font-display text-2xl text-[#F5F0EB]">
                        {selections.focus === 'Voice Reception' ? 'AI Voice + CRM Infrastructure' : 'Full-Funnel AI Sales Department'}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E]">
                      <Check size={24} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-body text-xs font-semibold text-[#8A8478] uppercase tracking-wider">Included Agents & Systems</h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#0A0A0A] p-3 rounded-lg border border-[#2A2A2A] flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                        <span className="font-body text-sm text-[#F5F0EB]">ORION Orchestrator</span>
                      </div>
                      <div className="bg-[#0A0A0A] p-3 rounded-lg border border-[#2A2A2A] flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                        <span className="font-body text-sm text-[#F5F0EB]">
                          {selections.focus === 'Voice Reception' ? 'VOX Receptionist' : 'W.A.S.P WhatsApp Agent'}
                        </span>
                      </div>
                      <div className="bg-[#0A0A0A] p-3 rounded-lg border border-[#2A2A2A] flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                        <span className="font-body text-sm text-[#F5F0EB]">CRUX CRM Specialist</span>
                      </div>
                      <div className="bg-[#0A0A0A] p-3 rounded-lg border border-[#2A2A2A] flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                        <span className="font-body text-sm text-[#F5F0EB]">FLUX Automation Engine</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#2A2A2A] flex items-center justify-between">
                    <p className="font-body text-xs text-[#5A5550]">
                      * This is a simulated frontend recommendation.
                    </p>
                    <a href="#contact" className="text-[13px] font-semibold text-[#C9A96E] flex items-center gap-1 hover:text-[#F5F0EB] transition-colors">
                      Request Official Proposal <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
