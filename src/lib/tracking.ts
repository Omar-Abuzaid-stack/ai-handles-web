// AI Handle — Visitor Tracking & Event System
// Assigns persistent anonymous visitor numbers and tracks meaningful events

const VISITOR_KEY = 'aihandle_visitor_id';
const EVENT_QUEUE_KEY = 'aihandle_event_queue';
const QUEUE_FLUSH_INTERVAL = 30000; // 30 seconds

// ─── Visitor Number ───
function generateVisitorId(): string {
  const num = Math.floor(100000 + Math.random() * 900000); // 6 digits
  return `AH-${num}`;
}

export function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = generateVisitorId();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return 'AH-000000';
  }
}

// ─── Event Types ───
export type TrackingEvent =
  | 'page_view'
  | 'cta_click'
  | 'video_play'
  | 'team_profile_opened'
  | 'project_opened'
  | 'chatbot_message'
  | 'chatbot_opened'
  | 'contact_form_submission'
  | 'human_escalation'
  | 'theme_toggle'
  | 'error';

interface TrackedEvent {
  event: TrackingEvent;
  data: Record<string, string>;
  timestamp: string;
  visitorId: string;
  page: string;
  referrer: string;
}

// ─── Event Tracking ───
function getTrafficSource(): string {
  try {
    const ref = document.referrer;
    if (!ref) return 'direct';
    if (ref.includes('google')) return 'google';
    if (ref.includes('facebook') || ref.includes('fb.com')) return 'facebook';
    if (ref.includes('instagram')) return 'instagram';
    if (ref.includes('tiktok')) return 'tiktok';
    if (ref.includes('linkedin')) return 'linkedin';
    if (ref.includes('twitter') || ref.includes('x.com')) return 'twitter';
    if (ref.includes('wa.me') || ref.includes('whatsapp')) return 'whatsapp';
    return 'referral';
  } catch {
    return 'unknown';
  }
}

export function trackEvent(event: TrackingEvent, data: Record<string, string> = {}) {
  try {
    const tracked: TrackedEvent = {
      event,
      data,
      timestamp: new Date().toISOString(),
      visitorId: getVisitorId(),
      page: window.location.pathname,
      referrer: getTrafficSource(),
    };

    // Queue the event
    const queue = getEventQueue();
    queue.push(tracked);
    localStorage.setItem(EVENT_QUEUE_KEY, JSON.stringify(queue));

    // Flush immediately for important events
    if (['contact_form_submission', 'human_escalation', 'error'].includes(event)) {
      flushEvents();
    }
  } catch {
    // Silent fail — tracking should never break the site
  }
}

function getEventQueue(): TrackedEvent[] {
  try {
    const raw = localStorage.getItem(EVENT_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function flushEvents() {
  try {
    const queue = getEventQueue();
    if (queue.length === 0) return;

    // Send batch to API
    const response = await fetch('/api/track-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: queue }),
    });

    if (response.ok) {
      localStorage.removeItem(EVENT_QUEUE_KEY);
    }
  } catch {
    // Keep events in queue for next attempt
  }
}

// Auto-flush on interval
if (typeof window !== 'undefined') {
  setInterval(flushEvents, QUEUE_FLUSH_INTERVAL);

  // Flush on page unload
  window.addEventListener('beforeunload', () => {
    // Use sendBeacon for reliable delivery on page close
    const queue = getEventQueue();
    if (queue.length > 0) {
      const blob = new Blob([JSON.stringify({ events: queue })], { type: 'application/json' });
      navigator.sendBeacon('/api/track-event', blob);
      localStorage.removeItem(EVENT_QUEUE_KEY);
    }
  });
}

// ─── Convenience Trackers ───
export const tracker = {
  pageView: (page: string) => trackEvent('page_view', { page }),
  ctaClick: (label: string, destination: string) => trackEvent('cta_click', { label, destination }),
  videoPlay: (title: string) => trackEvent('video_play', { title }),
  teamProfile: (name: string, slug: string) => trackEvent('team_profile_opened', { name, slug }),
  projectView: (title: string) => trackEvent('project_opened', { title }),
  chatbotOpen: () => trackEvent('chatbot_opened', {}),
  chatbotMessage: (text: string) => trackEvent('chatbot_message', { message: text.substring(0, 100) }),
  contactForm: (name: string, email: string) => trackEvent('contact_form_submission', { name, email }),
  humanEscalation: (reason: string) => trackEvent('human_escalation', { reason }),
  themeToggle: (mode: string) => trackEvent('theme_toggle', { mode }),
  error: (message: string) => trackEvent('error', { message: message.substring(0, 200) }),
};
