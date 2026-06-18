export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-[#0A0A0A] border-t border-[#2A2A2A]">
      <div className="content-max px-6 lg:px-10 py-16 text-center">
        {/* Logo */}
        <div className="mb-4">
          <span className="font-body font-semibold text-sm tracking-[0.12em] text-[#F5F0EB]">
            VANTILITY
          </span>
        </div>

        {/* Tagline */}
        <p className="font-body text-sm text-[#8A8478] mb-8">
          AI agents, automations, websites, and growth infrastructure for real estate.
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
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

        {/* Copyright */}
        <p className="font-body text-xs text-[#5A5550]">
          {currentYear} Vantility. All rights reserved.
        </p>

        {/* Frontend-only note */}
        <p className="font-mono text-[10px] text-[#3A3A3A] mt-4">
          Frontend demonstration. Backend integrations available on request.
        </p>
      </div>
    </footer>
  );
}
