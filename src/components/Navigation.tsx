import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MessageCircle } from 'lucide-react';
import { brand } from '@/data';
import QRCodeDisplay from '@/components/QRCode';
import TikTokIcon from '@/components/TikTokIcon';
import LinkedInIcon from '@/components/LinkedInIcon';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'AI Workforce', href: '#agents' },
  { label: 'Industries', href: '#industries' },
  { label: 'Work', href: '#work' },
  { label: 'Team', href: '#founder' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#2A2A2A]/50'
            : 'bg-transparent'
        }`}
      >
        <div className="content-max flex items-center justify-between h-16 px-6 lg:px-10">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleClick('#hero');
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#2A2A2A] group-hover:border-[#C9A96E]/50 transition-all duration-500 shadow-[0_0_20px_rgba(201,169,110,0.1)]">
              <img
                src="/brand/ai-handle-logo.png"
                alt="AI Handle"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-body font-semibold text-sm tracking-[0.12em] text-[#F5F0EB]">
              AI HANDLE
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className={`font-body font-medium text-[13px] tracking-[0.04em] transition-colors duration-300 pb-1 border-b-2 ${
                  activeSection === link.href
                    ? 'text-[#F5F0EB] border-[#C9A96E]'
                    : 'text-[#8A8478] border-transparent hover:text-[#F5F0EB]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="mailto:AIHandle.cloud@gmail.com"
              className="flex items-center gap-1.5 text-[#8A8478] hover:text-[#C9A96E] transition-colors font-body text-[13px]"
              aria-label="Email AI Handle"
              title="AIHandle.cloud@gmail.com"
            >
              <Mail size={15} />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleClick('#contact');
              }}
              className="btn-primary text-[13px] py-2.5 px-6"
            >
              Speak With Omar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#F5F0EB] p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {/* Mobile Logo */}
          <div className="mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-[#2A2A2A] shadow-[0_0_30px_rgba(201,169,110,0.15)]">
              <img
                src="/brand/ai-handle-logo.png"
                alt="AI Handle"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {[
            { label: 'Home', href: '#hero' },
            { label: 'Services', href: '#services' },
            { label: 'AI Workforce', href: '#agents' },
            { label: 'Industries', href: '#industries' },
            { label: 'Work', href: '#work' },
            { label: 'Founder', href: '#founder' },
            { label: 'Contact', href: '#contact' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleClick(link.href);
              }}
              className="font-display text-2xl text-[#F5F0EB] hover:text-[#C9A96E] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleClick('#contact');
            }}
            className="btn-primary mt-4"
          >
            Speak With Omar
          </a>

          {/* Mobile Contact Bar */}
          <div className="flex flex-col items-center gap-3 mt-6 pt-6 border-t border-[#2A2A2A]/50 w-full max-w-[300px]">
            <a
              href={`tel:${brand.founder.phoneRaw}`}
              className="flex items-center gap-2 text-[#8A8478] hover:text-[#C9A96E] transition-colors"
            >
              <Phone size={14} />
              <span className="font-body text-xs">{brand.founder.phone}</span>
            </a>
            <a
              href={`mailto:${brand.founder.email}`}
              className="flex items-center gap-2 text-[#8A8478] hover:text-[#C9A96E] transition-colors"
            >
              <Mail size={14} />
              <span className="font-body text-xs">{brand.founder.email}</span>
            </a>
            <a
              href={brand.founder.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#8A8478] hover:text-[#4ADE80] transition-colors"
            >
              <MessageCircle size={14} />
              <span className="font-body text-xs">WhatsApp</span>
            </a>
            <QRCodeDisplay size={120} showLabel={false} />
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a href={brand.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[#8A8478] hover:text-[#C9A96E] transition-colors" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href={brand.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-[#8A8478] hover:text-[#C9A96E] transition-colors" aria-label="TikTok">
                <TikTokIcon size={18} />
              </a>
              <a href={brand.founder.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[#8A8478] hover:text-[#C9A96E] transition-colors" aria-label="LinkedIn">
                <LinkedInIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
