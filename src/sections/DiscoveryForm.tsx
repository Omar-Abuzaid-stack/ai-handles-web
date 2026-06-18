import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const countries = ['UAE', 'Saudi Arabia', 'Pakistan', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Other'];
const companyTypes = ['Developer', 'Agency', 'Brokerage', 'Investment Company', 'Property Management', 'Other'];
const salesTeamSizes = ['1-5', '6-15', '16-50', '50+'];
const crmOptions = ['Salesforce', 'HubSpot', 'Zoho', 'Property Finder CRM', 'Bayut CRM', 'Custom', 'None', 'Other'];
const contactMethods = ['Email', 'Phone', 'WhatsApp', 'Video Call'];

const agentOptions = [
  'WhatsApp Sales',
  'CRM Operations',
  'Lead Research',
  'Email Outreach',
  'Content Creation',
  'Website/SEO',
  'Voice Reception',
  'Reporting',
  'Telegram Command',
  'Automation Engine',
];

export default function DiscoveryForm() {
  const ref = useScrollAnimation();
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    companyType: '',
    salesTeamSize: '',
    crm: '',
    challenge: '',
    contactMethod: '',
  });

  const handleAgentToggle = (agent: string) => {
    setSelectedAgents((prev) =>
      prev.includes(agent) ? prev.filter((a) => a !== agent) : [...prev, agent]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    // TODO: Connect to backend API for form submission
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  if (formState === 'success') {
    return (
      <section id="contact" className="bg-[#141414] section-padding">
        <div className="content-max max-w-2xl mx-auto text-center py-16">
          <CheckCircle size={64} className="text-[#4ADE80] mx-auto mb-6" />
          <h2 className="section-title text-[#F5F0EB] mb-4">Thank You</h2>
          <p className="font-body text-lg text-[#8A8478]">
            We&apos;ll be in touch within 24 hours to schedule your AI Discovery Session
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-[#141414] section-padding">
      <div ref={ref} className="content-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title text-[#F5F0EB] mb-4 animate-item">
            Start Building Your AI Workforce
          </h2>
          <p className="font-body text-base text-[#8A8478] animate-item">
            Tell us about your operation and we&apos;ll design the right AI team for your needs
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto animate-item">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5">
              <div>
                <label className="block font-body text-sm text-[#8A8478] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 font-body text-sm text-[#F5F0EB] placeholder:text-[#5A5550] focus:border-[#C9A96E] focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block font-body text-sm text-[#8A8478] mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 font-body text-sm text-[#F5F0EB] placeholder:text-[#5A5550] focus:border-[#C9A96E] focus:outline-none transition-colors"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label className="block font-body text-sm text-[#8A8478] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 font-body text-sm text-[#F5F0EB] placeholder:text-[#5A5550] focus:border-[#C9A96E] focus:outline-none transition-colors"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block font-body text-sm text-[#8A8478] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 font-body text-sm text-[#F5F0EB] placeholder:text-[#5A5550] focus:border-[#C9A96E] focus:outline-none transition-colors"
                  placeholder="+971..."
                />
              </div>

              <div>
                <label className="block font-body text-sm text-[#8A8478] mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 font-body text-sm text-[#F5F0EB] focus:border-[#C9A96E] focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div>
                <label className="block font-body text-sm text-[#8A8478] mb-2">
                  Company Type
                </label>
                <select
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleChange}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 font-body text-sm text-[#F5F0EB] focus:border-[#C9A96E] focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select type</option>
                  {companyTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-body text-sm text-[#8A8478] mb-2">
                  Number of Salespeople
                </label>
                <select
                  name="salesTeamSize"
                  value={formData.salesTeamSize}
                  onChange={handleChange}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 font-body text-sm text-[#F5F0EB] focus:border-[#C9A96E] focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select size</option>
                  {salesTeamSizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-body text-sm text-[#8A8478] mb-2">
                  Current CRM
                </label>
                <select
                  name="crm"
                  value={formData.crm}
                  onChange={handleChange}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 font-body text-sm text-[#F5F0EB] focus:border-[#C9A96E] focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select CRM</option>
                  {crmOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-body text-sm text-[#8A8478] mb-2">
                  Main Challenge
                </label>
                <textarea
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 font-body text-sm text-[#F5F0EB] placeholder:text-[#5A5550] focus:border-[#C9A96E] focus:outline-none transition-colors resize-none"
                  placeholder="Describe your main challenge..."
                />
              </div>

              <div>
                <label className="block font-body text-sm text-[#8A8478] mb-2">
                  Preferred Contact Method
                </label>
                <select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 font-body text-sm text-[#F5F0EB] focus:border-[#C9A96E] focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select method</option>
                  {contactMethods.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Desired AI Agents */}
          <div className="mt-6">
            <label className="block font-body text-sm text-[#8A8478] mb-3">
              Desired AI Agents
            </label>
            <div className="flex flex-wrap gap-2">
              {agentOptions.map((agent) => (
                <button
                  key={agent}
                  type="button"
                  onClick={() => handleAgentToggle(agent)}
                  className={`font-body text-xs px-3 py-2 rounded-full border transition-all ${
                    selectedAgents.includes(agent)
                      ? 'bg-[#C9A96E] text-[#0A0A0A] border-[#C9A96E]'
                      : 'bg-transparent text-[#8A8478] border-[#2A2A2A] hover:border-[#C9A96E]'
                  }`}
                >
                  {agent}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {formState === 'error' && (
            <div className="mt-6 flex items-center gap-2 text-[#F59E0B]">
              <AlertCircle size={18} />
              <span className="font-body text-sm">
                Something went wrong. Please try again or contact us directly
              </span>
            </div>
          )}

          {/* Submit */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={formState === 'loading'}
              className="btn-primary text-base px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formState === 'loading' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                'Submit Enquiry'
              )}
            </button>
          </div>

          {/* Backend TODO Note */}
          {/* TODO: Connect to backend API for form submission */}
        </form>
      </div>
    </section>
  );
}
