import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

const BANNER_KEY = 'aihandle_privacy_accepted';

export default function PrivacyBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(BANNER_KEY);
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(BANNER_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] p-4 md:p-6">
      <div className="max-w-4xl mx-auto liquid-glass rounded-2xl p-5 flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Shield size={18} className="text-purple flex-shrink-0" />
          <p className="text-xs text-white/50 leading-relaxed font-body">
            We respect your privacy. This site uses essential cookies to ensure functionality. No tracking, no third-party ads, no data selling. Your data stays private.
          </p>
        </div>
        <button
          onClick={accept}
          className="btn-primary text-xs py-2 px-5 flex-shrink-0"
        >
          Got It
        </button>
      </div>
    </div>
  );
}
