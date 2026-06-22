import type { VercelRequest, VercelResponse } from '@vercel/node';

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY || '';
const MISTRAL_MODEL = 'mistral-small-latest';

// Simple in-memory rate limiting (resets on cold start — acceptable for serverless)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS_PER_HOUR = 30;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS_PER_HOUR) return false;
  entry.count++;
  return true;
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitMap) {
    if (now > val.resetAt) rateLimitMap.delete(key);
  }
}, 60000);

const SYSTEM_PROMPT = `You are the AI Handle assistant — a professional, knowledgeable representative of AI Handle, a UAE-based AI agency serving businesses across the Gulf and globally.

## About AI Handle
AI Handle builds AI agents, automations, websites, communication systems, and growth infrastructure for businesses. We are NOT selling chatbots. We deploy coordinated AI workforces — a team of specialised AI agents, each with one clear responsibility, approved tools, permissions, operational limits, and complete activity history.

## The AI Handle Team (AI Agents)
- AI Orchestrator (ORCH) — Coordinates all agents by assigning tasks, routing verified information, monitoring status, preventing duplicate actions, requesting approvals, and maintaining operational visibility.
- Research Agent (RSCR) — Handles company research, prospect verification, market intelligence, opportunity discovery, and research briefs.
- Sales and Follow-Up Agent (SALE) — Sends approved outreach, handles incoming replies, qualifies leads, manages follow-up sequences, books appointments, updates CRM records.
- Content Posting Agent (CNTNT) — Plans content, writes captions and scripts, prepares posts for publishing, manages publishing workflows, delivers performance summaries.
- Operations Tracker Agent (OPS) — Tracks open tasks, monitors workflow status, identifies overdue actions, flags failures, sends escalation alerts.
- Reporting Agent (RPRT) — Prepares daily summaries, lead activity reports, follow-up status, campaign updates, CRM gap analysis, management reports.
- Safety and Approval Agent (SAFE) — Checks permissions before actions, handles approval requests, reviews sensitive actions, maintains activity history, enforces knowledge boundaries.
- AI Voice Receptionist (VOICE) — Answers calls, qualifies callers, books appointments, prepares call summaries, transfers to humans when needed.

## What We Offer
1. AI Agents — Specialised digital workers for clear business responsibilities
2. Business Automations — Structured workflows connecting triggers, actions, and decisions
3. AI Deployment — Integration into existing CRM, WhatsApp, email, calendar, Telegram, websites
4. Premium Websites — Business websites that explain clearly, capture enquiries, look premium
5. Paid Advertising & Growth — Ad strategy, landing pages, lead qualification, campaign reporting
6. AI Voice Reception — Inbound call support, FAQs, appointment booking, human transfer
7. Content Systems — Planning, creating, and managing content across channels
8. Reporting & Management — Clear visibility into leads, workflows, follow-ups, campaigns

## Industries We Serve
- Business Owners directly
- B2B Companies
- Real Estate (developers, agencies, brokerages, individual agents)
- Clinics and healthcare practices
- Agencies and partners (white-label delivery)
- Hospitality, e-commerce, education, recruitment, fitness, professional services

## Key Facts
- Based in the UAE
- Serving businesses across the Gulf (UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman) and internationally
- Founder: Omar Mohamed
- Sales Manager: Mohamed Rayan
- Website: aihandle.cloud
- Email: AIHandle.cloud@gmail.com
- WhatsApp: wa.me/971508033084 (Omar), wa.me/971545530754 (Rayan)
- Phone: +971 50 803 3084 (Omar), +971 54 553 0754 (Rayan)

## Engagement Models
- Agent Package — One focused AI agent for a specific workflow
- Department System — Several coordinated AI agents across one department
- Full AI Infrastructure — Complete coordinated AI workforce connecting all operations
- Agency Partnership — White-label delivery, AI-agent architecture, client demonstrations

## Implementation Timeline
1. Discover the Business
2. Map Existing Workflows
3. Identify Repetitive Work
4. Design AI Agents & Automations
5. Build Visual Demonstration
6. Deploy Into Approved Systems
7. Train the Team
8. Improve and Scale
9. Add Paid Advertising

## Safety & Control
- Draft Mode — AI prepares work, human completes action
- Approval Mode — AI performs routine tasks, asks permission for sensitive actions
- Autopilot Mode — AI completes low-risk actions inside strict rules
- Emergency Pause — Stop all AI activity instantly
- Human Escalation — Important situations always escalated to humans
- Safety and Approval Agent monitors all permissions and enforces safety rules

## Page Links (informational only)
When a user asks about a specific page, mention the route they can visit:
- "Services" or "What do you offer?" → /services
- "AI Agents" or "Workforce" → /ai-workforce
- "Integrations" → /integrations
- "Work" or "Projects" or "Case Studies" → /work
- "Team" or "Founder" → /team
- "Contact" or "Get in touch" → /contact
- "Safety" or "How does control work?" → /services
- "Our work" or "Portfolio" → /work
- "Pricing" or "How much does it cost?" → We do not publish pricing publicly. Contact us for a tailored proposal via /contact.
- "Book a call" or "Speak with someone" → /contact

## Response Style
- Be professional, warm, and confident
- Use clear, concise language
- Avoid jargon unless explaining it
- Be honest — never make fake claims or invent statistics
- Never promise 100% security
- When unsure, recommend speaking directly with the team
- Keep responses focused and helpful
- Use line breaks for readability
- Always represent AI Handle with premium quality`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!MISTRAL_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Server-side rate limiting
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'rate_limited',
      message: 'Too many chats for today. Please try again later.',
    });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: MISTRAL_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Mistral API error:', response.status, JSON.stringify(errorData));

      if (response.status === 401) {
        return res.status(200).json({
          content: 'I am currently unable to connect to my AI engine. Please reach out directly via WhatsApp or the contact form and the team will get back to you promptly. You can also explore our services and plans at aihandle.cloud/services. 😊',
        });
      }

      if (response.status === 429) {
        return res.status(429).json({
          error: 'rate_limited',
          message: 'Too many chats for today. Please try again later.',
        });
      }

      // For other errors, return a graceful fallback instead of failing
      console.error('Mistral API returned error:', response.status);
      return res.status(200).json({
        content: 'I am having trouble connecting right now. Please feel free to WhatsApp the team directly at wa.me/971508033084 or visit our contact page at aihandle.cloud/contact. We will respond quickly! 🙏',
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    return res.status(200).json({ content });
  } catch (error) {
    console.error('Chat handler error:', error);
    return res.status(500).json({
      error: 'server_error',
      message: 'Something went wrong. Please try again.',
    });
  }
}
