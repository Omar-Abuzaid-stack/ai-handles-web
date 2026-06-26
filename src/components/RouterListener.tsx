import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';
import { tracker } from '@/lib/tracking';

export default function RouterListener() {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Only scroll to top if it's a new navigation (not back/forward) and there's no hash
    if (navType !== "POP" && !location.hash) {
      window.scrollTo(0, 0);
    }
    
    // Handle hash scrolling
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    // Track page view
    tracker.pageView(location.pathname + location.search);
  }, [location.pathname, location.search, location.hash, navType]);

  return null;
}
