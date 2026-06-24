import type { VercelRequest, VercelResponse } from '@vercel/node';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

// Simple in-memory dedup — prevents identical events within 5s
const recentEvents = new Map<string, number>();
const DEDUP_WINDOW_MS = 5000;

function dedupKey(evt: Record<string, unknown>): string {
  return `${evt.event}-${evt.page}-${evt.visitorId}`;
}

function isDuplicate(key: string): boolean {
  const now = Date.now();
  const last = recentEvents.get(key);
  if (last && now - last < DEDUP_WINDOW_MS) return true;
  recentEvents.set(key, now);
  // Clean old entries
  if (recentEvents.size > 500) {
    for (const [k, v] of recentEvents) {
      if (now - v > DEDUP_WINDOW_MS * 2) recentEvents.delete(k);
    }
  }
  return false;
}

// Only send meaningful events to Telegram — skip minor ones
const IMPORTANT_EVENTS = new Set([
  'page_view',
  'cta_click',
  'video_play',
  'team_profile_opened',
  'contact_form_submission',
  'human_escalation',
  'chatbot_message',
  'chatbot_opened',
  'error',
]);

// Page view counter (in-memory, resets on cold start — acceptable for serverless)
const pageViews = new Map<string, { count: number; visitors: Set<string> }>();

function recordPageView(page: string, visitorId: string) {
  const entry = pageViews.get(page) || { count: 0, visitors: new Set() };
  entry.count++;
  entry.visitors.add(visitorId);
  pageViews.set(page, entry);
}

function formatEventMessage(events: Array<Record<string, unknown>>): string {
  if (events.length === 0) return '';

  // If single event, format nicely
  if (events.length === 1) {
    const evt = events[0];
    const lines: string[] = [];
    
    const eventLabels: Record<string, string> = {
      page_view: '📄 Page View',
      cta_click: '🎯 CTA Click',
      video_play: '🎬 Video Play',
      team_profile_opened: '👤 Team Profile',
      project_opened: '📂 Project View',
      chatbot_opened: '💬 Chat Opened',
      chatbot_message: '💬 Chat Message',
      contact_form_submission: '📩 Contact Form',
      human_escalation: '🚨 Human Escalation',
      theme_toggle: '🎨 Theme Toggle',
      error: '⚠️ Error',
    };

    lines.push(eventLabels[evt.event as string] || `🔔 ${evt.event}`);
    lines.push('');

    if (evt.visitorId) lines.push(`*Visitor:* ${evt.visitorId}`);
    if (evt.page) lines.push(`*Page:* ${evt.page}`);
    if (evt.referrer) lines.push(`*Source:* ${evt.referrer}`);

    // Event-specific details
    const data = evt.data as Record<string, string> | undefined;
    if (data) {
      if (data.label) lines.push(`*Button:* ${data.label}`);
      if (data.destination) lines.push(`*Destination:* ${data.destination}`);
      if (data.title) lines.push(`*Title:* ${data.title}`);
      if (data.name) lines.push(`*Name:* ${data.name}`);
      if (data.email) lines.push(`*Email:* ${data.email}`);
      if (data.message) lines.push(`*Message:* ${data.message}`);
      if (data.reason) lines.push(`*Reason:* ${data.reason}`);
      if (data.mode) lines.push(`*Mode:* ${data.mode}`);
    }

    lines.push('');
    lines.push(`🕐 ${new Date(evt.timestamp as string).toLocaleString('en-GB', { timeZone: 'Asia/Dubai' })}`);

    return lines.join('\n');
  }

  // Multiple events — batch summary
  const summary: Record<string, number> = {};
  const visitors = new Set<string>();
  events.forEach((e) => {
    summary[e.event as string] = (summary[e.event as string] || 0) + 1;
    if (e.visitorId) visitors.add(e.visitorId as string);
  });

  const lines = [`*📊 Event Batch (${events.length} events)*`, ''];
  for (const [event, count] of Object.entries(summary)) {
    lines.push(`• ${event}: ${count}`);
  }
  lines.push('');
  lines.push(`*Unique visitors:* ${visitors.size}`);
  lines.push(`🕐 ${new Date().toLocaleString('en-GB', { timeZone: 'Asia/Dubai' })}`);

  return lines.join('\n');
}

async function sendToTelegram(message: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Handle sendBeacon which sends as blob — try to parse
    let events: Array<Record<string, unknown>>;
    
    if (typeof req.body === 'string') {
      try {
        const parsed = JSON.parse(req.body);
        events = parsed.events || [];
      } catch {
        events = [];
      }
    } else {
      events = req.body?.events || [];
    }

    if (!Array.isArray(events) || events.length === 0) {
      return res.status(200).json({ received: 0 });
    }

    // Limit batch size
    const batch = events.slice(0, 50);

    // Track page views for daily summary
    batch.forEach((evt) => {
      if (evt.event === 'page_view' && evt.page && evt.visitorId) {
        recordPageView(evt.page as string, evt.visitorId as string);
      }
    });

    // Filter to important events only, deduplicate
    const importantEvents = batch.filter((evt) => {
      if (!IMPORTANT_EVENTS.has(evt.event as string)) return false;
      return !isDuplicate(dedupKey(evt));
    });

    // Send to Telegram (rate limit: max 1 message per batch)
    if (importantEvents.length > 0) {
      const message = formatEventMessage(importantEvents);
      if (message) {
        // Don't await — fire and forget for speed
        sendToTelegram(message).catch(() => {});
      }
    }

    return res.status(200).json({
      received: batch.length,
      important: importantEvents.length,
      sent: importantEvents.length > 0,
    });
  } catch (error) {
    console.error('Track event error:', error);
    return res.status(200).json({ received: 0, error: 'Internal error' });
  }
}
