import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const filters = ['All', 'AI Agents', 'Automations', 'Websites', 'Real Estate', 'Clinics', 'CRM', 'Voice', 'Content', 'Growth Systems'];

const projects = [
  {
    title: 'Off-Plan Sales Infrastructure',
    client: 'Real Estate Developer',
    market: 'UAE',
    type: 'Concept System',
    category: 'AI Agents',
    tags: ['ORION', 'WASP', 'CRUX'],
    challenge: 'High volume of unqualified leads during launch phases resulting in slow response times and missed opportunities.',
    solution: 'Deployed WASP to instantly engage leads on WhatsApp, qualify their budget and preferences, and push organised data to CRUX for pipeline management.',
    agents: 'Reception, Sales, CRM',
  },
  {
    title: 'Premium AI Showcase Website',
    client: 'Boutique Agency',
    market: 'UK',
    type: 'Frontend Experience',
    category: 'Websites',
    tags: ['VISTA', 'MUSE'],
    challenge: 'Website was slow, visually outdated, and disconnected from the agency\'s operations and content workflow.',
    solution: 'Built a new frontend architecture with integrated AI assistance, connected VISTA for automated content preparation, and MUSE for ongoing content production.',
    agents: 'Visibility, Content',
  },
  {
    title: 'Agent Recruitment Automation',
    client: 'Brokerage Network',
    market: 'Global',
    type: 'Prototype',
    category: 'Automations',
    tags: ['SPECTRA', 'ECHO', 'FLUX'],
    challenge: 'Scaling the brokerage required manual research of hundreds of profiles daily — an unsustainable bottleneck.',
    solution: 'SPECTRA identifies high-quality targets, ECHO crafts personalised outreach, and FLUX orchestrates the entire follow-up sequence automatically.',
    agents: 'Research, Outreach, Automation',
  },
  {
    title: 'Clinic Enquiry Management',
    client: 'Healthcare Practice',
    market: 'UAE',
    type: 'Demonstration',
    category: 'Clinics',
    tags: ['VOX', 'FLUX', 'CRUX'],
    challenge: 'Front desk overwhelmed with calls, missed enquiries during peak hours, and no systematic follow-up process.',
    solution: 'Deployed VOX for after-hours AI reception, FLUX for intelligent appointment routing, and CRUX for comprehensive enquiry tracking and follow-up.',
    agents: 'Voice, Automation, CRM',
  },
];

export default function WorkShowcase() {
  const ref = useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter || p.tags.some(t => activeFilter.includes(t)));

  return (
    <section id="work" className="section-padding bg-[#070707]">
      <div ref={ref} className="content-max">
        <div className="text-center mb-12">
          <p className="label-text text-purple mb-4 animate-item">Portfolio</p>
          <h2 className="heading-section animate-item">Selected AI Handle Work</h2>
          <p className="body-text mt-4 max-w-xl mx-auto animate-item">
            Every project is tailored to the client's specific business, market, and operational needs.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 animate-item">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all duration-300 font-body ${
                activeFilter === f
                  ? 'bg-purple text-white border border-purple'
                  : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/60 hover:border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <div key={project.title} className="card-surface p-8 animate-item" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple/10 text-purple border border-purple/20">
                  {project.type}
                </span>
                <span className="text-[10px] text-white/30">{project.market}</span>
              </div>
              <h3 className="font-body font-semibold text-lg text-white mb-1">{project.title}</h3>
              <p className="text-xs text-white/30 mb-4">{project.client}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5">{t}</span>
                ))}
              </div>
              <p className="text-sm text-white/50 mb-2"><strong className="text-white/60">Challenge:</strong> {project.challenge}</p>
              <p className="text-sm text-white/50 mb-3"><strong className="text-white/60">Solution:</strong> {project.solution}</p>
              <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                <span className="text-[10px] text-white/25">Agents:</span>
                <span className="text-[10px] text-purple/60">{project.agents}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-white/30">No projects match this filter yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
