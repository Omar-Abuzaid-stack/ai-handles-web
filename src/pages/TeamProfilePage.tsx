import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router';
import { ArrowLeft, Phone, Mail, MessageCircle, Linkedin, Briefcase, MapPin, Languages } from 'lucide-react';
import { CmsStore } from '@/lib/store';
import type { TeamMember } from '@/lib/types';
// Enhanced team data with skills, industries, and full bios
const enhancedTeamData: Record<string, { skills: string[]; industries: string[]; fullBio: string; responsibilities: string[] }> = {
  'omar-mohamed': {
    skills: ['AI System Architecture', 'Business Strategy', 'Workflow Design', 'Client Relations', 'Growth Infrastructure', 'Automation Engineering'],
    industries: ['Real Estate', 'B2B Companies', 'Clinics', 'Agencies', 'E-commerce', 'Hospitality'],
    fullBio: `Omar Mohamed founded AI Handle to help businesses move beyond disconnected software and deploy coordinated AI systems directly into their real operations. His focus is building practical AI agents, automations, websites, lead-generation systems, and growth infrastructure that help teams operate more efficiently and scale.

With a deep understanding of both technology and business operations, Omar designs AI systems that integrate seamlessly into existing workflows — not replacing humans, but empowering them with coordinated digital teammates that handle repetitive work, qualify leads, manage content, and maintain operational visibility around the clock.`,
    responsibilities: ['Company strategy and vision', 'AI system architecture', 'Client relationships', 'Business development', 'System design and deployment', 'Quality assurance'],
  },
  'mohamed-rayan': {
    skills: ['Client Consultations', 'Sales Process Management', 'Lead Qualification', 'Proposal Development', 'Business Development', 'Relationship Management'],
    industries: ['Real Estate', 'Clinics', 'B2B Companies', 'Marketing Agencies', 'Professional Services'],
    fullBio: `Mohamed Rayan manages sales operations at AI Handle, helping businesses across the UAE and Gulf understand how AI agents, automations, and growth infrastructure can improve their communication, operations, and customer experience.

As the first point of contact for businesses exploring AI deployment, Mohamed guides clients through the discovery process — understanding their operations, identifying opportunities for AI, and ensuring every system is designed to deliver measurable business value. His approach is grounded in practical solutions, not technical jargon.`,
    responsibilities: ['Client consultations', 'Sales process management', 'Lead qualification', 'Proposal preparation', 'Business development', 'Client onboarding support'],
  },
};

