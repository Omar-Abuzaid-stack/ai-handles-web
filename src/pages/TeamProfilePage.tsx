import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router';
import { ArrowLeft, Phone, Mail, MessageCircle, Linkedin } from 'lucide-react';
import { CmsStore } from '@/lib/store';
import type { TeamMember } from '@/lib/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function TeamProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const isCardRoute = location.pathname.startsWith('/card/');
  const ref = useScrollAnimation();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  // Add noindex for business card routes
  useEffect(() => {
    if (isCardRoute) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);
      return () => meta.remove();
    }
  }, [isCardRoute]);

  useEffect(() => {
    if (!slug) return;
    CmsStore.getTeamMember(slug).then((m) => {
      setMember(m);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border border-white/10 animate-pulse" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <p className="text-white/40 text-sm">Team member not found.</p>
        <Link to="/team" className="btn-secondary text-sm">Back to Team</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/team" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Team
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
              <img
                src={member.image}
                alt={member.imageAlt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png';
                }}
              />
            </div>
            <div>
              <p className="label-text text-purple mb-2 animate-item">{member.department}</p>
              <h1 className="heading-display text-4xl md:text-5xl mb-2 animate-item">{member.name}</h1>
              <p className="text-lg text-purple/60 mb-4 animate-item">{member.title}</p>
              <p className="body-text max-w-xl animate-item">{member.shortBio}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="md:col-span-2 space-y-8">
              {/* Full Bio */}
              <div className="animate-item">
                <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">About</h2>
                <p className="body-text">{member.fullBio}</p>
              </div>

              {/* Responsibilities */}
              {member.responsibilities.length > 0 && (
                <div className="animate-item">
                  <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Responsibilities</h2>
                  <div className="space-y-2">
                    {member.responsibilities.map((r, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                        <span className="w-1 h-1 rounded-full bg-purple/40" />
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {member.languages.length > 0 && (
                <div className="animate-item">
                  <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Languages</h2>
                  <div className="flex flex-wrap gap-2">
                    {member.languages.map((lang) => (
                      <span key={lang} className="text-xs px-3 py-1.5 rounded-full border border-white/8 text-white/40">{lang}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact */}
              <div className="card-surface p-6 animate-item">
                <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Contact</h2>
                <div className="space-y-3">
                  {member.contactButtons.phone && (
                    <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                      <Phone size={14} className="text-purple/60" /> {member.phone}
                    </a>
                  )}
                  {member.contactButtons.email && (
                    <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                      <Mail size={14} className="text-purple/60" /> {member.email}
                    </a>
                  )}
                  {member.contactButtons.whatsapp && member.whatsappUrl && (
                    <a href={member.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/60 hover:text-green-400 transition-colors">
                      <MessageCircle size={14} className="text-green-400" /> WhatsApp
                    </a>
                  )}
                  {member.contactButtons.linkedin && member.linkedinUrl && (
                    <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/60 hover:text-blue-400 transition-colors">
                      <Linkedin size={14} className="text-blue-400" /> LinkedIn
                    </a>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="card-surface p-6 animate-item">
                <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Details</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/30">Location</span>
                    <span className="text-white/60">{member.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/30">Department</span>
                    <span className="text-white/60">{member.department}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#070707]">
        <div className="content-max text-center">
          <h2 className="heading-section mb-4">Work With {member.name.split(' ')[0]}</h2>
          <p className="body-text mb-8 max-w-lg mx-auto">Book a discovery session to discuss your AI requirements.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">Contact Us</Link>
            <Link to="/team" className="btn-secondary">Back to Team</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
