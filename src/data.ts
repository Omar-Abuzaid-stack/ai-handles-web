// AI Handle — Central Data Store
// All content is editable here. Update this file to change site-wide content.

// ─── Contact & Brand Info ───
export const brand = {
  name: 'AI Handle',
  tagline: 'AI Agents, Automations and Growth Systems.',
  mainMessage: 'We deploy intelligence into your business.',
  supportingMessage: 'AI Handle builds coordinated AI agents and automations that communicate, research, organise, follow up, create content, manage systems, and support business growth.',
  headline: 'Your Business, Operated by Intelligence.',
  positioning: 'A UAE-based global AI agency deploying AI agents, automations, websites, communication systems, and growth infrastructure into businesses.',
  supportingMessage2: 'Based in the UAE. Working with businesses globally.',
  domain: 'aihandle.cloud',
  founder: {
    name: 'Omar Mohamed',
    title: 'Founder of AI Handle',
    phone: '+971 50 803 3084',
    phoneRaw: '+971508033084',
    email: 'AIHandle.cloud@gmail.com',
    whatsappUrl: 'https://wa.me/971508033084',
    description: 'Omar Mohamed founded AI Handle to help businesses move beyond disconnected software and deploy coordinated AI systems directly into their real operations. His focus is building practical AI agents, automations, websites, lead-generation systems, and growth infrastructure that help teams operate more efficiently and scale.',
    imageAlt: 'Omar Mohamed — Founder of AI Handle',
  },
  salesManager: {
    name: 'Sales Manager',
    title: 'Sales Manager at AI Handle',
    phone: '+971 54 553 0754',
    phoneRaw: '+971545530754',
    email: 'mrayhan2005m@gmail.com',
    whatsappUrl: 'https://wa.me/971545530754',
    imageAlt: 'AI Handle Sales Manager',
  },
  qr: {
    founderDestination: 'https://wa.me/971508033084',
    founderTitle: 'Scan to Speak With Omar',
    founderSupporting: 'Scan the QR code to start a WhatsApp conversation with Omar Mohamed, Founder of AI Handle.',
    salesDestination: 'https://wa.me/971545530754',
    salesTitle: 'Scan to Speak With Sales',
    salesSupporting: 'Scan the QR code to start a WhatsApp conversation with our Sales Manager.',
  },
};

// ─── Robot Agents Data ───
export interface Robot {
  id: string;
  name: string;
  acronym: string;
  title: string;
  department: string;
  floor: string;
  image: string;
  tagline: string;
  description: string;
  responsibilities: string[];
  humanEscalation: string;
  modes?: { name: string; description: string }[];
  pillars?: { name: string; description: string }[];
  notes?: string[];
  workflow?: string[];
}

