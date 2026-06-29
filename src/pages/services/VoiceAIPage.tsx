import { Link } from 'react-router';
import { ArrowLeft, PhoneIncoming, PhoneOutgoing, ShieldCheck, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function VoiceAIPage() {
  const ref = useScrollAnimation();

  return (
    <div className="min-h-screen">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/#what-we-deploy" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-4">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="mb-12">
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
          <div className="max-w-3xl">
            <h2 className="text-2xl font-body font-semibold text-white mb-6">Conversational Intelligence at Scale</h2>
            <p className="body-text text-white/70 mb-12">
              Voice interactions are the most natural way customers want to engage. We build conversational AI voice systems that handle inbound reception and compliant outbound communication—sounding indistinguishable from a top-tier human representative.
            </p>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <PhoneIncoming size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Inbound Reception & Support</h3>
                  <p className="text-white/60 leading-relaxed">
                    Never miss a lead or leave a customer on hold. Our Voice AI handles incoming calls 24/7, answering FAQs, booking appointments, routing complex issues to the right human department, and automatically logging detailed call summaries directly into your CRM.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <PhoneOutgoing size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Outbound Campaigns & Follow-ups</h3>
                  <p className="text-white/60 leading-relaxed">
                    Execute follow-ups, lead qualification calls, and appointment reminders at scale. The AI uses natural inflection, strategic pauses, and contextual understanding, making conversations feel highly human, authentic, and persuasive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#050505] border-t border-white/5">
        <div className="content-max">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#7E22CE]/10 border border-[#7E22CE]/20 flex items-center justify-center text-[#7E22CE]">
                <ShieldCheck size={20} />
              </div>
              <h2 className="font-body font-semibold text-2xl text-white">Outbound Compliance & Ethics</h2>
            </div>
            
            <p className="body-text text-white/70 mb-8">
              We prioritize legality, brand reputation, and user trust. All outbound calling campaigns must strictly follow these non-negotiable rules:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#7E22CE] flex-shrink-0 mt-1" />
                <p className="text-sm text-white/60">Prior explicit consent must be obtained from all contacts.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#7E22CE] flex-shrink-0 mt-1" />
                <p className="text-sm text-white/60">Strict adherence to local telemarketing and data protection regulations.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#7E22CE] flex-shrink-0 mt-1" />
                <p className="text-sm text-white/60">Immediate compliance with Do-Not-Call (DNC) lists and opt-out requests.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#7E22CE] flex-shrink-0 mt-1" />
                <p className="text-sm text-white/60">The use of client-approved scripts and honest representations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
