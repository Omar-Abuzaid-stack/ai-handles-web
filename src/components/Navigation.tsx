import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'AI Workforce', href: '#agents' },
  { label: 'Industries', href: '#industries' },
  { label: 'Work', href: '#work' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

const themeOptions = [
  { value: 'dark' as const, icon: Moon, label: 'Dark' },
  { value: 'light' as const, icon: Sun, label: 'Light' },
  { value: 'system' as const, icon: Monitor, label: 'System' },
];

export default function Navigation() {
  const { theme, setTheme } = useTheme();
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

  const cycleTheme = () => {
    const order: typeof theme[] = ['dark', 'light', 'system'];
    const next = order[(order.indexOf(theme) + 1) % 3];
    setTheme(next);
  };

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-full max-w-6xl px-4 ${
          scrolled ? 'opacity-100' : 'opacity-100'
        }`}
      >
        {/* Desktop: Liquid Glass Pill */}
        <div className="hidden md:flex liquid-glass rounded-full px-6 py-3 items-center justify-between">
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

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={cycleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-300"
              aria-label={`Theme: ${theme}. Click to cycle.`}
              title={`Current: ${theme}`}
            >
              {theme === 'dark' && <Moon size={14} />}
              {theme === 'light' && <Sun size={14} />}
              {theme === 'system' && <Monitor size={14} />}
            </button>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleClick('#contact'); }}
              className="btn-primary text-[13px] py-2 px-5"
            >
              Speak With Omar
            </a>
          </div>
        </div>

        {/* Mobile: Simple bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-black/60 backdrop-blur-xl rounded-full border border-white/10">
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleClick('#hero'); }} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10">
              <img src="/brand/ai-handle-logo.png" alt="AI Handle" className="w-full h-full object-cover" />
            </div>
            <span className="font-body font-semibold text-xs tracking-wider text-white">AI HANDLE</span>
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={cycleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white/70 transition-all"
              aria-label={`Theme: ${theme}`}
            >
              {theme === 'dark' && <Moon size={16} />}
              {theme === 'light' && <Sun size={16} />}
              {theme === 'system' && <Monitor size={16} />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-1" aria-label="Toggle menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
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

          {/* Theme Options in Mobile Drawer */}
          <div className="flex items-center gap-4 mt-4">
            {themeOptions.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                onClick={() => { setTheme(value); }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  theme === value
                    ? 'bg-purple/20 text-purple border border-purple/30'
                    : 'text-white/30 hover:text-white/60 border border-white/10'
                }`}
                aria-label={`Switch to ${label} mode`}
                title={label}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>

          <a href="#contact" onClick={(e) => { e.preventDefault(); handleClick('#contact'); }} className="btn-primary mt-4">
            Speak With Omar
          </a>
        </div>
      )}
    </>
  );
}