export const robots: Robot[] = [
  {
    id: 'orion',
    name: 'ORION',
    acronym: 'ORION',
    title: 'AI Orchestrator',
    department: 'CENTRAL COMMAND',
    floor: 'CORE',
    image: '/images/robots/orion.jpg',
    tagline: 'One central intelligence coordinating the entire digital workforce.',
    description: 'ORION monitors all departments, assigns tasks, prevents duplication, and ensures every agent operates in harmony. When situations require human judgment, ORION escalates immediately.',
    responsibilities: [
      'Assigns tasks to other agents',
      'Monitors agent activity across all departments',
      'Tracks unfinished work and deadlines',
      'Prevents duplicated actions',
      'Routes information between agents',
      'Manages approval requests',
      'Escalates important situations to humans',
      'Pauses selected workflows when needed',
      'Prepares management summaries',
      'Maintains complete activity history',
    ],
    humanEscalation: 'Major decisions, sensitive actions, and exceptions are escalated to authorized humans.',
  },
  {
    id: 'wasp',
    name: 'W.A.S.P',
    acronym: 'WASP',
    title: 'WhatsApp Sales Professional',
    department: 'SALES & COMMUNICATION',
    floor: 'FLOOR 1',
    image: '/images/robots/wasp.jpg',
    tagline: 'Qualify leads through WhatsApp before your competitors respond.',
    description: 'W.A.S.P handles inbound enquiries through WhatsApp, qualifying prospects, sharing information, and booking consultations — all with controlled pacing and human oversight.',
    responsibilities: [
      'Replies to inbound enquiries',
      'Asks qualification questions',
      'Identifies budget, location, and preferences',
      'Shares approved project information',
      'Prepares brochure and floor-plan delivery',
      'Identifies high-intent prospects',
      'Books consultations for human team members',
      'Prepares follow-up sequences',
      'Flags urgent conversations',
      'Updates CRM information',
      'Uses controlled messaging pace',
    ],
    humanEscalation: 'High-value conversations, complex negotiations, and sensitive client situations.',
    modes: [
      { name: 'Draft Mode', description: 'Robot prepares message, human sends' },
      { name: 'Approval Mode', description: 'Robot requests approval before sending' },
      { name: 'Autopilot Mode', description: 'Robot handles low-risk communication per rules' },
    ],
  },
  {
    id: 'crux',
    name: 'CRUX',
    acronym: 'CRUX',
    title: 'CRM Operations Specialist',
    department: 'CRM & LEAD OPERATIONS',
    floor: 'FLOOR 2',
    image: '/images/robots/crux.jpg',
    tagline: 'Cleaner data, better visibility, fewer forgotten opportunities.',
    description: 'CRUX transforms chaotic lead data into a clean, organized CRM. Every record is updated, duplicates are detected, and no opportunity slips through the cracks.',
    responsibilities: [
      'Creates lead records from all sources',
      'Updates lead stages automatically',
      'Adds notes and communication history',
      'Assigns leads to appropriate team members',
      'Detects and flags duplicate records',
      'Identifies missing information',
      'Highlights overdue follow-ups',
      'Tracks lead sources',
      'Identifies inactive opportunities',
      'Prepares pipeline summaries',
    ],
    humanEscalation: 'Record deletion, bulk changes, and sensitive data modifications.',
  },
  {
    id: 'spectra',
    name: 'SPECTRA',
    acronym: 'SPECTRA',
    title: 'Lead Research Analyst',
    department: 'RESEARCH & OUTREACH',
    floor: 'FLOOR 3',
    image: '/images/robots/spectra.jpg',
    tagline: 'Structured research without forcing the team to spend hours searching.',
    description: 'SPECTRA researches prospects, partners, and market opportunities — organising findings into actionable lists for your sales team.',
    responsibilities: [
      'Researches brokers and agents',
      'Researches potential investors',
      'Researches potential partners',
      'Researches companies and decision-makers',
      'Organises prospects by priority',
      'Categorises leads by type and intent',
      'Prepares structured prospect lists',
      'Creates company summaries',
      'Researches competitor positioning',
      'Prepares outreach briefs',
      'Monitors approved market opportunities',
    ],
    humanEscalation: 'Data verification for high-value prospects, competitive intelligence decisions.',
  },
  {
    id: 'echo',
    name: 'ECHO',
    acronym: 'ECHO',
    title: 'Email Outreach Specialist',
    department: 'PROFESSIONAL COMMUNICATION',
    floor: 'FLOOR 3',
    image: '/images/robots/echo.jpg',
    tagline: 'More organised outreach with professional pacing and clear follow-up control.',
    description: 'ECHO prepares personalised business emails, monitors replies, and manages follow-up sequences — ensuring no prospect falls through the cracks.',
    responsibilities: [
      'Reviews prospect research before outreach',
      'Prepares personalised introductions',
      'Drafts professional outreach emails',
      'Schedules controlled follow-ups',
      'Stops follow-ups after a reply',
      'Classifies response types',
      'Escalates positive replies to sales',
      'Updates CRM with communication history',
      'Prepares outreach activity reports',
    ],
    humanEscalation: 'High-value prospect communications, sensitive business proposals.',
    workflow: ['Prospect researched', 'Personalised email', 'Human approval', 'Follow-up scheduled', 'Reply detected', 'CRM updated'],
  },
  {
    id: 'muse',
    name: 'MUSE',
    acronym: 'MUSE',
    title: 'Content Creation Director',
    department: 'CONTENT STUDIO',
    floor: 'FLOOR 4',
    image: '/images/robots/muse.jpg',
    tagline: 'More consistent content without starting from zero every day.',
    description: 'MUSE plans, creates, and schedules content — from property posts to video scripts to area guides — maintaining a consistent brand presence.',
    responsibilities: [
      'Creates monthly content plans',
      'Generates post ideas',
      'Writes captions and descriptions',
      'Prepares video scripts',
      'Develops campaign concepts',
      'Creates area and community guides',
      'Plans personal-branding content',
      'Manages content calendars',
      'Maintains approval queues',
      'Plans launch campaigns',
      'Repurposes long-form to short-form content',
    ],
    humanEscalation: 'Final brand approval, controversial topics, high-stakes campaign decisions.',
  },
  {
    id: 'vista',
    name: 'VISTA',
    acronym: 'VISTA',
    title: 'Digital Visibility Specialist',
    department: 'DIGITAL OPERATIONS',
    floor: 'FLOOR 4',
    image: '/images/robots/vista.jpg',
    tagline: 'A stronger and more organised digital presence.',
    description: 'VISTA manages your website structure, search visibility, and content discoverability across traditional search, AI answer engines, and generative AI systems.',
    responsibilities: [
      'Prepares property and service pages',
      'Updates approved project information',
      'Creates FAQ content',
      'Prepares metadata and schema markup',
      'Creates location and area guides',
      'Improves internal linking structure',
      'Identifies outdated pages',
      'Prepares Google Business content',
      'Improves overall website structure',
      'Creates visibility reports',
    ],
    humanEscalation: 'Major website changes, brand-sensitive content updates.',
    pillars: [
      { name: 'SEO', description: 'Helps pages appear in traditional search engines' },
      { name: 'AEO', description: 'Helps content answer direct questions clearly' },
      { name: 'GEO', description: 'Helps business become discoverable in generative AI search' },
    ],
  },
  {
    id: 'vox',
    name: 'VOX',
    acronym: 'VOX',
    title: 'AI Voice Receptionist',
    department: 'PREMIUM LOBBY RECEPTION',
    floor: 'LOBBY',
    image: '/images/robots/vox.jpg',
    tagline: 'Professional first-line support outside normal office hours.',
    description: 'VOX answers incoming calls, greets callers, collects information, and qualifies enquiries — providing professional support when your human team is unavailable.',
    responsibilities: [
      'Answers incoming calls professionally',
      'Greets callers warmly',
      'Answers approved common questions',
      'Collects contact information',
      'Identifies buyer requirements',
      'Qualifies enquiries',
      'Books consultations',
      'Transfers urgent calls to humans',
      'Prepares call summaries',
      'Supports configured languages',
    ],
    humanEscalation: 'Complex inquiries, complaints, legal matters, high-value client calls.',
    notes: [
      'Voice usage is pay-as-you-go. Billing depends on call usage or minutes.',
      'Voice cloning requires explicit written permission.',
      'Not automatically unlimited — usage is monitored and controlled.',
    ],
  },
  {
    id: 'lumen',
    name: 'LUMEN',
    acronym: 'LUMEN',
    title: 'Management Reporting Analyst',
    department: 'EXECUTIVE ANALYTICS',
    floor: 'FLOOR 6',
    image: '/images/robots/lumen.jpg',
    tagline: 'Management receives organised information without chasing every department.',
    description: 'LUMEN compiles data from all agents into clear, actionable reports — delivered automatically so management always knows what\'s happening.',
    responsibilities: [
      'Prepares daily lead summaries',
      'Creates weekly sales activity reports',
      'Generates monthly workflow reports',
      'Sends follow-up alerts',
      'Prepares pipeline summaries',
      'Warns about incomplete CRM records',
      'Summarizes campaign activity',
      'Reports on priority leads',
      'Tracks unfinished tasks',
      'Delivers management briefings',
    ],
    humanEscalation: 'Strategic decisions based on reports, anomaly investigation.',
  },
  {
    id: 'pulse',
    name: 'PULSE',
    acronym: 'PULSE',
    title: 'Telegram Command Interface',
    department: 'EXECUTIVE COMMAND',
    floor: 'FLOOR 6',
    image: '/images/robots/pulse.jpg',
    tagline: 'Control your entire AI workforce from a single command interface.',
    description: 'PULSE responds to natural language commands via Telegram, delivering reports, lead lists, and status updates on demand.',
    responsibilities: [
      'Responds to command phrases',
      'Delivers reports on demand',
      'Shows lead lists with details',
      'Sends follow-up priority alerts',
      'Provides daily summaries',
      'Shows unfinished tasks',
      'Creates content plans on request',
      'Handles lead handover commands',
      'Prepares CRM summaries',
    ],
    humanEscalation: 'Commands affecting multiple agents, system-wide changes.',
    notes: ['This is a frontend demonstration. Actual Telegram integration requires backend connection.'],
  },
  {
    id: 'flux',
    name: 'FLUX',
    acronym: 'FLUX',
    title: 'Automation Engineer',
    department: 'AUTOMATION CONTROL',
    floor: 'FLOOR 5',
    image: '/images/robots/flux.jpg',
    tagline: 'Connect every step. Remove every bottleneck.',
    description: 'FLUX designs, monitors, and manages automated workflows — connecting triggers, actions, and decisions into seamless processes.',
    responsibilities: [
      'Connects workflow steps across systems',
      'Watches for event triggers',
      'Moves information between platforms',
      'Starts predefined actions',
      'Schedules follow-up sequences',
      'Routes alerts to appropriate agents',
      'Updates interface states',
      'Tracks completed workflow stages',
      'Flags failed or incomplete steps',
      'Passes complex cases to AI agents or humans',
    ],
    humanEscalation: 'Workflow failures, new workflow design, cross-system integrations.',
  },
  {
    id: 'guardian',
    name: 'GUARDIAN',
    acronym: 'GUARDIAN',
    title: 'Safety and Approval Agent',
    department: 'SAFETY & COMPLIANCE',
    floor: 'FLOOR 7',
    image: '/images/robots/guardian.jpg',
    tagline: 'Ensuring every AI action stays within your business boundaries.',
    description: 'GUARDIAN monitors permissions, handles approval requests, and enforces safety rules across the entire workforce — ensuring humans always have the final word.',
    responsibilities: [
      'Monitors permission boundaries',
      'Handles approval requests',
      'Enforces message pacing rules',
      'Tracks restricted actions',
      'Manages activity logs',
      'Identifies unusual agent behavior',
      'Handles human escalation routing',
      'Manages emergency pause controls',
      'Reviews agent outputs against rules',
      'Maintains safety protocols',
    ],
    humanEscalation: 'Emergency system override, policy changes, legal compliance decisions.',
    modes: [
      { name: 'Audit Mode', description: 'Silently logs actions' },
      { name: 'Gatekeeper Mode', description: 'Requires human approval for sensitive actions' },
    ]
  },
];

