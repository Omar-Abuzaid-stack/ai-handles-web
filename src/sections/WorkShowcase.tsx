import { useState } from 'react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight, X } from 'lucide-react';

const categories = [
  'All Work',
  'AI Agents',
  'Automations',
  'Real Estate Websites',
];

const projects = [
  {
    title: 'Off-Plan Sales Infrastructure',
    clientType: 'Real Estate Developer',
    market: 'UAE',
    type: 'Concept System',
    category: 'AI Agents',
    tags: ['ORION', 'WASP', 'CRUX'],
    desc: 'A complete AI workforce managing lead capture, WhatsApp qualification, and CRM entry for a luxury development launch.',
    mockupType: 'mobile',
    metrics: ['98% Response under 1min', '45% Qualification Rate'],
    challenge: 'High volume of unqualified leads during launch phases resulting in slow response times.',
    solution: 'Deployed WASP to instantly engage leads on WhatsApp, qualify their budget, and push organized data to CRUX.'
  },
  {
    title: 'Premium AI Showcase Website',
    clientType: 'Boutique Agency',
    market: 'UK',
    type: 'Frontend Experience',
    category: 'Real Estate Websites',
    tags: ['VISTA', 'MUSE'],
    desc: 'High-performance property website with integrated AI assistance, automated content preparation, and SEO infrastructure.',
    mockupType: 'desktop',
    metrics: ['Sub-1s Load Time', 'Automated SEO Markup'],
    challenge: 'Website was slow, visually outdated, and disconnected from the agency\'s operations.',
    solution: 'Built a new frontend architecture and connected VISTA to automatically generate and update property descriptions.'
  },
  {
    title: 'Agent Recruitment Automation',
    clientType: 'Brokerage Network',
    market: 'Global',
    type: 'Prototype',
    category: 'Automations',
    tags: ['SPECTRA', 'ECHO', 'FLUX'],
    desc: 'Automated research and outreach system for identifying and contacting top-performing brokers in new markets.',
    mockupType: 'dashboard',
    metrics: ['500+ Brokers Researched/Wk', 'Personalised Outreach'],
    challenge: 'Scaling the brokerage required manual research of hundreds of LinkedIn profiles daily.',
    solution: 'SPECTRA identifies targets, ECHO crafts personalized outreach, and FLUX orchestrates the follow-up sequence.'
  }
];

