import { Phone, Mail, MessageCircle } from 'lucide-react';
import { brand } from '@/data';

const footerServices = [
  'AI Agents',
  'Business Automations',
  'AI Deployment',
  'Premium Websites',
  'Paid Advertising & Growth',
  'AI Voice Reception',
  'Content Systems',
  'Reporting & Management',
];

const footerIndustries = [
  'Business Owners',
  'B2B Companies',
  'Real Estate',
  'Clinics',
  'Agencies & Partners',
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { founder } = brand;

  return (
    <footer id="footer" className="bg-[#0A0A0A] border-t border-[#2A2A2A]">
      <div className="content-max px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="font-body font-semibold text-sm tracking-[0.12em] text-[#F5F0EB]">
                AI HANDLE
              </span>
            </div>
            <p className="font-body text-sm text-[#8A8478] mb-6 leading-relaxed">
              AI Handle — AI Agents, Automations and Growth Systems. We deploy intelligence into your business.
            </p>
            <div className="space-y-2">
              <a href={`tel:${founder.phoneRaw}`} className="flex items-center gap-2 text-[#8A8478] hover:text-[#F5F0EB] transition-colors">
                <Phone size={14} className="text-[#C9A96E]" />
                <span className="font-body text-xs">{founder.phone}</span>
              </a>
              <a href={`mailto:${founder.email}`} className="flex items-center gap-2 text-[#8A8478] hover:text-[#F5F0EB] transition-colors">
                <Mail size={14} className="text-[#C9A96E]" />
                <span className="font-body text-xs">{founder.email}</span>
              </a>
              <a href={founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#8A8478] hover:text-[#F5F0EB] transition-colors">
                <MessageCircle size={14} className="text-[#4ADE80]" />
                <span className="font-body text-xs">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-body font-semibold text-xs text-[#F5F0EB] mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {footerServices.map((service) => (
                <li key={service}>
                  <a href="#capabilities" className="font-body text-[13px] text-[#8A8478] hover:text-[#C9A96E] transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Column */}
          <div>
            <h4 className="font-body font-semibold text-xs text-[#F5F0EB] mb-4 uppercase tracking-wider">Industries</h4>
            <ul className="space-y-2">
              {footerIndustries.map((industry) => (
                <li key={industry}>
                  <a href="#industries" className="font-body text-[13px] text-[#8A8478] hover:text-[#C9A96E] transition-colors">
                    {industry}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="font-body font-semibold text-xs text-[#F5F0EB] mb-4 mt-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><a href="#founder" className="font-body text-[13px] text-[#8A8478] hover:text-[#C9A96E] transition-colors">Founder</a></li>
              <li><a href="#work" className="font-body text-[13px] text-[#8A8478] hover:text-[#C9A96E] transition-colors">Selected Work</a></li>
              <li><a href="#safety" className="font-body text-[13px] text-[#8A8478] hover:text-[#C9A96E] transition-colors">Human Control</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-body font-semibold text-xs text-[#F5F0EB] mb-4 uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 mb-8">
              <p className="font-body font-semibold text-sm text-[#F5F0EB]">{founder.name}</p>
              <p className="font-body text-xs text-[#C9A96E]">{founder.title}</p>
              <a href={`tel:${founder.phoneRaw}`} className="block font-body text-sm text-[#8A8478] hover:text-[#F5F0EB] transition-colors">
                {founder.phone}
              </a>
              <a href={`mailto:${founder.email}`} className="block font-body text-sm text-[#8A8478] hover:text-[#F5F0EB] transition-colors">
                {founder.email}
              </a>
              <a href={founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="block font-body text-sm text-[#8A8478] hover:text-[#4ADE80] transition-colors">
                WhatsApp
              </a>
            </div>

            <a href="#contact" className="btn-primary text-xs py-2.5 px-5 inline-flex">
              Book Discovery
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2A2A2A] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center gap-6">
            <span className="font-body text-[13px] text-[#8A8478] hover:text-[#F5F0EB] transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="font-body text-[13px] text-[#8A8478] hover:text-[#F5F0EB] transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span className="font-body text-[13px] text-[#8A8478] hover:text-[#F5F0EB] transition-colors cursor-pointer">
              Cookie Policy
            </span>
          </div>
          <p className="font-body text-xs text-[#5A5550]">
            {currentYear} AI Handle. All rights reserved.
          </p>
        </div>

        {/* Social Placeholders */}
        <div className="flex justify-center gap-4 mt-6">
          {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
            <span key={social} className="px-3 py-1 bg-[#141414] border border-[#2A2A2A] rounded-full font-mono text-[10px] text-[#5A5550] hover:border-[#C9A96E]/30 hover:text-[#8A8478] transition-all cursor-pointer">
              {social}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
