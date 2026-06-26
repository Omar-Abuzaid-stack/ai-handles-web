import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Calendar } from 'lucide-react';
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
        <div className="text-center mb-10">
          <p className="label-text text-[#7E22CE] mb-4 animate-item">Meet the Team</p>
          <h2 className="heading-section mb-4 animate-item">The Humans Behind the System</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {members.map((member, i) => (
            <Link
              key={member.id}
              to={`/team/${member.id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group relative card-surface p-0 overflow-hidden hover:border-[#7E22CE]/30 transition-all duration-500 animate-item block"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-[#050505]">
                <img
                  src={member.image}
                  alt={member.imageAlt}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-body text-xl font-semibold text-white mb-1 group-hover:text-[#7E22CE] transition-colors">{member.name}</h3>
                  <p className="text-sm text-[#7E22CE] font-medium mb-2">{member.title}</p>
                  <p className="text-xs text-white/50 line-clamp-2">{member.shortBio}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center animate-item flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/team" onClick={() => window.scrollTo(0, 0)} className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors">
            View Full Team →
          </Link>
          <Link
            to="/contact"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7E22CE]/10 border border-[#7E22CE]/30 text-[#7E22CE] hover:bg-[#7E22CE]/20 hover:border-[#7E22CE]/50 transition-all duration-300 text-sm font-semibold"
          >
            <Calendar size={15} />
            Book a Meeting With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
