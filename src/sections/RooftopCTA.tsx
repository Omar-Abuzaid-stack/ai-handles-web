import { Phone, Mail, MessageCircle, Instagram, Linkedin } from 'lucide-react';
import { brand } from '@/data';
import { TikTokIcon } from '@/components/SocialIcons';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const { founder } = brand;

export default function RooftopCTA() {
  const ref = useScrollAnimation();

  return (
    <section id="contact-cta" className="section-padding bg-[#070707]">
      <div ref={ref} className="content-max">
        <div className="text-center mb-12 animate-item">
          <p className="label-text text-purple mb-4">Get Started</p>
          <h2 className="heading-section mb-4">Build the Team That Never Sleeps.</h2>
          <p className="body-text max-w-xl mx-auto mb-8">
            Start with one specialised agent, automate one workflow, or build a complete digital workforce around your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="card-surface p-8 animate-item">
            <h3 className="font-body font-semibold text-lg text-white mb-6">Send an Enquiry</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.open(`mailto:${founder.email}`, '_blank'); }}>
              <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-purple/40 focus:outline-none transition-colors" />
              <input type="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-purple/40 focus:outline-none transition-colors" />
              <textarea rows={3} placeholder="Tell us about your business..." className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-purple/40 focus:outline-none transition-colors resize-none" />
              <button type="submit" className="btn-primary w-full justify-center">Send Message</button>
            </form>
          </div>

          {/* Contact Details - No QR codes */}
          <div className="space-y-6 animate-item">
            <div className="card-surface p-6">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Speak Directly</h3>
              <div className="space-y-3">
                <p className="font-body font-semibold text-white">{founder.name}</p>
                <p className="text-xs text-purple/60 mb-2">{founder.title}</p>
                <div className="space-y-2">
                  <a href={`tel:${founder.phoneRaw}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                    <Phone size={12} className="text-purple/60" /> {founder.phone}
                  </a>
                  <a href={`mailto:${founder.email}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                    <Mail size={12} className="text-purple/60" /> {founder.email}
                  </a>
                  <a href={founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/50 hover:text-green-400 transition-colors">
                    <MessageCircle size={12} className="text-green-400" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="card-surface p-6">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Connect</h3>
              <div className="flex items-center gap-3">
                <a href={founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-white/30 hover:text-green-400 hover:border-green-400/30 transition-all" aria-label="WhatsApp">
                  <MessageCircle size={14} />
                </a>
                <a href={`mailto:${founder.email}`} className="w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-white/30 hover:text-red-400 hover:border-red-400/30 transition-all" aria-label="Email">
                  <Mail size={14} />
                </a>
                <a href={founder.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-white/30 hover:text-blue-400 hover:border-blue-400/30 transition-all" aria-label="LinkedIn">
                  <Linkedin size={14} />
                </a>
                <a href={brand.social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-white/30 hover:text-pink-400 hover:border-pink-400/30 transition-all" aria-label="Instagram">
                  <Instagram size={14} />
                </a>
                <a href={brand.social.tiktok} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-white/30 hover:text-white/70 hover:border-white/20 transition-all" aria-label="TikTok">
                  <TikTokIcon size={14} />
                </a>
              </div>
            </div>

            <p className="text-xs text-white/20 text-center">
              Based in the UAE · Serving businesses across the Gulf and internationally
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
