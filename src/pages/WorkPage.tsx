import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { projects } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function WorkPage() {
  const ref = useScrollAnimation();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="mb-16">
            <p className="label-text text-purple mb-4 animate-item">Selected Work</p>
            <h1 className="heading-display mb-6 animate-item">Projects and Demonstrations</h1>
            <p className="body-text max-w-2xl animate-item">
              Real systems built for real businesses. Each project demonstrates how AI Handle deploys coordinated AI agents and automations.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <div key={project.title} className="card-surface p-8 animate-item" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple/10 text-purple">{project.type}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30">{project.market}</span>
                </div>
                <h3 className="font-body font-semibold text-lg text-white mb-2">{project.title}</h3>
                <p className="text-xs text-white/30 mb-3">{project.clientType}</p>
                <p className="body-text text-sm mb-4">{project.desc}</p>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Challenge</p>
                    <p className="text-xs text-white/50">{project.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Solution</p>
                    <p className="text-xs text-white/50">{project.solution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-purple/10 text-purple/60 border border-purple/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#070707]">
        <div className="content-max text-center">
          <h2 className="heading-section mb-4">Want a Similar System?</h2>
          <p className="body-text mb-8 max-w-lg mx-auto">Every system is custom-built for the specific business.</p>
          <Link to="/contact" className="btn-primary">Start Your Project</Link>
        </div>
      </section>
    </div>
  );
}
