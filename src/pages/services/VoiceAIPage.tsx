import { Link } from 'react-router';
import { ArrowLeft, PhoneIncoming, PhoneOutgoing, ShieldCheck, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function VoiceAIPage() {
  const ref = useScrollAnimation();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Services
          </Link>
          <div className="mb-16">
            <p className="label-text text-purple mb-4 animate-item">Service Detail</p>
            <h1 className="heading-display mb-6 animate-item">Voice AI</h1>
            <p className="body-text max-w-2xl animate-item">
              Seamlessly handle inbound reception and compliant outbound communication with advanced, conversational AI voice systems.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-surface p-8 animate-item flex flex-col border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
              <div className="w-12 h-12 rounded-xl bg-[#1A0B2E] border border-[#2D1B4E] flex items-center justify-center text-[#7E22CE] shadow-[0_0_15px_rgba(157,78,221,0.15)] mb-6">
                <PhoneIncoming size={24} />
              </div>
              <h3 className="font-body font-semibold text-xl text-white mb-4">Inbound Calls</h3>
              <p className="body-text text-white/70 mb-6">
                Never miss a lead. Our Voice AI handles incoming calls 24/7, answering FAQs, booking appointments, routing calls to the right human department, and logging call summaries directly into your CRM.
              </p>
            </div>
            <div className="card-surface p-8 animate-item flex flex-col border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 rounded-xl bg-[#1A0B2E] border border-[#2D1B4E] flex items-center justify-center text-[#7E22CE] shadow-[0_0_15px_rgba(157,78,221,0.15)] mb-6">
                <PhoneOutgoing size={24} />
              </div>
              <h3 className="font-body font-semibold text-xl text-white mb-4">Outbound Calls</h3>
              <p className="body-text text-white/70 mb-6">
                Execute follow-ups, qualification calls, and reminders at scale. The AI uses natural inflection and pauses, making conversations feel highly human and authentic.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#070707]">
        <div className="content-max">
          <div className="card-surface p-8 border-purple/30 relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center text-purple">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-body font-semibold text-xl text-white">Outbound Compliance & Ethics</h3>
            </div>
            <p className="body-text mb-6">We prioritize legality and user trust. All outbound calling campaigns must strictly follow these rules:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/70"><CheckCircle size={18} className="text-purple flex-shrink-0" /> Prior explicit consent must be obtained from all contacts.</li>
              <li className="flex items-start gap-3 text-sm text-white/70"><CheckCircle size={18} className="text-purple flex-shrink-0" /> Strict adherence to local telemarketing and data protection regulations.</li>
              <li className="flex items-start gap-3 text-sm text-white/70"><CheckCircle size={18} className="text-purple flex-shrink-0" /> Immediate compliance with Do-Not-Call (DNC) lists and opt-out requests.</li>
              <li className="flex items-start gap-3 text-sm text-white/70"><CheckCircle size={18} className="text-purple flex-shrink-0" /> The use of client-approved scripts and honest representations.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
