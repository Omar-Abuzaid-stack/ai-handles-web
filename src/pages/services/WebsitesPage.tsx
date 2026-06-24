import { Link } from 'react-router';
import { ArrowLeft, MessageSquare, Briefcase, Calendar, Network, Lock, PieChart, Workflow, Server } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function WebsitesPage() {
  const ref = useScrollAnimation();

  const features = [
    { title: 'AI Chatbot', description: 'Intelligent, 24/7 conversational interfaces embedded directly into your site.', icon: <MessageSquare size={24} /> },
    { title: 'Contact Forms & Automations', description: 'Smart data capture that automatically triggers internal workflows.', icon: <Workflow size={24} /> },
    { title: 'CRM Integration', description: 'Leads and customer data flow seamlessly into your preferred CRM.', icon: <Network size={24} /> },
    { title: 'Appointment Booking', description: 'Self-serve calendars that sync across your entire team.', icon: <Calendar size={24} /> },
    { title: 'WhatsApp Integration', description: 'Connect site visitors directly to conversational WhatsApp flows.', icon: <MessageSquare size={24} /> },
    { title: 'Client Portal', description: 'Secure, private areas for clients to access documents, updates, and billing.', icon: <Lock size={24} /> },
    { title: 'Admin Dashboard', description: 'A centralized hub for your team to manage content, users, and settings.', icon: <Briefcase size={24} /> },
    { title: 'Analytics', description: 'Deep, actionable insights into traffic, behavior, and conversion metrics.', icon: <PieChart size={24} /> },
    { title: 'Lead-Routing Workflows', description: 'Automatically assign incoming leads to the right team member based on custom logic.', icon: <Network size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="section-padding pb-0">
        <div className="content-max">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Services
          </Link>
          <div className="mb-16">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="card-surface p-8 animate-item flex flex-col border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="w-12 h-12 rounded-xl bg-[#1A0B2E] border border-[#2D1B4E] flex items-center justify-center text-[#7E22CE] shadow-[0_0_15px_rgba(157,78,221,0.15)] mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-body font-semibold text-lg text-white mb-2">{feature.title}</h3>
                <p className="body-text text-sm text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#070707]">
        <div className="content-max text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple/10 border border-purple/20 text-purple mb-6">
            <Server size={32} />
          </div>
          <h2 className="heading-section mb-6">Beyond the Frontend</h2>
          <p className="body-text max-w-2xl mx-auto">
            A beautiful design is just the beginning. Our focus is on the backend architecture that empowers your team, automates your processes, and scales with your growth.
          </p>
        </div>
      </section>
    </div>
  );
}
