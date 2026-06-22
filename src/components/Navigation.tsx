import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const routeLinks = [
  { label: 'Services', to: '/services' },
  { label: 'AI Workforce', to: '/ai-workforce' },
  { label: 'Integrations', to: '/integrations' },
  { label: 'Work', to: '/work' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
];

const themeOptions = [
  { value: 'dark' as const, icon: Moon, label: 'Dark' },
  { value: 'light' as const, icon: Sun, label: 'Light' },
  { value: 'system' as const, icon: Monitor, label: 'System' },
];

export default function Navigation() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const cycleTheme = () => {
    const order: typeof theme[] = ['dark', 'light', 'system'];
    const next = order[(order.indexOf(theme) + 1) % 3];
    setTheme(next);
  };

  return (
    <>
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-full max-w-6xl px-4`}>
        {/* Desktop: Liquid Glass Pill */}
        <div className="hidden md:flex liquid-glass rounded-full px-6 py-3 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
              <img src="/brand/ai-handle-logo.png" alt="AI Handle" className="w-full h-full object-cover" />
            </div>
            <span className="font-body font-semibold text-xs tracking-[0.12em] text-white">AI HANDLE</span>
          </Link>

          <div className="flex items-center gap-7">
            {routeLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body text-[13px] transition-colors duration-300 ${
                  location.pathname === link.to
                    ? 'text-white font-medium'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
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

            <Link to="/contact" className="btn-primary text-[13px] py-2 px-5">
              Speak With Us
            </Link>
          </div>
        </div>

        {/* Mobile: Simple bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-black/60 backdrop-blur-xl rounded-full border border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10">
              <img src="/brand/ai-handle-logo.png" alt="AI Handle" className="w-full h-full object-cover" />
            </div>
            <span className="font-body font-semibold text-xs tracking-wider text-white">AI HANDLE</span>
          </Link>
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
          {routeLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`font-body text-2xl transition-colors ${
                location.pathname === link.to ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Theme Options in Mobile Drawer */}
          <div className="flex items-center gap-4 mt-4">
            {themeOptions.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
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

          <Link to="/contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-4">
            Speak With Us
          </Link>
        </div>
      )}
    </>
  );
}