// ─── Floor Directory Data ───
export interface Floor {
  id: string;
  floor: string;
  name: string;
  description: string;
  sectionLink: string;
  icon: string;
}

export const floors: Floor[] = [
  { id: 'lobby', floor: 'LOBBY', name: 'Understanding AI', description: 'Learn how AI agents work', sectionLink: '#ai-basics', icon: 'Info' },
  { id: 'f1', floor: 'FLOOR 1', name: 'Sales & Communication', description: 'WhatsApp sales and outreach', sectionLink: '#robot-wasp', icon: 'MessageSquare' },
  { id: 'f2', floor: 'FLOOR 2', name: 'CRM & Lead Operations', description: 'Data management and pipelines', sectionLink: '#robot-crux', icon: 'Database' },
  { id: 'f3', floor: 'FLOOR 3', name: 'Research & Outreach', description: 'Market intelligence and prospects', sectionLink: '#robot-spectra', icon: 'Search' },
  { id: 'f4', floor: 'FLOOR 4', name: 'Content & Website', description: 'SEO, content, and digital presence', sectionLink: '#robot-muse', icon: 'PenTool' },
  { id: 'f5', floor: 'FLOOR 5', name: 'Automation Control', description: 'Workflow engine and triggers', sectionLink: '#robot-flux', icon: 'Workflow' },
  { id: 'f6', floor: 'FLOOR 6', name: 'Reporting & Management', description: 'Analytics and management briefings', sectionLink: '#robot-lumen', icon: 'BarChart3' },
  { id: 'f7', floor: 'FLOOR 7', name: 'Human Approval & Safety', description: 'Controls and escalation', sectionLink: '#safety', icon: 'Shield' },
  { id: 'rooftop', floor: 'ROOFTOP', name: 'Build Your AI System', description: 'Start your journey', sectionLink: '#rooftop', icon: 'Building2' },
];

