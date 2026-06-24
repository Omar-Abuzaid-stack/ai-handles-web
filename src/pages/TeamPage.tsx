import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Phone, Mail, ExternalLink } from 'lucide-react';
import { CmsStore } from '@/lib/store';
import type { TeamMember } from '@/lib/types';
export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    CmsStore.getTeamMembers().then((m) => setMembers(m.filter((t) => t.visible)));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="mb-16">
            <p className="label-text text-purple mb-4">Our Team</p>
            <h1 className="heading-display mb-6">The People Behind AI Handle</h1>
            <p className="body-text max-w-2xl">
              AI Handle is led by a small team focused on deploying practical AI systems for businesses across the UAE and Gulf.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div className="content-max">
          <div className="grid md:grid-cols-2 gap-6">
            {members.map((member, i) => (
              <Link
                key={member.id}
                to={`/team/${member.id}`}
                className="card-surface p-6 group hover:border-purple/20 transition-all duration-300 block"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                    <img
                      src={member.image}
                      alt={member.imageAlt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-body font-semibold text-white group-hover:text-purple transition-colors">{member.name}</h3>
                      <ExternalLink size={12} className="text-white/20 group-hover:text-purple/60 transition-colors" />
                    </div>
                    <p className="text-xs text-purple/60 mb-2">{member.title}</p>
                    <p className="text-xs text-white/30 mb-3 line-clamp-2">{member.shortBio}</p>
                    <div className="flex items-center gap-3">
                      {member.contactButtons.phone && (
                        <span className="flex items-center gap-1 text-[10px] text-white/20">
                          <Phone size={10} /> {member.phone}
                        </span>
                      )}
                      {member.contactButtons.email && (
                        <span className="flex items-center gap-1 text-[10px] text-white/20">
                          <Mail size={10} /> Email
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {members.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/30 text-sm">Team profiles are being prepared.</p>
            </div>
          )}
        </div>
      </section>

      {/* Extended Delivery Network Marquee */}
      <section className="py-16 overflow-hidden border-t border-white/5 bg-[#050505]">
        <div className="content-max mb-8 text-center px-4">
          <p className="label-text text-[#7E22CE] mb-2 animate-item">Our Extended Delivery Network</p>
          <h2 className="heading-sub text-white/80 animate-item">Specialists Supporting Our Projects</h2>
        </div>
        
        <div className="relative w-full flex overflow-hidden group">
          {/* Fading Edges */}
          <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
          <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>
          
          {/* Scrolling Content */}
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, arrayIndex) => (
              <div key={arrayIndex} className="flex gap-4 px-2 w-max">
                {[
                  { role: "Frontend Developer", skill: "React & Next.js" },
                  { role: "Backend Engineer", skill: "Node & Python" },
                  { role: "AI Researcher", skill: "LLM Fine-tuning" },
                  { role: "Automation Expert", skill: "Make & Zapier" },
                  { role: "UI/UX Designer", skill: "Figma" },
                  { role: "CRM Specialist", skill: "HubSpot & Salesforce" },
                  { role: "Voice AI Engineer", skill: "VAPI & Retell" },
                  { role: "Prompt Engineer", skill: "System Prompts" }
                ].map((specialist, i) => (
                  <div key={`${arrayIndex}-${i}`} className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-full px-6 py-3 min-w-max">
                    <div className="w-2 h-2 rounded-full bg-[#7E22CE]"></div>
                    <div>
                      <p className="text-sm font-semibold text-white">{specialist.role}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">{specialist.skill}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#070707]">
        <div className="content-max text-center">
          <h2 className="heading-section mb-4">Want to Work With Us?</h2>
          <p className="body-text mb-8 max-w-lg mx-auto">Book a discovery session to discuss your AI requirements.</p>
          <Link to="/contact" className="btn-primary">Contact the Team</Link>
        </div>
      </section>
    </div>
  );
}
