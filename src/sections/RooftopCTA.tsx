import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Phone, Mail, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { brand } from '@/data';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import QRCodeDisplay from '@/components/QRCode';
import { SocialConnectPills } from '@/components/SocialIcons';

export default function RooftopCTA() {
  const ref = useScrollAnimation();
  const { founder } = brand;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Save to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('contact_submissions').insert({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          source: 'website',
          status: 'new',
        });
      } catch (err) {
        console.error('Supabase insert failed:', err);
      }
    }

    // Also open email client
    const subject = encodeURIComponent(`AI Handle Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:${founder.email}?subject=${subject}&body=${body}`, '_self');

    setSubmitting(false);
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
        <div className="mb-12 animate-item">
          <SocialConnectPills
            whatsappUrl={founder.whatsappUrl}
            phoneRaw={founder.phoneRaw}
            email={founder.email}
            linkedinUrl={founder.linkedinUrl}
            instagramUrl={brand.social.instagram}
            tiktokUrl={brand.social.tiktok}
          />
        </div>

        {/* Contact Form */}
        <div id="contact-form" className="max-w-xl mx-auto mb-16 animate-item">
          {submitted ? (
            <div className="card-surface p-10 text-center">
              <CheckCircle size={40} className="text-green-400 mx-auto mb-4" />
              <h3 className="heading-sub mb-2">Thank You</h3>
              <p className="body-text mb-6">
                Your inquiry has been received. We will get back to you within 24 hours.
              </p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }); }} className="btn-secondary text-sm">
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
                <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-50">
                  {submitting ? 'Sending...' : <><Send size={14} /> Send Inquiry</>}
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