// ─── Benefits Data ───
export interface Benefit {
  title: string;
  icon: string;
  description: string;
}

export const benefits: Benefit[] = [
  { title: 'Faster Lead Response', icon: 'Zap', description: 'Respond to enquiries while they\'re still hot.' },
  { title: 'Fewer Forgotten Follow-ups', icon: 'Bell', description: 'Every follow-up scheduled, tracked, and completed.' },
  { title: 'Cleaner CRM Records', icon: 'Database', description: 'No more incomplete or duplicated lead data.' },
  { title: 'Better Sales Organisation', icon: 'Users', description: 'Clear priorities and organised workflows.' },
  { title: 'Less Repetitive Admin', icon: 'Repeat', description: 'Free your team from manual data entry.' },
  { title: 'More Consistent Content', icon: 'PenTool', description: 'Regular content without daily creative burnout.' },
  { title: 'Better Management Visibility', icon: 'Eye', description: 'See what\'s happening without chasing updates.' },
  { title: 'Faster Reporting', icon: 'BarChart3', description: 'Reports prepared automatically, not manually compiled.' },
  { title: 'Sales-Marketing Coordination', icon: 'Link', description: 'Connected workflows between teams.' },
  { title: 'Organised Communication', icon: 'MessageSquare', description: 'Controlled, professional client messaging.' },
  { title: 'After-Hours Support', icon: 'Clock', description: 'Professional first-line support outside office hours.' },
  { title: 'More Time for Humans', icon: 'Heart', description: 'Your team focuses on relationships and closing.' },
];

// ─── Timeline / Process Data ───
export interface TimelinePhase {
  step: string;
  title: string;
  icon: string;
  tasks: string[];
}