export default function TeamProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const isCardRoute = location.pathname.startsWith('/card/');
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
      if (m) {
        setMember(m);
      } else {
        // Hardcoded fallback for the two team members
        const fallbackMembers: Record<string, TeamMember> = {
          'omar-mohamed': {
            id: 'omar-mohamed', name: 'Omar Mohamed', title: 'Founder of AI Handle', department: 'Leadership',
            shortBio: 'Omar Mohamed founded AI Handle to help businesses deploy practical AI agents, automations, websites, communication systems, and growth infrastructure directly into their operations.',
            fullBio: 'Omar Mohamed founded AI Handle to help businesses move beyond disconnected software and deploy coordinated AI systems directly into their real operations.',
            image: '/brand/omar-mohamed.png', imageAlt: 'Omar Mohamed — Founder of AI Handle',
            phone: '+971 50 803 3084', email: 'AIHandle.cloud@gmail.com',
            whatsappUrl: 'https://wa.me/971508033084', linkedinUrl: 'https://www.linkedin.com/in/omar-elgar7y-69a763208', instagramUrl: '',
            country: 'UAE', languages: ['English', 'Arabic'],
            responsibilities: ['Company strategy and vision', 'AI system architecture', 'Client relationships', 'Business development'],
            displayOrder: 1, featured: true, visible: true,
            contactButtons: { phone: true, whatsapp: true, email: true, linkedin: true },
            qrDestination: 'https://www.aihandle.cloud/team/omar-mohamed', qrTitle: "Scan to Speak With Omar", qrSupporting: "Scan the QR code to view Omar Mohamed's full profile and connect directly.",
            createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
          },
          'mohamed-rayan': {
            id: 'mohamed-rayan', name: 'Mohamed Rayan', title: 'Sales Manager at AI Handle', department: 'Sales',
            shortBio: 'Mohamed Rayan manages sales operations at AI Handle, helping businesses understand how AI agents and automations can improve their operations.',
            fullBio: 'Mohamed Rayan manages sales operations at AI Handle, helping businesses across the UAE and Gulf understand how AI agents, automations, and growth infrastructure can improve their communication, operations, and customer experience.',
            image: '/brand/mohamed-rayan.jpg', imageAlt: 'Mohamed Rayan — Sales Manager at AI Handle',
            phone: '+971 54 553 0754', email: 'mrayhan2005m@gmail.com',
            whatsappUrl: 'https://wa.me/971545530754', linkedinUrl: '', instagramUrl: '',
            country: 'UAE', languages: ['English', 'Arabic'],
            responsibilities: ['Client consultations', 'Sales process management', 'Lead qualification', 'Proposal preparation'],
            displayOrder: 2, featured: true, visible: true,
            contactButtons: { phone: true, whatsapp: true, email: true, linkedin: false },
            qrDestination: 'https://www.aihandle.cloud/team/mohamed-rayan', qrTitle: "Scan to Speak With Our Sales Manager", qrSupporting: "Scan the QR code to view Mohamed Rayan's full profile and connect directly.",
            createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
          },
        };
        setMember(fallbackMembers[slug] || null);
      }
      setLoading(false);
    });
  }, [slug]);

  const enhanced = member ? enhancedTeamData[member.id] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-white/10 animate-pulse" />
          <p className="text-xs text-white/20 tracking-wider uppercase">Loading profile</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 px-6">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <span className="text-2xl text-white/20">?</span>
        </div>
        <div className="text-center">
          <p className="text-white/40 text-sm mb-1">Team member not found.</p>
          <p className="text-white/20 text-xs mb-4">This profile may have been removed or the link is incorrect.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/team" className="btn-secondary text-sm">View All Team Members</Link>
          <Link to="/contact" className="btn-primary text-sm">Contact Us</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/team" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Team
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
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
              <p className="label-text text-purple mb-2">{member.department}</p>
              <h1 className="heading-display text-4xl md:text-5xl mb-2">{member.name}</h1>
              <p className="text-lg text-purple/60 mb-4">{member.title}</p>
              <p className="body-text max-w-xl">{member.shortBio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding pt-0">
        <div className="content-max">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="md:col-span-2 space-y-8">
              {/* Full Bio */}
              <div className="animate-item">
                <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">About</h2>
                <div className="body-text space-y-4">
                  {(enhanced?.fullBio || member.fullBio).split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              {(enhanced?.responsibilities || member.responsibilities).length > 0 && (
                <div className="animate-item">
                  <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Main Responsibilities</h2>
                  <div className="grid md:grid-cols-2 gap-2">
                    {(enhanced?.responsibilities || member.responsibilities).map((r, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                        <span className="w-1 h-1 rounded-full bg-purple/40 flex-shrink-0" />
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {enhanced?.skills && enhanced.skills.length > 0 && (
                <div className="animate-item">
                  <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Skills & Areas of Focus</h2>
                  <div className="flex flex-wrap gap-2">
                    {enhanced.skills.map((skill) => (
                      <span key={skill} className="text-xs px-3 py-1.5 rounded-full bg-purple/10 text-purple/70 border border-purple/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Industries Supported */}
              {enhanced?.industries && enhanced.industries.length > 0 && (
                <div className="animate-item">
                  <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Industries Supported</h2>
                  <div className="flex flex-wrap gap-2">
                    {enhanced.industries.map((ind) => (
                      <span key={ind} className="text-xs px-3 py-1.5 rounded-full border border-white/8 text-white/50">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Work */}
              <div className="animate-item">
                <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Selected Work</h2>
                <div className="card-surface p-6">
                  <p className="text-sm text-white/40 italic">
                    Selected work will be added after publication approval.
                  </p>
                </div>
              </div>

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
              <div className="card-surface p-6">
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
              <div className="card-surface p-6">
                <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Details</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-white/30" />
                    <div>
                      <p className="text-white/30 text-xs">Location</p>
                      <p className="text-white/60">{member.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase size={14} className="text-white/30" />
                    <div>
                      <p className="text-white/30 text-xs">Department</p>
                      <p className="text-white/60">{member.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Languages size={14} className="text-white/30" />
                    <div>
                      <p className="text-white/30 text-xs">Languages</p>
                      <p className="text-white/60">{member.languages.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#070707]">
        <div className="content-max text-center">
          <h2 className="heading-section mb-4">Work With {member.name.split(' ')[0]}</h2>
          <p className="body-text mb-8 max-w-lg mx-auto">Book a discovery session to discuss your AI requirements.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={member.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle size={14} /> Speak With {member.name.split(' ')[0]}
            </a>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
            <Link to="/team" className="btn-secondary">Back to Team</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
