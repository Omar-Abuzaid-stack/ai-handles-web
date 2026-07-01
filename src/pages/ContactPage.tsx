import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Phone, Mail, MessageCircle, Send, CheckCircle, Loader2, Calendar, MapPin, Video, Users } from 'lucide-react';
import { brand } from '@/data';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { tracker } from '@/lib/tracking';

export default function ContactPage() {
  const ref = useScrollAnimation();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  // Booking state
  const [bookingStep, setBookingStep] = useState<'idle'|'selecting'|'confirmed'>('idle');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingType, setMeetingType] = useState<'online'|'face-to-face'|''>('');
  const [clientLocation, setClientLocation] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [bookingError, setBookingError] = useState('');

  const TIMEZONE = 'Asia/Dubai';
  const REQUIRED_DATES = 30;
  const timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'];

  // 1. Fetch Supabase Data
  useEffect(() => {
    const fetchData = async () => {
      if (isSupabaseConfigured && supabase) {
        try {
          const todayDubai = new Intl.DateTimeFormat('en-CA', { timeZone: TIMEZONE }).format(new Date());
          const { data: bookings } = await supabase.from('bookings').select('date, time, status').gte('date', todayDubai);
          const slots: Record<string, string[]> = {};
          const blocked: string[] = [];
          if (bookings) {
            bookings.forEach(b => {
              if (b.status === 'blocked') {
                blocked.push(b.date);
              } else if (b.status !== 'cancelled') {
                if (!slots[b.date]) slots[b.date] = [];
                slots[b.date].push(b.time);
              }
            });
          }
          setBookedSlots(slots);
          setBlockedDates(blocked);
        } catch { /* continue */ }
      }
    };
    fetchData();
  }, [bookingStep]); // re-fetch when they open the calendar

  // 2. Generate Dates based on fetched data
  useEffect(() => {
    const getDubaiDateStr = (d: Date) => new Intl.DateTimeFormat('en-CA', { timeZone: TIMEZONE }).format(d);
    
    const dates: string[] = [];
    const now = new Date();
    const dubaiParts = new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(now);
    const dubaiHour = parseInt(dubaiParts.find(p => p.type === 'hour')?.value || '0', 10);
    const dubaiMinute = parseInt(dubaiParts.find(p => p.type === 'minute')?.value || '0', 10);
    const todayStr = getDubaiDateStr(now);

    let checkDate = new Date();
    while (dates.length < REQUIRED_DATES) {
      const dStr = getDubaiDateStr(checkDate);
      const dayOfWeek = new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, weekday: 'short' }).format(checkDate);
      
      let isValid = true;
      if (dayOfWeek === 'Sat' || dayOfWeek === 'Sun') isValid = false;
      if (blockedDates.includes(dStr)) isValid = false;
      
      if (isValid) {
        let availableSlotsCount = timeSlots.length;
        if (dStr === todayStr) {
          availableSlotsCount = timeSlots.filter(t => {
            const [h, m] = t.split(':').map(Number);
            return h > dubaiHour || (h === dubaiHour && m > dubaiMinute);
          }).length;
        }
        
        const bookedCount = bookedSlots[dStr]?.length || 0;
        if (availableSlotsCount > 0 && bookedCount < availableSlotsCount) {
          dates.push(dStr);
        }
      }
      
      checkDate.setDate(checkDate.getDate() + 1);
      if (checkDate.getTime() - now.getTime() > 100 * 24 * 60 * 60 * 1000) break; // failsafe
    }
    
    setAvailableDates(dates);
  }, [bookedSlots, blockedDates]);

  // Compute available timeslots for selected date
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];
    const now = new Date();
    const todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: TIMEZONE }).format(now);
    const dubaiParts = new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(now);
    const dubaiHour = parseInt(dubaiParts.find(p => p.type === 'hour')?.value || '0', 10);
    const dubaiMinute = parseInt(dubaiParts.find(p => p.type === 'minute')?.value || '0', 10);

    return timeSlots.filter(t => {
      if (bookedSlots[selectedDate]?.includes(t)) return false;
      if (selectedDate === todayStr) {
        const [h, m] = t.split(':').map(Number);
        if (h < dubaiHour || (h === dubaiHour && m <= dubaiMinute)) return false;
      }
      return true;
    });
  }, [selectedDate, bookedSlots]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingError('');
    try {
      if (isSupabaseConfigured && supabase) {
        // Double booking check
        const { data: existing } = await supabase.from('bookings').select('id').eq('date', selectedDate).eq('time', selectedTime).neq('status', 'cancelled');
        if (existing && existing.length > 0) {
          setBookingError('Sorry, this slot was just taken. Please select another time.');
          setBookingLoading(false);
          // Remove from local state
          setBookedSlots(prev => ({...prev, [selectedDate]: [...(prev[selectedDate]||[]), selectedTime]}));
          setSelectedTime('');
          return;
        }

        const { error } = await supabase.from('bookings').insert({
          name: bookingName,
          email: bookingEmail,
          phone: bookingPhone,
          date: selectedDate,
          time: selectedTime,
          meeting_type: meetingType,
          location: meetingType === 'face-to-face' ? clientLocation : 'Online',
          status: 'pending',
        });
        if (error) throw error;

        // Trigger Telegram
        fetch('/api/telegram-notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'booking_confirmed',
            data: {
              name: bookingName,
              email: bookingEmail,
              phone: bookingPhone,
              date: selectedDate,
              time: selectedTime,
              format: meetingType,
              location: meetingType === 'face-to-face' ? clientLocation : 'Online',
            }
          })
        }).catch(() => {});
      }
    } catch { /* continue */ }
    
    tracker.contactForm(bookingName, bookingEmail);
    setBookingLoading(false);
    setBookingStep('confirmed');
  };

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

    // Track the form submission
    tracker.contactForm(formData.name, formData.email);

    // Open email client as fallback
    const subject = encodeURIComponent('AI Handle Enquiry');
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.message}`);
    window.open(`mailto:${brand.founder.email}?subject=${subject}&body=${body}`, '_blank');

    setSending(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-4">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="mb-10">
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

          {/* ── Booking System ── */}
          <div className="mb-14">
            {bookingStep === 'confirmed' ? (
              <div className="card-surface p-8 text-center max-w-lg mx-auto">
                <CheckCircle size={40} className="text-green-400 mx-auto mb-4" />
                <h3 className="font-body font-semibold text-lg text-white mb-2">Meeting Booked</h3>
                <p className="text-sm text-white/50 mb-2">{selectedDate} at {selectedTime}</p>
                <p className="text-sm text-white/50 mb-6">{meetingType === 'online' ? 'Online meeting — we will send the link.' : `Face-to-face at: ${clientLocation}`}</p>
                <button onClick={() => { setBookingStep('idle'); setSelectedDate(''); setSelectedTime(''); setMeetingType(''); setClientLocation(''); }} className="text-xs text-purple hover:text-purple/70 transition-colors">Book another time</button>
              </div>
            ) : bookingStep === 'selecting' ? (
              <div className="card-surface p-8 max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#7E22CE]/10 border border-[#7E22CE]/20 flex items-center justify-center text-[#7E22CE]"><Calendar size={15} /></div>
                  <h3 className="font-body font-semibold text-white">Book a Discovery Session</h3>
                  <span className="ml-auto text-[10px] text-white/30 border border-white/10 rounded-full px-2 py-0.5">Mon–Fri · 8:00am–3:30pm GST</span>
                </div>
                <form onSubmit={handleBooking} className="space-y-6">
                  {/* Personal details */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-black/50 dark:text-white/40 mb-1.5 block">Your Name *</label>
                      <input required value={bookingName} onChange={e => setBookingName(e.target.value)} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/8 rounded-xl px-4 py-2.5 text-sm focus:border-purple/40 focus:outline-none" placeholder="Name" />
                    </div>
                    <div>
                      <label className="text-xs text-black/50 dark:text-white/40 mb-1.5 block">Email *</label>
                      <input required type="email" value={bookingEmail} onChange={e => setBookingEmail(e.target.value)} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/8 rounded-xl px-4 py-2.5 text-sm focus:border-purple/40 focus:outline-none" placeholder="email@company.com" />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 mb-1.5 block">Phone</label>
                      <input value={bookingPhone} onChange={e => setBookingPhone(e.target.value)} className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-purple/40 focus:outline-none" placeholder="+971 ..." />
                    </div>
                  </div>
                  {/* Date */}
                  <div>
                    <label className="text-xs text-white/40 mb-2 block">Select a Date *</label>
                    <div className="flex flex-wrap gap-2">
                      {availableDates.map(d => (
                        <button key={d} type="button" onClick={() => setSelectedDate(d)} className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${ selectedDate === d ? 'bg-[#7E22CE] border-[#7E22CE] text-white' : 'border-white/10 text-white/40 hover:border-[#7E22CE]/40 hover:text-white/70 bg-white/[0.02]' }`}>
                          {new Date(d + 'T12:00:00').toLocaleDateString('en-AE', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Time */}
                  {selectedDate && (
                    <div>
                      <label className="text-xs text-white/40 mb-2 block">Select a Time *</label>
                      <div className="flex flex-wrap gap-2">
                        {availableTimeSlots.map(t => (
                          <button key={t} type="button" onClick={() => setSelectedTime(t)} className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${ selectedTime === t ? 'bg-[#7E22CE] border-[#7E22CE] text-white' : 'border-white/10 text-white/40 hover:border-[#7E22CE]/40 hover:text-white/70 bg-white/[0.02]' }`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Meeting type */}
                  {selectedTime && (
                    <div>
                      <label className="text-xs text-white/40 mb-2 block">Meeting Format *</label>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => setMeetingType('online')} className={`flex items-center gap-2 text-xs px-4 py-2 rounded-lg border transition-all duration-200 ${ meetingType === 'online' ? 'bg-[#7E22CE] border-[#7E22CE] text-white' : 'border-white/10 text-white/40 hover:border-[#7E22CE]/40 bg-white/[0.02]' }`}>
                          <Video size={13} /> Online
                        </button>
                        <button type="button" onClick={() => setMeetingType('face-to-face')} className={`flex items-center gap-2 text-xs px-4 py-2 rounded-lg border transition-all duration-200 ${ meetingType === 'face-to-face' ? 'bg-[#7E22CE] border-[#7E22CE] text-white' : 'border-white/10 text-white/40 hover:border-[#7E22CE]/40 bg-white/[0.02]' }`}>
                          <Users size={13} /> Face-to-Face
                        </button>
                      </div>
                      {meetingType === 'face-to-face' && (
                        <div className="mt-3">
                          <label className="text-xs text-white/40 mb-1.5 block">Your Location / Area *</label>
                          <div className="relative">
                            <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                            <input required={meetingType === 'face-to-face'} value={clientLocation} onChange={e => setClientLocation(e.target.value)} className="w-full bg-white/5 border border-white/8 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-purple/40 focus:outline-none" placeholder="e.g. Dubai Marina, Business Bay..." />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Submit */}
                  {bookingError && <p className="text-xs text-red-400 mb-2">{bookingError}</p>}
                  {meetingType && (meetingType === 'online' || clientLocation) && selectedDate && selectedTime && (
                    <button type="submit" disabled={bookingLoading} className="btn-primary w-full justify-center disabled:opacity-50">
                      {bookingLoading ? <Loader2 size={15} className="animate-spin" /> : <><Calendar size={14} /> Confirm Booking</>}
                    </button>
                  )}
                </form>
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={() => setBookingStep('selecting')}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#7E22CE]/10 border border-[#7E22CE]/30 text-[#7E22CE] hover:bg-[#7E22CE]/20 hover:border-[#7E22CE]/50 transition-all duration-300 group"
                >
                  <Calendar size={20} />
                  <div className="text-left">
                    <p className="font-body font-semibold text-sm">Book a Discovery Session</p>
                    <p className="text-xs text-white/40">Available Mon–Fri · 8:00am–3:30pm GST</p>
                  </div>
                </button>
                <p className="text-xs text-white/20 mt-4">Or send us a message below</p>
              </div>
            )}
          </div>

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
                      <label className="text-xs text-white/40 mb-1.5 block">What do you need? *</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {['AI Agents', 'Business Automations', 'AI Deployment', 'Premium Website', 'Paid Advertising & Growth', 'AI Voice Reception', 'Full AI Infrastructure', 'Not sure — just exploring'].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setFormData({ ...formData, message: formData.message ? `${formData.message}, ${s}` : `I'm interested in: ${s}` })}
                            className="text-[11px] px-3 py-1 rounded-full border border-white/10 text-white/40 hover:border-[#7E22CE]/50 hover:text-[#7E22CE] transition-all duration-200 bg-white/[0.02]"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      <textarea
                        required
                        rows={4}
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