export const timeline: TimelinePhase[] = [
  {
    step: '01',
    title: 'Discover the Business',
    icon: 'Search',
    tasks: ['Understand business goals', 'Identify projects and services', 'Review current lead sources', 'Analyze sales process', 'Identify team requirements'],
  },
  {
    step: '02',
    title: 'Map Existing Workflows',
    icon: 'Map',
    tasks: ['Map current lead journey', 'Identify manual delays', 'Define approval requirements', 'Map data movement', 'Identify integration points'],
  },
  {
    step: '03',
    title: 'Identify Repetitive Work',
    icon: 'PenTool',
    tasks: ['Find lost opportunities', 'Identify repetitive processes', 'Quantify manual overhead', 'Prioritise automation candidates', 'Define success metrics'],
  },
  {
    step: '04',
    title: 'Design AI Agents & Automations',
    icon: 'Layout',
    tasks: ['Select AI agents', 'Design automation workflows', 'Plan custom interfaces', 'Define control rules', 'Plan reporting structure'],
  },
  {
    step: '05',
    title: 'Build Visual Demonstration',
    icon: 'Zap',
    tasks: ['Create visual prototype', 'Show frontend experience', 'Demonstrate agent roles', 'Simulate data movement', 'Review with stakeholders'],
  },
  {
    step: '06',
    title: 'Deploy Into Approved Systems',
    icon: 'Code',
    tasks: ['Connect live tools', 'Deploy AI agents', 'Setup automations', 'Configure safety controls', 'Train human managers'],
  },
  {
    step: '07',
    title: 'Train the Team',
    icon: 'Users',
    tasks: ['Onboard team members', 'Establish approval workflows', 'Set operating modes', 'Document procedures', 'Set escalation rules'],
  },
  {
    step: '08',
    title: 'Improve and Scale',
    icon: 'TrendingUp',
    tasks: ['Monitor performance', 'Review activity logs', 'Expand agent capabilities', 'Refine workflows', 'Update safety boundaries'],
  },
  {
    step: '09',
    title: 'Add Paid Advertising',
    icon: 'Rocket',
    tasks: ['Ad strategy', 'Landing pages', 'Campaign creative', 'Lead qualification pipeline', 'Campaign reporting'],
  },
];

// ─── Safety Controls Data ───
export interface SafetyControl {
  name: string;
  icon: string;
  status: 'Active' | 'Standby' | 'Ready';
}

export const safetyControls: SafetyControl[] = [
  { name: 'Draft Mode', icon: 'FileEdit', status: 'Active' },
  { name: 'Approval Mode', icon: 'ShieldCheck', status: 'Active' },
  { name: 'Autopilot Mode', icon: 'Zap', status: 'Standby' },
  { name: 'Emergency Pause', icon: 'Octagon', status: 'Ready' },
  { name: 'Pause Individual Agent', icon: 'UserX', status: 'Ready' },
  { name: 'Approved Knowledge Base', icon: 'BookOpen', status: 'Active' },
  { name: 'Human Escalation', icon: 'UserCheck', status: 'Active' },
  { name: 'Activity Logs', icon: 'ClipboardList', status: 'Active' },
  { name: 'Permission Boundaries', icon: 'Lock', status: 'Active' },
];

// ─── Daily Rhythm Data ───
export interface TimePhase {
  time: string;
  icon: string;
  label: string;
  tasks: string[];
}

export const dailyRhythm: TimePhase[] = [
  {
    time: '06:00 - 10:00',
    icon: 'Sunrise',
    label: 'Morning',
    tasks: ['Review new enquiries', 'Identify urgent leads', 'Check CRM gaps', 'Prepare priorities', 'Deliver management briefing'],
  },
  {
    time: '10:00 - 18:00',
    icon: 'Sun',
    label: 'Daytime',
    tasks: ['Support enquiries', 'Organise lead information', 'Prepare follow-ups', 'Coordinate meetings', 'Prepare content', 'Escalate opportunities'],
  },
  {
    time: '18:00 - 22:00',
    icon: 'Sunset',
    label: 'Evening',
    tasks: ['Summarise activity', 'Highlight missed opportunities', 'Report unfinished work', 'Prepare next-day priorities', 'Deliver management summary'],
  },
  {
    time: '22:00 - 06:00',
    icon: 'Moon',
    label: 'Night',
    tasks: ['Organise information', 'Prepare drafts', 'Analyse open tasks', 'Plan upcoming work', 'Avoid uncontrolled external communication'],
  },
];

// ─── Workflow Data for FLUX ───
export interface Workflow {
  name: string;
  steps: string[];
}

export const workflows: Workflow[] = [
  {
    name: 'New Lead Workflow',
    steps: ['Enquiry', 'Organise', 'CRM Record', 'Acknowledge', 'Alert Sales', 'Qualify', 'Follow-up', 'Report'],
  },
  {
    name: 'Inactive Lead Workflow',
    steps: ['No Response', 'Review', 'Follow-up', 'Approval', 'Message', 'Classify', 'Update CRM'],
  },
  {
    name: 'Project Launch Workflow',
    steps: ['Project Info', 'Website Content', 'FAQs', 'Content Calendar', 'Social Ideas', 'Email Campaign', 'Team Briefing'],
  },
  {
    name: 'Appointment Workflow',
    steps: ['Interest', 'Timing', 'Availability', 'Selection', 'Calendar', 'Notify', 'Reminder', 'CRM Update'],
  },
  {
    name: 'Daily Report Workflow',
    steps: ['Review', 'Count Leads', 'Detect Overdue', 'Identify Gaps', 'Highlight', 'Create Report', 'Notify'],
  },
];

