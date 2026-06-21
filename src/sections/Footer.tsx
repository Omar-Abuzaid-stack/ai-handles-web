import { Phone, Mail, MessageCircle } from 'lucide-react';
import { brand } from '@/data';
import TikTokIcon from '@/components/TikTokIcon';

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
  const { founder, social } = brand;

  return (
    <footer id="footer" className="bg-[#0A0A0A] border-t border-[#2A2A2A]">
      <div className="content-max px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-[#2A2A2A] shadow-[0_0_15px_rgba(201,169,110,0.1)]">
                <img src="/brand/ai-handle-logo.png" alt="AI Handle" className="w-full h-full object-cover" />
              </div>
              <span className="font-body font-semibold text-sm tracking-[0.12em] text-[#F5F0EB]">
                AI HANDLE
              </span>
            </div>
            <p className="font-body text-sm text-[#8A8478] mb-6 leading-relaxed">
              AI Agents, Automations and Growth Systems. We deploy intelligence into your business.
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
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#8A8478] hover:text-[#C9A96E] hover:border-[#C9A96E]/50 transition-all" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#8A8478] hover:text-[#C9A96E] hover:border-[#C9A96E]/50 transition-all" aria-label="TikTok">
                <TikTokIcon size={15} />
              </a>
              <a href={founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#8A8478] hover:text-[#4ADE80] hover:border-[#4ADE80]/50 transition-all" aria-label="WhatsApp">
                <MessageCircle size={15} />
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
              <li><a href="#founder" className="font-body text-[13px] text-[#8A8478] hover:text-[#C9A96E] transition-colors">Team</a></li>
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
          <p className="font-body text-xs text-[#5A5550]">
            {currentYear} AI Handle. All rights reserved.
          </p>
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
        </div>
      </div>
    </footer>
  );
}
