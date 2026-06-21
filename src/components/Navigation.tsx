import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'AI Workforce', href: '#agents' },
  { label: 'Industries', href: '#industries' },
  { label: 'Work', href: '#work' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
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
      { rootMargin: '-40% 0px -60% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-full max-w-6xl px-4 ${
          scrolled ? 'opacity-100' : 'opacity-100'
        }`}
      >
        {/* Desktop: Liquid Glass Pill */}
        <div className="hidden md:block liquid-glass rounded-full px-6 py-3 flex items-center justify-between">
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleClick('#hero'); }} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
              <img src="/brand/ai-handle-logo.png" alt="AI Handle" className="w-full h-full object-cover" />
            </div>
            <span className="font-body font-semibold text-xs tracking-[0.12em] text-white">AI HANDLE</span>
          </a>

          <div className="flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                className={`font-body text-[13px] transition-colors duration-300 ${
                  activeSection === link.href
                    ? 'text-white font-medium'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleClick('#contact'); }}
            className="btn-primary text-[13px] py-2 px-5"
          >
            Speak With Omar
          </a>
        </div>

        {/* Mobile: Simple bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-black/60 backdrop-blur-xl rounded-full border border-white/10">
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleClick('#hero'); }} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10">
              <img src="/brand/ai-handle-logo.png" alt="AI Handle" className="w-full h-full object-cover" />
            </div>
            <span className="font-body font-semibold text-xs tracking-wider text-white">AI HANDLE</span>
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-1" aria-label="Toggle menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
              className="font-body text-2xl text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleClick('#contact'); }} className="btn-primary mt-4">
            Speak With Omar
          </a>
        </div>
      )}
    </>
  );
}