// ─── Telegram Commands for PULSE ───
export interface TelegramCommand {
  command: string;
  result: string;
}

export const telegramCommands: TelegramCommand[] = [
  { command: 'Show today\'s new leads', result: 'Lead list with details' },
  { command: 'Which leads need follow-up?', result: 'Follow-up priority list' },
  { command: 'Prepare the daily report', result: 'Formatted daily summary' },
  { command: 'Pause outbound communication', result: 'Confirmation + status' },
  { command: 'Show unfinished tasks', result: 'Task list with owners' },
  { command: 'Create next week\'s content plan', result: 'Content calendar draft' },
  { command: 'Send this lead to sales manager', result: 'Confirmation + handover' },
  { command: 'Prepare the CRM summary', result: 'Pipeline overview' },
];

// ─── Service Levels ───
export interface ServiceLevel {
  name: string;
  description: string;
  example: string;
  highlighted?: boolean;
  badge?: string;
}

export const serviceLevels: ServiceLevel[] = [
  {
    name: 'Agent Package',
    description: 'One focused AI agent or automation for a specific workflow.',
    example: 'WhatsApp qualification agent or Lead capture automation',
  },
  {
    name: 'Department System',
    description: 'Several coordinated AI agents supporting connected activities across one department.',
    example: 'WhatsApp + CRM + Follow-up coordination',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Full AI Infrastructure',
    description: 'A complete coordinated AI workforce connecting all operations.',
    example: 'Full sales, CRM, content, reporting, and automation suite',
  },
];

// ─── Report Metrics for LUMEN ───
export const reportMetrics = [
  { label: 'New Leads Today', value: '12' },
  { label: 'Pending Follow-ups', value: '7' },
  { label: 'Active Workflows', value: '47' },
  { label: 'Pending Approvals', value: '3' },
];

// ─── Industries / Who We Work With ───
export interface Industry {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
}

export const industries: Industry[] = [
  {
    id: 'business-owners',
    title: 'Business Owners Directly',
    icon: 'Briefcase',
    description: 'We work directly with founders and owners who want AI deployed into their business operations.',
    details: [
      'AI strategy',
      'Workflow mapping',
      'AI-agent design',
      'Automation',
      'Websites',
      'CRM systems',
      'Lead generation',
      'Paid advertising',
      'Reporting',
      'Ongoing optimisation',
    ],
  },
  {
    id: 'b2b',
    title: 'B2B Companies',
    icon: 'Building2',
    description: 'We work with established companies that need AI systems across departments, teams, communication channels, or customer workflows.',
    details: [
      'Cross-department AI agents',
      'Sales automation',
      'CRM coordination',
      'Internal communication',
      'Reporting systems',
    ],
  },
  {
    id: 'real-estate',
    title: 'Real Estate Agencies & Developers',
    icon: 'Home',
    description: 'We support property developers, agencies, brokerages, off-plan sales teams, agents, broker networks, and real estate marketing teams.',
    details: [
      'Property developers',
      'Real estate agencies',
      'Brokerages',
      'Off-plan sales teams',
      'Broker networks',
      'Property-investment companies',
      'Real estate marketing teams',
    ],
  },
  {
    id: 'individual-agents',
    title: 'Individual Real Estate Agents',
    icon: 'User',
    description: 'We can build focused systems for individual agents, including personal-branding websites, lead capture, WhatsApp follow-up, appointment booking, content systems, and CRM organisation.',
    details: [
      'Personal-branding websites',
      'Lead capture',
      'WhatsApp follow-up',
      'Appointment booking',
      'Content systems',
      'Property campaign support',
      'CRM organisation',
      'Paid lead generation',
    ],
  },
  {
    id: 'clinics',
    title: 'Clinics',
    icon: 'Heart',
    description: 'We support suitable clinic workflows such as website enquiries, appointment requests, FAQs, patient follow-up, reminder workflows, AI reception, lead and enquiry organisation, content planning, reporting, and human escalation. We do not claim medical diagnosis or clinical decision-making.',
    details: [
      'Website enquiries',
      'Appointment requests',
      'Frequently asked questions',
      'Patient follow-up',
      'Reminder workflows',
      'AI reception',
      'Lead and enquiry organisation',
      'Content planning',
      'Reporting',
      'Human escalation',
    ],
  },
  {
    id: 'agencies',
    title: 'Agencies & Partners',
    icon: 'Handshake',
    description: 'We can partner with marketing agencies, website agencies, automation agencies, creative agencies, consultants, and technology providers.',
    details: [
      'White-label delivery',
      'AI-agent architecture',
      'Automation planning',
      'Frontend development',
      'Client demonstrations',
      'Proposal support',
      'Implementation assistance',
      'Ongoing technical support',
    ],
  },
  {
    id: 'other',
    title: 'Other Suitable Businesses',
    icon: 'Globe',
    description: 'We work with any responsible business model where AI can improve communication, operations, customer experience, lead handling, content, reporting, or repetitive workflows.',
    details: [
      'Restaurants & Hospitality',
      'E-commerce',
      'Education',
      'Professional services',
      'Home services',
      'Recruitment',
      'Automotive',
      'Fitness',
      'Legal administration',
      'Customer support',
      'Sales teams',
    ],
  },
];

