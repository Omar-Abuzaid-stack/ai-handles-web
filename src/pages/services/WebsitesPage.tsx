import { Link } from 'react-router';
import { ArrowLeft, MessageSquare, Network, Lock, PieChart, Server } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function WebsitesPage() {
  const ref = useScrollAnimation();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/#what-we-deploy" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-4">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="mb-12">
            <p className="label-text text-purple mb-4 animate-item">Service Detail</p>
            <h1 className="heading-display mb-6 animate-item">Websites as Infrastructure</h1>
            <p className="body-text max-w-2xl animate-item">
              We don't build visual brochures. We build digital infrastructure. Your website should be the operational core of your business, equipped with everything needed to convert and manage clients.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding pt-0">
        <div ref={ref} className="content-max">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-body font-semibold text-white mb-6">Digital Infrastructure, Not Just Visuals</h2>
            <p className="body-text text-white/70 mb-12">
              Most agencies build visual brochures that sit idle. We build active digital infrastructure. Your website should be the operational core of your business—working around the clock to explain your services, capture leads, qualify prospects, and route data exactly where it needs to go.
            </p>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Conversational AI Interfaces</h3>
                  <p className="text-white/60 leading-relaxed">
                    Intelligent, 24/7 AI chatbots embedded directly into your site. They don't just answer FAQs—they capture intent, qualify leads, and book appointments automatically.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Network size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">CRM & Workflow Integration</h3>
                  <p className="text-white/60 leading-relaxed">
                    Leads and customer data flow seamlessly into your preferred CRM. Smart data capture automatically triggers internal workflows and lead-routing assignments based on custom logic.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Secure Portals & Dashboards</h3>
                  <p className="text-white/60 leading-relaxed">
                    Private client areas for document access, project updates, and secure billing. Alongside a centralized admin dashboard for your team to manage content, users, and business settings.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start border-l-2 border-[#7E22CE]/30 pl-6 hover:border-[#7E22CE] transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-[#7E22CE]">
                  <PieChart size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-body font-semibold text-white mb-2">Actionable Analytics</h3>
                  <p className="text-white/60 leading-relaxed">
                    Deep insights into traffic, behavior, and conversion metrics. We track what matters, giving you the data required to make strategic business decisions, not just vanity metrics.
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
                <Server size={20} />
              </div>
              <h2 className="font-body font-semibold text-2xl text-white">Beyond the Frontend</h2>
            </div>
            <p className="body-text text-white/70">
              A beautiful, premium design is merely the baseline expectation. Our true focus is on the backend architecture and integrations that empower your team, automate your processes, and scale effortlessly as your business grows.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
