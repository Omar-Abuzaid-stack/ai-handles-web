import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function WorkShowcase() {
  const ref = useScrollAnimation();

  return (
    <section id="work" className="section-padding bg-[#070707]">
      <div ref={ref} className="content-max">
        <div className="text-center mb-16">
          <p className="label-text text-purple mb-4 animate-item">Portfolio</p>
          <h2 className="heading-section animate-item">Selected AI Handle Work</h2>
          <p className="body-text mt-4 max-w-xl mx-auto animate-item">
            Every project is tailored to the client's specific business, market, and operational needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Off-Plan Sales Infrastructure',
              client: 'Real Estate Developer',
              market: 'UAE',
              type: 'Concept System',
              tags: ['ORION', 'WASP', 'CRUX'],
              challenge: 'High volume of unqualified leads during launch phases.',
              solution: 'Deployed WASP to engage leads on WhatsApp, qualify budgets, and push data to CRUX.',
            },
            {
              title: 'Premium AI Showcase Website',
              client: 'Boutique Agency',
              market: 'UK',
              type: 'Frontend Experience',
              tags: ['VISTA', 'MUSE'],
              challenge: 'Website was slow, visually outdated, disconnected from operations.',
              solution: 'Built new frontend architecture and connected VISTA for automated content updates.',
            },
            {
              title: 'Agent Recruitment Automation',
              client: 'Brokerage Network',
              market: 'Global',
              type: 'Prototype',
              tags: ['SPECTRA', 'ECHO', 'FLUX'],
              challenge: 'Scaling required manual research of hundreds of profiles daily.',
              solution: 'SPECTRA identifies targets, ECHO crafts outreach, FLUX orchestrates follow-up.',
            },
            {
              title: 'Clinic Enquiry Management',
              client: 'Healthcare Practice',
              market: 'UAE',
              type: 'Demonstration',
              tags: ['VOX', 'FLUX', 'CRUX'],
              challenge: 'Front desk overwhelmed, missed enquiries, no systematic follow-up.',
              solution: 'Deployed VOX for after-hours reception, FLUX for routing, CRUX for tracking.',
            },
          ].map((project, i) => (
            <div key={i} className="card-surface p-8 animate-item" style={{ animationDelay: `${i * 0.1}s` }}>
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
              <p className="text-sm text-white/50"><strong className="text-white/60">Solution:</strong> {project.solution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