// ─── Services Data ───
export interface Service {
  id: string;
  icon: string;
  title: string;
  label: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'ai-agents',
    icon: 'Bot',
    title: 'AI Agents',
    label: 'Reasoning Engine',
    description: 'Specialised digital workers designed for clear business responsibilities.',
    features: [
      'Reception Agent',
      'WhatsApp Agent',
      'Sales Agent',
      'CRM Agent',
      'Follow-Up Agent',
      'Research Agent',
      'Content Agent',
      'Reporting Agent',
      'Voice Agent',
      'AI Orchestrator',
    ],
  },
  {
    id: 'automations',
    icon: 'Workflow',
    title: 'Business Automations',
    label: 'Deterministic Logic',
    description: 'Structured workflows that move information, trigger actions, schedule follow-ups, update systems, and reduce repetitive work.',
    features: [
      'Lead qualification workflows',
      'Follow-up sequences',
      'CRM update automation',
      'Notification routing',
      'Data synchronisation',
      'Reporting pipelines',
    ],
  },
  {
    id: 'ai-deployment',
    icon: 'Cpu',
    title: 'AI Deployment',
    label: 'System Integration',
    description: 'AI Handle can deploy AI into existing systems including CRM, WhatsApp, email, website forms, calendar, Telegram, content tools, reporting platforms, internal systems, and custom APIs.',
    features: [
      'CRM integration',
      'WhatsApp API',
      'Email systems',
      'Website forms',
      'Calendar sync',
      'Telegram',
      'Content tools',
      'Reporting platforms',
      'Internal systems',
      'Custom APIs',
    ],
  },
  {
    id: 'websites',
    icon: 'Layout',
    title: 'Premium Websites',
    label: 'Frontend Experience',
    description: 'Build websites that explain the business clearly, capture enquiries, showcase services, present projects, support campaigns, and look premium on mobile and desktop.',
    features: [
      'Business explanation',
      'Enquiry capture',
      'Service showcase',
      'Project presentation',
      'Campaign support',
      'Future integration points',
      'Mobile & desktop premium',
    ],
  },
  {
    id: 'paid-growth',
    icon: 'TrendingUp',
    title: 'Paid Advertising & Growth',
    label: 'Demand Generation',
    description: 'Paid ads generate attention. AI Handle builds the infrastructure that captures, organises, qualifies, follows up, and helps convert that attention into business opportunities.',
    features: [
      'Paid-ad strategy',
      'Landing pages',
      'Campaign creative',
      'Lead forms',
      'Retargeting structure',
      'Lead qualification',
      'CRM connection',
      'Automated follow-up',
      'Appointment booking',
      'Campaign reporting',
      'Sales-team handover',
    ],
  },
  {
    id: 'voice',
    icon: 'Phone',
    title: 'AI Voice Reception',
    label: 'Voice Interface',
    description: 'Support inbound calls, FAQs, lead capture, appointments, summaries, and human transfer. Voice services may be usage-based.',
    features: [
      'Inbound call support',
      'FAQ handling',
      'Lead capture',
      'Appointment booking',
      'Call summaries',
      'Human transfer',
      'Multi-language support',
    ],
  },
  {
    id: 'content',
    icon: 'PenTool',
    title: 'Content Systems',
    label: 'Content Production',
    description: 'Plan, create, and manage content across channels with AI-assisted production and approval workflows.',
    features: [
      'Content planning',
      'Captions & scripts',
      'AI-assisted videos',
      'Social content',
      'Repurposing',
      'Campaign concepts',
      'Approval workflows',
      'Publishing preparation',
    ],
  },
  {
    id: 'reporting',
    icon: 'BarChart3',
    title: 'Reporting & Management',
    label: 'Business Intelligence',
    description: 'Clear visibility into leads, workflows, follow-ups, campaigns, and team performance — delivered automatically.',
    features: [
      'Lead summaries',
      'Workflow reports',
      'Follow-up alerts',
      'CRM gap detection',
      'Campaign updates',
      'Task status tracking',
      'Management dashboards',
    ],
  },
];

