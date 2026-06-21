import { brand } from '@/data';

const { founder } = brand;

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="content-max section-padding py-12">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                <img src="/brand/ai-handle-logo.png" alt="AI Handle" className="w-full h-full object-cover" />
              </div>
              <span className="font-body font-semibold text-xs tracking-[0.12em] text-white">AI HANDLE</span>
            </div>
            <p className="text-xs text-white/30 leading-relaxed">
              UAE-based global AI agency deploying AI agents, automations, websites, and growth infrastructure into businesses.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2">
              {['AI Agents', 'Automations', 'Websites', 'Growth Systems', 'Voice AI'].map((s) => (
                <li key={s}><a href="#services" className="text-sm text-white/30 hover:text-white/60 transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              {['Industries', 'Work', 'Team', 'Contact'].map((s) => (
                <li key={s}><a href={`#${s.toLowerCase()}`} className="text-sm text-white/30 hover:text-white/60 transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><a href={`tel:${founder.phoneRaw}`} className="text-sm text-white/30 hover:text-white/60 transition-colors">{brand.founder.phone}</a></li>
              <li><a href={`mailto:${brand.founder.email}`} className="text-sm text-white/30 hover:text-white/60 transition-colors">{brand.founder.email}</a></li>
              <li><a href={brand.founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/60 transition-colors">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} AI Handle. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
