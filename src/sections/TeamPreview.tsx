import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { CmsStore } from '@/lib/store';
import type { TeamMember } from '@/lib/types';

export default function TeamPreview() {
  const ref = useScrollAnimation();
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    CmsStore.getTeamMembers().then((m) => setMembers(m.filter((t) => t.visible).slice(0, 4)));
  }, []);

  return (
    <section id="team" className="section-padding">
      <div ref={ref} className="content-max">
        <div className="text-center mb-12">
          <p className="label-text text-purple mb-4 animate-item">Our Team</p>
          <h2 className="heading-section mb-4 animate-item">The People Behind AI Handle</h2>
          <p className="body-text max-w-lg mx-auto animate-item">
            A small team focused on deploying practical AI systems for businesses across the UAE and Gulf.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {members.map((member, i) => (
            <Link
              key={member.id}
              to={`/team/${member.id}`}
              className="card-surface p-6 group hover:border-purple/20 transition-all duration-300 animate-item block"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                  <img
                    src={member.image}
                    alt={member.imageAlt}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png'; }}
                  />
                </div>
                <div>
                  <h3 className="font-body font-semibold text-white group-hover:text-purple transition-colors">{member.name}</h3>
                  <p className="text-xs text-purple/60">{member.title}</p>
                  <p className="text-xs text-white/30 mt-1 line-clamp-2">{member.shortBio}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {members.length > 0 && (
          <div className="text-center animate-item">
            <Link to="/team" className="inline-flex items-center gap-2 text-sm font-medium text-purple hover:text-purple/80 transition-colors">
              View Full Team <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