export default function WorkShowcase() {
  const [activeCategory, setActiveCategory] = useState('All Work');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const sectionRef = useScrollAnimation();
  const gridRef = useStaggerAnimation('.project-card');

  const filteredProjects = activeCategory === 'All Work'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="work" className="bg-[#0A0A0A] section-padding">
      <div ref={sectionRef} className="content-max">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 animate-item uppercase">
              Selected Vantility Work
            </p>
            <h2 className="section-title text-[#F5F0EB] mb-6 animate-item">
              Infrastructure in Action
            </h2>
            <p className="font-body text-base text-[#8A8478] animate-item leading-relaxed">
              We design and implement AI infrastructure that solves specific business problems. From individual agents to coordinated digital workforces.
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 animate-item">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-body text-xs tracking-wide transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-[#C9A96E] border-[#C9A96E] text-[#0A0A0A]'
                    : 'bg-transparent border-[#2A2A2A] text-[#8A8478] hover:border-[#C9A96E]/50 hover:text-[#F5F0EB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <div key={i} className="project-card group cursor-pointer" onClick={() => setSelectedProject(project)}>
              <div className="relative aspect-[16/11] bg-[#141414] rounded-xl overflow-hidden border border-[#2A2A2A] mb-6 transition-all duration-500 group-hover:border-[#C9A96E]/30 flex items-center justify-center p-6">
                
                {/* Visual Mockups based on type */}
                {project.mockupType === 'mobile' && (
                  <div className="w-[120px] h-full bg-[#0A0A0A] border-[4px] border-[#2A2A2A] rounded-2xl relative shadow-2xl group-hover:-translate-y-2 transition-transform duration-500 flex flex-col">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-[#2A2A2A] rounded-full" />
                    <div className="mt-8 flex-1 p-2 space-y-2">
                      <div className="w-3/4 h-6 bg-[#C9A96E]/20 rounded-md" />
                      <div className="w-full h-8 bg-[#1E1E1E] rounded-md self-end" />
                      <div className="w-5/6 h-6 bg-[#C9A96E]/20 rounded-md" />
                    </div>
                  </div>
                )}
                {project.mockupType === 'desktop' && (
                  <div className="w-full max-w-[240px] aspect-[16/10] bg-[#0A0A0A] border-[4px] border-[#2A2A2A] rounded-lg relative shadow-2xl group-hover:scale-105 transition-transform duration-500 flex flex-col">
                    <div className="h-3 border-b border-[#2A2A2A] flex items-center gap-1 px-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2A2A2A]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2A2A2A]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2A2A2A]" />
                    </div>
                    <div className="flex-1 p-2 flex flex-col gap-2">
                      <div className="w-full h-1/2 bg-[#1E1E1E] rounded" />
                      <div className="flex gap-2 flex-1">
                        <div className="w-1/2 h-full bg-[#1E1E1E] rounded" />
                        <div className="w-1/2 h-full bg-[#1E1E1E] rounded" />
                      </div>
                    </div>
                  </div>
                )}
                {project.mockupType === 'dashboard' && (
                  <div className="w-full max-w-[240px] aspect-[16/10] bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg relative shadow-2xl group-hover:scale-105 transition-transform duration-500 flex p-2 gap-2">
                    <div className="w-1/4 h-full border-r border-[#2A2A2A] space-y-2 pr-2">
                      <div className="w-full h-2 bg-[#1E1E1E] rounded" />
                      <div className="w-full h-2 bg-[#1E1E1E] rounded" />
                      <div className="w-full h-2 bg-[#C9A96E]/40 rounded" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="w-full h-1/3 bg-[#1E1E1E] rounded flex items-end p-2 gap-1">
                        <div className="w-4 h-1/2 bg-[#C9A96E]/40" />
                        <div className="w-4 h-3/4 bg-[#C9A96E]/60" />
                        <div className="w-4 h-full bg-[#C9A96E]" />
                      </div>
                      <div className="w-full flex-1 border border-[#2A2A2A] rounded" />
                    </div>
                  </div>
                )}

                {/* Project Type Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#0A0A0A]/80 backdrop-blur-md border border-[#2A2A2A] rounded-full">
                  <span className="font-mono text-[9px] text-[#C9A96E] tracking-widest uppercase">{project.type}</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-mono text-[10px] text-[#5A5550] tracking-[0.1em] uppercase">
                  {project.clientType} — {project.market}
                </p>
                <h3 className="font-body font-semibold text-lg text-[#F5F0EB] group-hover:text-[#C9A96E] transition-colors">
                  {project.title}
                </h3>
                <p className="font-body text-sm text-[#8A8478] leading-relaxed line-clamp-2">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-[#C9A96E]/10 border border-[#C9A96E]/20 rounded text-[9px] font-mono text-[#C9A96E]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-12">
          <div className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8 lg:p-12 shadow-2xl animate-fade-up">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#1E1E1E] text-[#8A8478] hover:text-[#F5F0EB] hover:bg-[#2A2A2A] transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <span className="font-mono text-[10px] text-[#C9A96E] tracking-[0.15em] uppercase border border-[#C9A96E]/30 px-3 py-1 rounded-full mb-4 inline-block">
                {selectedProject.type}
              </span>
              <h2 className="font-display text-3xl lg:text-4xl text-[#F5F0EB] mb-4">{selectedProject.title}</h2>
              <p className="font-body text-lg text-[#8A8478] max-w-2xl">{selectedProject.desc}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
              <div className="space-y-8">
                <div>
                  <h4 className="font-body font-semibold text-sm text-[#F5F0EB] mb-3 uppercase tracking-wider">The Challenge</h4>
                  <p className="font-body text-sm text-[#8A8478] leading-relaxed p-4 bg-[#0A0A0A] rounded-lg border border-[#2A2A2A]">{selectedProject.challenge}</p>
                </div>
                <div>
                  <h4 className="font-body font-semibold text-sm text-[#F5F0EB] mb-3 uppercase tracking-wider">Vantility Solution</h4>
                  <p className="font-body text-sm text-[#8A8478] leading-relaxed p-4 bg-[#C9A96E]/5 rounded-lg border border-[#C9A96E]/20 text-[#F5F0EB]">{selectedProject.solution}</p>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h4 className="font-body font-semibold text-sm text-[#F5F0EB] mb-3 uppercase tracking-wider">Simulated Impact</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProject.metrics.map(metric => (
                      <div key={metric} className="p-4 bg-[#0A0A0A] rounded-lg border border-[#2A2A2A]">
                        <span className="font-body font-medium text-[#C9A96E]">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-body font-semibold text-sm text-[#F5F0EB] mb-3 uppercase tracking-wider">Active Infrastructure</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-[#1E1E1E] rounded-md font-mono text-[11px] text-[#F5F0EB] border border-[#2A2A2A]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-[#2A2A2A] flex justify-between items-center">
              <p className="font-mono text-[10px] text-[#5A5550]">FRONTEND DEMONSTRATION</p>
              <a href="#contact" onClick={() => setSelectedProject(null)} className="font-body text-sm text-[#C9A96E] hover:text-[#F5F0EB] transition-colors flex items-center gap-2">
                Request Similar Architecture <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
