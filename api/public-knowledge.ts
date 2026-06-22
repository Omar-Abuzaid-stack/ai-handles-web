import type { VercelRequest, VercelResponse } from '@vercel/node';

const PUBLIC_KNOWLEDGE = {
  version: '1.0.0',
  updatedAt: new Date().toISOString(),
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
    { name: 'Research Agent', role: 'Handles company research, prospect verification, market intelligence, opportunity discovery, research briefs.' },
    { name: 'Sales and Follow-Up Agent', role: 'Handles approved outreach, replies, lead qualification, follow-up, CRM updates, human handover.' },
    { name: 'Content Posting Agent', role: 'Handles content planning, captions, scripts, posting, publishing workflows, performance summaries.' },
    { name: 'Operations Tracker Agent', role: 'Handles open tasks, workflow status, overdue actions, escalation alerts, operational reminders.' },
    { name: 'Reporting Agent', role: 'Handles daily summaries, lead activity, follow-up status, campaign updates, management reports.' },
    { name: 'AI Orchestrator', role: 'Coordinates all agents by assigning tasks, routing information, monitoring status, preventing duplicates.' },
    { name: 'Safety and Approval Agent', role: 'Handles permission checks, approval requests, activity history, pause controls, knowledge boundaries.' },
    { name: 'AI Voice Receptionist', role: 'Handles calls, qualification, appointment requests, summaries, human transfer.' },
  ],
  industries: [
    'Business Owners Directly',
    'B2B Companies',
    'Real Estate (developers, agencies, brokerages, agents)',
    'Clinics and Healthcare Practices',
    'Agencies and Partners',
    'Hospitality, E-commerce, Education, Recruitment, Fitness, Professional Services',
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
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json(PUBLIC_KNOWLEDGE);
}
