import type { VercelRequest, VercelResponse } from '@vercel/node';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

const BOT_TOKEN_CHECK = TELEGRAM_BOT_TOKEN ? `${TELEGRAM_BOT_TOKEN.slice(0, 10)}...${TELEGRAM_BOT_TOKEN.slice(-4)}` : 'Not configured';

type NotificationEvent = 'contact_submission' | 'qualified_lead' | 'project_enquiry' | 'chatbot_escalation' | 'content_published' | 'website_error' | 'operational_alert';

const EVENT_LABELS: Record<NotificationEvent, string> = {
  contact_submission: '📩 New Contact Submission',
  qualified_lead: '⭐ New Qualified Lead',
  project_enquiry: '🔧 New Project Enquiry',
  chatbot_escalation: '🤖 Chatbot Escalation',
  content_published: '📄 Content Published',
  website_error: '⚠️ Website Error',
  operational_alert: '🔔 Operational Alert',
};

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

  // Validate authorization
  const authHeader = req.headers.authorization;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceRoleKey && authHeader !== `Bearer ${serviceRoleKey}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return res.status(200).json({
      configured: false,
      message: 'Telegram not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.',
    });
  }

  try {
    const { event, data } = req.body as {
      event: NotificationEvent;
      data: Record<string, string>;
    };

    if (!event || !data) {
      return res.status(400).json({ error: 'Event type and data required' });
    }

    const label = EVENT_LABELS[event] || '🔔 Notification';

    // Build message
    const lines = [`${label}\n`];
    for (const [key, value] of Object.entries(data)) {
      const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      lines.push(`*${formattedKey}:* ${value}`);
    }
    lines.push(`\nAI Handle · ${new Date().toLocaleString('en-GB', { timeZone: 'Asia/Dubai' })}`);

    const message = lines.join('\n');

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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Telegram API error:', response.status, errorText);
      return res.status(500).json({
        configured: true,
        sent: false,
        error: `Telegram API error: ${response.status}`,
      });
    }

    return res.status(200).json({
      configured: true,
      sent: true,
      event,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Telegram notify error:', error);
    return res.status(500).json({
      configured: !!TELEGRAM_BOT_TOKEN,
      sent: false,
      error: 'Internal server error',
    });
  }
}
