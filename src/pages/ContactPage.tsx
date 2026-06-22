import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Phone, Mail, MessageCircle, Send, CheckCircle, Loader2 } from 'lucide-react';
import { brand } from '@/data';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ContactPage() {
  const ref = useScrollAnimation();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.from('contact_submissions').insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          source: 'contact_page',
        });
      }
    } catch {
      // Continue even if Supabase fails
    }

    // Open email client as fallback
    const subject = encodeURIComponent('AI Handle Enquiry');
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.message}`);
    window.open(`mailto:${brand.founder.email}?subject=${subject}&body=${body}`, '_blank');

    setSending(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="mb-16">
            <p className="label-text text-purple mb-4 animate-item">Contact</p>
            <h1 className="heading-display mb-6 animate-item">Get in Touch</h1>
            <p className="body-text max-w-2xl animate-item">
              Book a discovery session to discuss how AI Handle can deploy AI agents, automations, and growth infrastructure into your business.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="card-surface p-8 animate-item">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle size={40} className="text-green-400 mx-auto mb-4" />
                    <h3 className="font-body font-semibold text-lg text-white mb-2">Message Received</h3>
                    <p className="body-text text-sm mb-6">Thank you for reaching out. We will respond shortly.</p>
                    <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }} className="btn-secondary text-sm">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs text-white/40 mb-1.5 block">Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-purple/40 focus:outline-none transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/40 mb-1.5 block">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-purple/40 focus:outline-none transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-white/40 mb-1.5 block">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-purple/40 focus:outline-none transition-colors"
                        placeholder="+971 ..."
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 mb-1.5 block">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-purple/40 focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your business and what you need..."
                      />
                    </div>
                    <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-50">
                      {sending ? <Loader2 size={16} className="animate-spin" /> : <><Send size={14} /> Send Message</>}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Founder Profile Card */}
              <Link to="/team/omar-mohamed" className="card-surface p-6 animate-item block group hover:border-purple/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                    <img
                      src={brand.founder.image}
                      alt={brand.founder.imageAlt}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png'; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-semibold text-white group-hover:text-purple transition-colors">{brand.founder.name}</h3>
                    <p className="text-xs text-purple/60">{brand.founder.title}</p>
                    <p className="text-xs text-white/30 mt-1">View Portfolio →</p>
                  </div>
                </div>
                <div className="space-y-2 border-t border-white/5 pt-4">
                  <a href={`tel:${brand.founder.phoneRaw}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                    <Phone size={12} className="text-purple/60" /> {brand.founder.phone}
                  </a>
                  <a href={`mailto:${brand.founder.email}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                    <Mail size={12} className="text-purple/60" /> {brand.founder.email}
                  </a>
                  <a href={brand.founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/50 hover:text-green-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                    <MessageCircle size={12} className="text-green-400" /> WhatsApp
                  </a>
                </div>
              </Link>

              {/* Sales Manager Profile Card */}
              <Link to="/team/mohamed-rayan" className="card-surface p-6 animate-item block group hover:border-purple/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                    <img
                      src={brand.salesManager.image}
                      alt={brand.salesManager.imageAlt}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png'; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-semibold text-white group-hover:text-purple transition-colors">{brand.salesManager.name}</h3>
                    <p className="text-xs text-purple/60">{brand.salesManager.title}</p>
                    <p className="text-xs text-white/30 mt-1">View Portfolio →</p>
                  </div>
                </div>
                <div className="space-y-2 border-t border-white/5 pt-4">
                  <a href={`tel:${brand.salesManager.phoneRaw}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                    <Phone size={12} className="text-purple/60" /> {brand.salesManager.phone}
                  </a>
                  <a href={`mailto:${brand.salesManager.email}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                    <Mail size={12} className="text-purple/60" /> {brand.salesManager.email}
                  </a>
                  <a href={brand.salesManager.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/50 hover:text-green-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                    <MessageCircle size={12} className="text-green-400" /> WhatsApp
                  </a>
                </div>
              </Link>

              {/* Location */}
              <div className="card-surface p-6 animate-item">
                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Location</h3>
                <p className="text-sm text-white/50">Based in the UAE</p>
                <p className="text-xs text-white/30 mt-1">Serving businesses across the Gulf and internationally</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
