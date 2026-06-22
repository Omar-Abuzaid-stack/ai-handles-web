import type { VercelRequest, VercelResponse } from '@vercel/node';

const JARVIS_API_TOKEN = process.env.JARVIS_API_TOKEN || '';
const PUBLIC_KNOWLEDGE_URL = 'https://aihandle.cloud/api/public-knowledge';

const KNOWLEDGE_PAYLOAD = {
  version: '1.0.0',
  updatedAt: new Date().toISOString(),
  source: 'AI Handle Website',
  knowledge: {
    brand: {
      name: 'AI Handle',
      tagline: 'AI Agents, Automations and Growth Systems.',
      domain: 'aihandle.cloud',
      website: 'https://aihandle.cloud',
      positioning: 'A UAE-based AI agency serving businesses across the Gulf and internationally.',
      founder: 'Omar Mohamed',
      salesManager: 'Mohamed Rayan',
      contact: {
        email: 'AIHandle.cloud@gmail.com',
        phone: '+971 50 803 3084',
        whatsapp: 'https://wa.me/971508033084',
        website: 'https://aihandle.cloud/contact',
      },
    },
    services: [
      { name: 'AI Agents', description: 'Specialised digital workers for clear business responsibilities.' },
      { name: 'Business Automations', description: 'Structured workflows connecting triggers, actions, and decisions.' },
      { name: 'AI Deployment', description: 'Integration into existing CRM, WhatsApp, email, and business tools.' },
      { name: 'Premium Websites', description: 'Business websites that explain clearly and capture enquiries.' },
      { name: 'Paid Advertising & Growth', description: 'Ad strategy, landing pages, lead qualification.' },
      { name: 'AI Voice Reception', description: 'Inbound call support, FAQs, appointment booking.' },
      { name: 'Content Systems', description: 'Planning, creating, and managing content across channels.' },
      { name: 'Reporting & Management', description: 'Clear visibility into leads, workflows, and campaigns.' },
    ],
    agents: [
      'Research Agent — Company research, prospect verification, market intelligence',
      'Sales and Follow-Up Agent — Outreach, replies, lead qualification, CRM updates',
      'Content Posting Agent — Content planning, captions, scripts, publishing',
      'Operations Tracker Agent — Task tracking, workflow status, escalation alerts',
      'Reporting Agent — Daily summaries, lead activity, campaign updates',
      'AI Orchestrator — Coordinates all agents, assigns tasks, prevents duplicates',
      'Safety and Approval Agent — Permissions, approvals, activity history',
      'AI Voice Receptionist — Calls, qualification, appointment booking',
    ],
    industries: [
      'Business Owners',
      'B2B Companies',
      'Real Estate (developers, agencies, brokerages)',
      'Clinics and Healthcare',
      'Agencies and Partners',
      'Hospitality, E-commerce, Education, Recruitment',
    ],
    integrations: [
      'Gmail', 'Google Calendar', 'Google Drive', 'WhatsApp', 'Telegram',
      'CRM Platforms', 'Websites', 'Databases', 'Cloud Storage',
      'LinkedIn', 'Instagram', 'Facebook', 'YouTube', 'TikTok',
      'Custom APIs', 'Internal Systems',
    ],
    pages: {
      homepage: 'https://aihandle.cloud/',
      services: 'https://aihandle.cloud/services',
      aiWorkforce: 'https://aihandle.cloud/ai-workforce',
      integrations: 'https://aihandle.cloud/integrations',
      work: 'https://aihandle.cloud/work',
      team: 'https://aihandle.cloud/team',
      contact: 'https://aihandle.cloud/contact',
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET — Return current knowledge version
  if (req.method === 'GET') {
    return res.status(200).json({
      service: 'AI Handle Knowledge Sync',
      version: KNOWLEDGE_PAYLOAD.version,
      updatedAt: KNOWLEDGE_PAYLOAD.updatedAt,
      knowledgeUrl: PUBLIC_KNOWLEDGE_URL,
      status: 'available',
    });
  }

  // POST — Sync knowledge (for Jarvis to pull)
  if (req.method === 'POST') {
    // Verify API token if configured
    const authHeader = req.headers.authorization;
    if (JARVIS_API_TOKEN) {
      if (!authHeader || authHeader !== `Bearer ${JARVIS_API_TOKEN}`) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    // Return full knowledge payload
    return res.status(200).json(KNOWLEDGE_PAYLOAD);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
