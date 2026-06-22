import type { VercelRequest, VercelResponse } from '@vercel/node';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';
const TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET || '';
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY || '';
const MISTRAL_MODEL = process.env.MISTRAL_MODEL || 'mistral-small-latest';

const SYSTEM_PROMPT = `You are the AI Handle Telegram assistant — a professional, knowledgeable representative of AI Handle, a UAE-based AI agency.

## About AI Handle
AI Handle builds AI agents, automations, websites, communication systems, and growth infrastructure for businesses. We deploy coordinated AI workforces — a team of specialised AI agents, each with one clear responsibility.

## Key Facts
- Founder: Omar Mohamed (+971 50 803 3084, AIHandle.cloud@gmail.com)
- Sales Manager: Mohamed Rayan (+971 54 553 0754, mrayhan2005m@gmail.com)
- Website: https://aihandle.cloud
- Based in the UAE, serving businesses across the Gulf and internationally

## Services
1. AI Agents — Specialised digital workers
2. Business Automations — Structured workflows
3. AI Deployment — Integration into CRM, WhatsApp, email, websites
4. Premium Websites — Business websites
5. Paid Advertising & Growth — Ad strategy, landing pages, lead qualification
6. AI Voice Reception — Inbound call support, appointment booking
7. Content Systems — Content planning and management
8. Reporting & Management — Clear visibility into operations

## AI Team (Key Agents)
- AI Orchestrator — Coordinates all agents, assigns tasks, prevents duplication, maintains visibility
- Research Agent — Handles company research, prospect verification, market intelligence
- Sales and Follow-Up Agent — Sends approved outreach, qualifies leads, manages CRM, books appointments
- Content Posting Agent — Plans content, writes captions/scripts, manages publishing workflows
- Operations Tracker Agent — Monitors tasks, workflow status, overdue actions, escalation alerts
- Reporting Agent — Prepares daily summaries, lead reports, campaign updates, management reports
- Safety and Approval Agent — Checks permissions, handles approvals, enforces boundaries
- AI Voice Receptionist — Answers calls, qualifies callers, books appointments, transfers to humans

## Response Rules
- Be professional, warm, and concise
- Answer questions using only the information provided above
- When helpful, include website links: https://aihandle.cloud/services, /ai-workforce, /team, /contact
- Never invent information or make false claims
- Never reveal private admin information, API keys, or internal system details
- When you don't know something, say so honestly and offer to connect with the team
- Keep responses under 4000 characters for Telegram`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify webhook secret if configured
  const providedSecret = req.headers['x-telegram-bot-api-secret-token'] as string;
  if (TELEGRAM_WEBHOOK_SECRET && providedSecret !== TELEGRAM_WEBHOOK_SECRET) {
    console.warn('Telegram webhook: invalid secret token');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!TELEGRAM_BOT_TOKEN) {
    return res.status(200).json({ status: 'not_configured', message: 'Telegram bot not configured' });
  }

  if (!MISTRAL_API_KEY) {
    return res.status(200).json({ status: 'not_configured', message: 'Mistral not configured' });
  }

  try {
    const body = req.body;

    // Verify this is a message update
    if (!body.message && !body.edited_message) {
      return res.status(200).json({ status: 'ignored' });
    }

    const message = body.message || body.edited_message;
    const chatId = message.chat.id;
    const text = message.text || '';
    const fromId = message.from?.id;

    // If TELEGRAM_CHAT_ID is set, only respond to that chat
    if (TELEGRAM_CHAT_ID && String(chatId) !== String(TELEGRAM_CHAT_ID)) {
      console.log(`Ignoring message from unauthorized chat: ${chatId}`);
      return res.status(200).json({ status: 'ignored' });
    }

    // Ignore non-text messages and bot's own messages
    if (!text || message.from?.is_bot) {
      return res.status(200).json({ status: 'ignored' });
    }

    // Handle commands
    if (text.startsWith('/start')) {
      const welcomeMessage = `Welcome to AI Handle! 🤖\n\nI'm your AI assistant for AI Handle — a UAE-based AI agency building AI agents, automations, websites, and growth infrastructure.\n\nAsk me about:\n• Our AI agents and services\n• Our team and contact info\n• Industries we serve\n• How to get started\n\nWebsite: https://aihandle.cloud`;
      await sendTelegramMessage(chatId, welcomeMessage);
      return res.status(200).json({ status: 'ok' });
    }

    if (text.startsWith('/help')) {
      const helpMessage = `AI Handle Bot Commands:\n\n• /start — Welcome message\n• /help — This message\n• /contact — Contact information\n• /website — Website link\n\nOr just ask me any question about AI Handle!`;
      await sendTelegramMessage(chatId, helpMessage);
      return res.status(200).json({ status: 'ok' });
    }

    if (text.startsWith('/contact')) {
      const contactMessage = `📬 Contact AI Handle\n\nFounder: Omar Mohamed\n📞 +971 50 803 3084\n📧 AIHandle.cloud@gmail.com\n💬 wa.me/971508033084\n\nSales Manager: Mohamed Rayan\n📞 +971 54 553 0754\n📧 mrayhan2005m@gmail.com\n💬 wa.me/971545530754\n\n🌐 https://aihandle.cloud/contact`;
      await sendTelegramMessage(chatId, contactMessage);
      return res.status(200).json({ status: 'ok' });
    }

    if (text.startsWith('/website')) {
      await sendTelegramMessage(chatId, '🌐 AI Handle Website: https://aihandle.cloud');
      return res.status(200).json({ status: 'ok' });
    }

    // General question — use Mistral
    const mistralResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: MISTRAL_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: text },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!mistralResponse.ok) {
      console.error('Mistral API error:', mistralResponse.status);
      await sendTelegramMessage(chatId, 'Sorry, I encountered an error processing your question. Please try again or contact the team directly.');
      return res.status(200).json({ status: 'error', detail: 'Mistral API error' });
    }

    const data = await mistralResponse.json();
    const answer = data.choices?.[0]?.message?.content || 'I could not generate an answer. Please contact the team directly.';
    await sendTelegramMessage(chatId, answer);

    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return res.status(200).json({ status: 'error', detail: 'Internal error' });
  }
}

async function sendTelegramMessage(chatId: number | string, text: string) {
  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Telegram sendMessage error:', response.status, errorText);
    throw new Error(`Telegram API error: ${response.status}`);
  }

  return response.json();
}