// ─── Engagement Models ───
export interface EngagementModel {
  title: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const engagementModels: EngagementModel[] = [
  {
    title: 'Direct Business Engagement',
    description: 'For business owners and companies that want a custom AI system built and deployed into their operations.',
    features: [
      'Custom AI architecture',
      'Workflow mapping',
      'Agent deployment',
      'CRM integration',
      'Ongoing support',
    ],
  },
  {
    title: 'Agent Package',
    description: 'For individual agents or professionals who need a smaller focused system.',
    features: [
      'Single agent deployment',
      'Specific workflow focus',
      'Quick implementation',
      'Essential integrations',
    ],
  },
  {
    title: 'Department System',
    description: 'For companies that need multiple AI agents and automations across one department.',
    features: [
      'Multiple coordinated agents',
      'Cross-system automation',
      'Department reporting',
      'Team training',
    ],
    highlighted: true,
  },
  {
    title: 'Full AI Infrastructure',
    description: 'For businesses that want coordinated AI across communication, sales, CRM, content, reporting, and growth.',
    features: [
      'Complete AI workforce',
      'All departments connected',
      'Full reporting suite',
      'Paid growth integration',
      'Ongoing optimisation',
    ],
  },
  {
    title: 'Agency Partnership',
    description: 'For agencies that need technical delivery, AI-agent architecture, automations, websites, or white-label support.',
    features: [
      'White-label delivery',
      'AI-agent architecture',
      'Technical implementation',
      'Client demonstrations',
      'Ongoing support',
    ],
  },
];

// ─── Client Showcase Projects ───
export interface Project {
  title: string;
  clientType: string;
  market: string;
  type: string;
  category: string;
  tags: string[];
  desc: string;
  mockupType: 'mobile' | 'desktop' | 'dashboard';
  challenge: string;
  solution: string;
}

export const projectCategories = [
  'All Work',
  'AI Agents',
  'Automations',
  'Websites',
  'Real Estate',
  'Clinics',
  'Paid Ads',
  'CRM',
  'Content',
  'Voice AI',
  'Reporting',
  'Full Infrastructure',
];

export const projects: Project[] = [
  {
    title: 'Off-Plan Sales Infrastructure',
    clientType: 'Real Estate Developer',
    market: 'UAE',
    type: 'Concept System',
    category: 'AI Agents',
    tags: ['ORION', 'WASP', 'CRUX'],
    desc: 'A complete AI workforce managing lead capture, WhatsApp qualification, and CRM entry for a luxury development launch.',
    mockupType: 'mobile',
    challenge: 'High volume of unqualified leads during launch phases resulting in slow response times.',
    solution: 'Deployed WASP to instantly engage leads on WhatsApp, qualify their budget, and push organized data to CRUX.',
  },
  {
    title: 'Premium AI Showcase Website',
    clientType: 'Boutique Agency',
    market: 'UK',
    type: 'Frontend Experience',
    category: 'Websites',
    tags: ['VISTA', 'MUSE'],
    desc: 'High-performance website with integrated AI assistance, automated content preparation, and SEO infrastructure.',
    mockupType: 'desktop',
    challenge: 'Website was slow, visually outdated, and disconnected from the agency\'s operations.',
    solution: 'Built a new frontend architecture and connected VISTA to automatically generate and update content.',
  },
  {
    title: 'Agent Recruitment Automation',
    clientType: 'Brokerage Network',
    market: 'Global',
    type: 'Prototype',
    category: 'Automations',
    tags: ['SPECTRA', 'ECHO', 'FLUX'],
    desc: 'Automated research and outreach system for identifying and contacting top-performing brokers in new markets.',
    mockupType: 'dashboard',
    challenge: 'Scaling the brokerage required manual research of hundreds of profiles daily.',
    solution: 'SPECTRA identifies targets, ECHO crafts personalized outreach, and FLUX orchestrates the follow-up sequence.',
  },
  {
    title: 'Clinic Enquiry Management',
    clientType: 'Healthcare Practice',
    market: 'UAE',
    type: 'Demonstration',
    category: 'Clinics',
    tags: ['VOX', 'FLUX', 'CRUX'],
    desc: 'AI reception and enquiry management system for a multi-specialty clinic handling appointment requests and FAQs.',
    mockupType: 'mobile',
    challenge: 'Front desk overwhelmed with calls, missed enquiries during peak hours, and no systematic follow-up.',
    solution: 'Deployed VOX for after-hours reception, FLUX for appointment routing, and CRUX for enquiry tracking.',
  },
];
