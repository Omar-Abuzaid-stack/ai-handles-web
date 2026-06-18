import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Box, Cpu, FileJson } from 'lucide-react';

const integrations = [
  { name: 'Salesforce', type: 'CRM' },
  { name: 'HubSpot', type: 'CRM' },
  { name: 'WhatsApp API', type: 'Communication' },
  { name: 'Property Finder', type: 'Lead Source' },
  { name: 'Make.com', type: 'Automation' },
  { name: 'Telegram', type: 'Reporting' },
];

export default function Integrations() {
  const ref = useScrollAnimation();

  return (
    <section className="bg-[#0A0A0A] section-padding border-t border-[#2A2A2A]">
      <div ref={ref} className="content-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 animate-item uppercase">
              Integration Readiness
            </p>
            <h2 className="section-title text-[#F5F0EB] mb-6 animate-item">
              Ready to Connect
            </h2>
            <p className="font-body text-base text-[#8A8478] animate-item leading-relaxed mb-6">
              Vantility infrastructure is designed to integrate with your existing tech stack. We don't force you to abandon your tools; we make them smarter.
            </p>
            <div className="space-y-4 animate-item">
              <div className="flex items-start gap-3">
                <Box size={20} className="text-[#C9A96E] mt-1" />
                <div>
                  <h4 className="font-body font-semibold text-sm text-[#F5F0EB]">CRM & Lead Sources</h4>
                  <p className="font-body text-[13px] text-[#5A5550]">Direct API connections to popular real estate platforms.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Cpu size={20} className="text-[#C9A96E] mt-1" />
                <div>
                  <h4 className="font-body font-semibold text-sm text-[#F5F0EB]">Automation Hubs</h4>
                  <p className="font-body text-[13px] text-[#5A5550]">Seamless integration via Make, n8n, or Zapier.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileJson size={20} className="text-[#C9A96E] mt-1" />
                <div>
                  <h4 className="font-body font-semibold text-sm text-[#F5F0EB]">Custom Endpoints</h4>
                  <p className="font-body text-[13px] text-[#5A5550]">Support for custom webhooks and internal legacy systems.</p>
                </div>
              </div>
            </div>
            <p className="font-mono text-[10px] text-[#5A5550] mt-8 animate-item">
              * Note: The current website is a frontend showcase. Live integrations are scoped separately during onboarding.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 animate-item">
            {integrations.map((int, i) => (
              <div key={i} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6 text-center hover:border-[#C9A96E]/30 transition-colors">
                <p className="font-body font-semibold text-sm text-[#F5F0EB]">{int.name}</p>
                <p className="font-mono text-[10px] text-[#5A5550] mt-2 uppercase tracking-widest">{int.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
