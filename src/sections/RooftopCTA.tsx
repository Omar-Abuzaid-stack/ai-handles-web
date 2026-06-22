import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Phone, Mail, MessageCircle, Send, CheckCircle, Linkedin, Instagram } from 'lucide-react';
import { brand } from '@/data';
import QRCodeDisplay from '@/components/QRCode';

const TikTokIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.28 8.28 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.28z"/>
  </svg>
);

export default function RooftopCTA() {
  const ref = useScrollAnimation();
  const { founder } = brand;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`AI Handle Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:${founder.email}?subject=${subject}&body=${body}`, '_self');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-[#070707]">
      <div ref={ref} className="content-max text-center">
        <h2 className="heading-section mb-6 animate-item">
          Build the Team That <span className="serif-italic text-white/50">Never Sleeps.</span>
        </h2>
        <p className="body-text max-w-xl mx-auto mb-4 animate-item">
          Start with one AI agent, automate one workflow, or build a complete digital workforce around your business.
        </p>
        <p className="text-xs text-white/20 mb-10 animate-item">
          Everything is custom. No shared systems. Full privacy. No data leaks.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-item">
          <a href={founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle size={16} /> Speak With Omar
          </a>
          <a
            href="#contact-form"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            Build My AI Team
          </a>
          <a
            href="#demo"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-secondary"
          >
            Watch the Demo
          </a>
        </div>

        {/* Social Connection Options */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-item">
          <a href={founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-body hover:bg-green-500/20 transition-all">
            <MessageCircle size={14} /> WhatsApp
          </a>
          <a href={`mailto:${founder.email}`} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-400/10 border border-red-400/20 text-red-400 text-sm font-body hover:bg-red-400/20 transition-all">
            <Mail size={14} /> Gmail
          </a>
          <a href={`tel:${founder.phoneRaw}`} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple/10 border border-purple/20 text-purple text-sm font-body hover:bg-purple/20 transition-all">
            <Phone size={14} /> Phone
          </a>
          {founder.linkedinUrl && (
            <a href={founder.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-400 text-sm font-body hover:bg-blue-400/20 transition-all">
              <Linkedin size={14} /> LinkedIn
            </a>
          )}
          <a href={brand.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-pink-400/10 border border-pink-400/20 text-pink-400 text-sm font-body hover:bg-pink-400/20 transition-all">
            <Instagram size={14} /> Instagram
          </a>
          <a href={brand.social.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-body hover:bg-white/10 transition-all">
            <TikTokIcon size={14} /> TikTok
          </a>
        </div>

        {/* Contact Form */}
        <div id="contact-form" className="max-w-xl mx-auto mb-16 animate-item">
          {submitted ? (
            <div className="card-surface p-10 text-center">
              <CheckCircle size={40} className="text-green-400 mx-auto mb-4" />
              <h3 className="heading-sub mb-2">Thank You</h3>
              <p className="body-text mb-6">
                Your email client should open with the inquiry pre-filled. If not, send us an email directly at{' '}
                <a href={`mailto:${founder.email}`} className="text-purple hover:underline">{founder.email}</a>
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm">
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-surface p-8 text-left">
              <p className="label-text text-purple mb-6">Get in Touch</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cta-name" className="block text-xs text-white/40 mb-1.5 font-body">Full Name</label>
                  <input
                    id="cta-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-purple/40 transition-colors font-body"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cta-email" className="block text-xs text-white/40 mb-1.5 font-body">Email</label>
                    <input
                      id="cta-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-purple/40 transition-colors font-body"
                    />
                  </div>
                  <div>
                    <label htmlFor="cta-phone" className="block text-xs text-white/40 mb-1.5 font-body">Phone</label>
                    <input
                      id="cta-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+971 ..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-purple/40 transition-colors font-body"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="cta-message" className="block text-xs text-white/40 mb-1.5 font-body">How can we help?</label>
                  <textarea
                    id="cta-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your business and what you need..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-purple/40 transition-colors font-body resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  <Send size={14} /> Send Inquiry
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact Details */}
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-item">
          <div className="space-y-4">
            <h3 className="font-body font-semibold text-sm text-white">Contact</h3>
            <a href={`tel:${founder.phoneRaw}`} className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <Phone size={14} className="text-purple" /> {founder.phone}
            </a>
            <a href={`mailto:${founder.email}`} className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <Mail size={14} className="text-purple" /> {founder.email}
            </a>
            <a href={founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <MessageCircle size={14} className="text-green-400" /> WhatsApp
            </a>
          </div>

          <div className="flex justify-center">
            <QRCodeDisplay size={140} showLabel />
          </div>

          <div className="space-y-4">
            <h3 className="font-body font-semibold text-sm text-white">Sales</h3>
            <a href={`tel:${brand.salesManager.phoneRaw}`} className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <Phone size={14} className="text-purple" /> {brand.salesManager.phone}
            </a>
            <a href={`mailto:${brand.salesManager.email}`} className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <Mail size={14} className="text-purple" /> {brand.salesManager.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
