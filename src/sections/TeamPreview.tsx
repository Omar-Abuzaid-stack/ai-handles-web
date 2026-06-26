import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { CmsStore } from '@/lib/store';
import type { TeamMember } from '@/lib/types';

export default function TeamPreview() {
  const ref = useScrollAnimation();
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    CmsStore.getTeamMembers().then((m) => setMembers(m.filter((t) => t.visible).slice(0, 2)));
  }, []);

  return (
    <section id="team" className="section-padding bg-[#070707] relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#7E22CE]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div ref={ref} className="content-max relative z-10">
        <div className="text-center mb-16">
          <p className="label-text text-[#7E22CE] mb-4 animate-item">Meet the Team</p>
          <h2 className="heading-section mb-4 animate-item">Human Strategy. Digital Execution.</h2>
          <p className="body-text max-w-lg mx-auto animate-item text-white/60">
            A small human team directing a large digital workforce to deploy practical AI systems.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Human Team Members */}
          {members.map((member, i) => (
            <Link
              key={member.id}
              to={`/team/${member.id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group relative card-surface p-0 overflow-hidden hover:border-[#7E22CE]/30 transition-all duration-500 animate-item block"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="aspect-square relative overflow-hidden bg-[#050505]">
                <img
                  src={member.image}
                  alt={member.imageAlt}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-body text-xl font-semibold text-white mb-1 group-hover:text-[#7E22CE] transition-colors">{member.name}</h3>
                  <p className="text-sm text-[#7E22CE] font-medium mb-3">{member.title}</p>
                  <p className="text-xs text-white/50 line-clamp-2">{member.shortBio}</p>
                </div>
              </div>
            </Link>
          ))}

          {/* AI Workforce Card */}
          <Link
            to="/ai-workforce"
            onClick={() => window.scrollTo(0, 0)}
            className="group relative card-surface p-0 overflow-hidden hover:border-[#7E22CE]/30 transition-all duration-500 animate-item block"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="aspect-square relative overflow-hidden bg-[#050505]">
              <div className="absolute inset-0 bg-[url('/brand/ai-handle-logo.png')] bg-center bg-no-repeat bg-contain opacity-10 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-[#7E22CE]/10 to-transparent"></div>
              
              <div className="absolute top-6 right-6 w-10 h-10 bg-[#7E22CE]/20 rounded-full flex items-center justify-center border border-[#7E22CE]/30 group-hover:bg-[#7E22CE] transition-colors duration-500">
                <Sparkles size={18} className="text-[#7E22CE] group-hover:text-white transition-colors" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-body text-xl font-semibold text-white mb-1 group-hover:text-[#7E22CE] transition-colors">The Digital Workforce</h3>
                <p className="text-sm text-[#7E22CE] font-medium mb-3">7 Specialized AI Agents</p>
                <p className="text-xs text-white/50">Handling research, sales follow-ups, content, operations, reporting, and safety 24/7.</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center animate-item flex justify-center gap-6">
          <Link to="/team" onClick={() => window.scrollTo(0, 0)} className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors">
            View Human Team <ArrowRight size={14} />
          </Link>
          <Link to="/ai-workforce" onClick={() => window.scrollTo(0, 0)} className="inline-flex items-center gap-2 text-sm font-medium text-[#7E22CE] hover:text-[#7E22CE]/80 transition-colors">
            Meet the Agents <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
