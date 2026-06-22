// AI Handle — Central Data Store
// All content is editable here. Update this file to change site-wide content.

// ─── Contact & Brand Info ───
export const brand = {
  name: 'AI Handle',
  tagline: 'AI Agents, Automations and Growth Systems.',
  mainMessage: 'Deploy AI Into Your Business.',
  supportingMessage: 'AI Handle builds AI agents, automations, websites, communication systems, and growth infrastructure for businesses across the Gulf.',
  headline: 'Deploy AI Into Your Business.',
  positioning: 'A UAE-based AI agency serving businesses across the Gulf and internationally.',
  supportingMessage2: 'Based in the UAE. Supporting businesses across the Gulf.',
  domain: 'aihandle.cloud',
  founder: {
    name: 'Omar Mohamed',
    title: 'Founder of AI Handle',
    nationality: 'Egyptian',
    phone: '+971 50 803 3084',
    phoneRaw: '+971508033084',
    email: 'AIHandle.cloud@gmail.com',
    whatsappUrl: 'https://wa.me/971508033084',
    linkedinUrl: 'https://www.linkedin.com/in/omar-elgar7y-69a763208',
    description: 'Omar Mohamed founded AI Handle to help businesses move beyond disconnected software and deploy coordinated AI systems directly into their real operations. His focus is building practical AI agents, automations, websites, lead-generation systems, and growth infrastructure that help teams operate more efficiently and scale.',
    image: '/brand/omar-mohamed.png',
    imageAlt: 'Omar Mohamed — Founder of AI Handle',
  },
  salesManager: {
    name: 'Mohamed Rayan',
    title: 'Sales Manager at AI Handle',
    nationality: 'Emirati',
    phone: '+971 54 553 0754',
    phoneRaw: '+971545530754',
    email: 'mrayhan2005m@gmail.com',
    whatsappUrl: 'https://wa.me/971545530754',
    linkedinUrl: '',
    image: '/brand/mohamed-rayan.jpg',
    imageAlt: 'Mohamed Rayan — Sales Manager at AI Handle',
  },
  video: {
    src: '/videos/Deploying_Intelligence.mp4',
    title: 'Deploying Intelligence',
    description: 'See how AI Handle deploys coordinated AI agents, automations, and growth infrastructure into real businesses.',
  },
  social: {
    instagram: 'https://instagram.com/aihandle.cloud',
    tiktok: 'https://tiktok.com/@aihandle.cloud',
  },
  qr: {
    founderDestination: 'https://aihandle.cloud/omar.html',
    founderTitle: "Scan Omar's Profile",
    founderSupporting: 'Scan the QR code to view Omar Mohamed\'s full profile and connect directly.',
    salesDestination: 'https://aihandle.cloud/rayan.html',
    salesTitle: "Scan Mohamed's Profile",
    salesSupporting: 'Scan the QR code to view Mohamed Rayan\'s full profile and connect directly.',
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
    id: 'orchestrator',
    name: 'AI Orchestrator',
    acronym: 'ORCH',
    title: 'Central AI Coordinator',
    department: 'CENTRAL COMMAND',
    floor: 'CORE',
    image: '/images/robots/orion.jpg',
    tagline: 'One central intelligence coordinating the entire digital workforce.',
    description: 'The AI Orchestrator coordinates all agents by assigning tasks, routing verified information, monitoring status, preventing duplicate actions, requesting approvals, escalating exceptions, and maintaining operational visibility.',
    responsibilities: [
      'Assigns tasks to other agents',
      'Routes verified information between agents',
      'Monitors agent status across all departments',
      'Prevents duplicate actions',
      'Requests human approvals when needed',
      'Escalates exceptions to humans',
      'Maintains operational visibility',
    ],
    humanEscalation: 'Major decisions, cross-agent conflicts, and exceptions requiring human judgment.',
  },
  {
    id: 'research-agent',
    name: 'Research Agent',
    acronym: 'RSCR',
    title: 'Market Intelligence Analyst',
    department: 'RESEARCH & INTELLIGENCE',
    floor: 'FLOOR 1',
    image: '/images/robots/spectra.jpg',
    tagline: 'Structured research without spending hours searching manually.',
    description: 'The Research Agent handles company research, prospect verification, market intelligence, opportunity discovery, and research briefs — delivering organised findings directly to the sales team.',
    responsibilities: [
      'Conducts company research',
      'Verifies prospect information',
      'Gathers market intelligence',
      'Discovers new opportunities',
      'Prepares research briefs',
    ],
    humanEscalation: 'Data verification for high-value prospects, competitive intelligence decisions.',
  },
  {
    id: 'sales-agent',
    name: 'Sales and Follow-Up Agent',
    acronym: 'SALE',
    title: 'Outreach and CRM Management',
    department: 'SALES & CRM',
    floor: 'FLOOR 2',
    image: '/images/robots/wasp.jpg',
    tagline: 'Complete sales workflow from outreach to CRM management.',
    description: 'The Sales and Follow-Up Agent handles approved outreach, incoming replies, lead qualification, follow-up sequences, appointment requests, conversation history, CRM creation and updates, and human sales handover.',
    responsibilities: [
      'Sends approved outreach messages',
      'Handles incoming replies',
      'Qualifies leads based on criteria',
      'Manages follow-up sequences',
      'Books appointment requests',
      'Maintains conversation history',
      'Creates and updates CRM records',
      'Handles human sales handover',
    ],
    humanEscalation: 'High-value conversations, complex negotiations, and sensitive client situations.',
    modes: [
      { name: 'Draft Mode', description: 'Agent prepares message, human sends' },
      { name: 'Approval Mode', description: 'Agent requests approval before sending' },
      { name: 'Autopilot Mode', description: 'Agent handles low-risk communication per rules' },
    ],
  },
  {
    id: 'content-agent',
    name: 'Content Posting Agent',
    acronym: 'CNTNT',
    title: 'Content Planning and Publishing',
    department: 'CONTENT STUDIO',
    floor: 'FLOOR 3',
    image: '/images/robots/muse.jpg',
    tagline: 'Consistent content without starting from zero every day.',
    description: 'The Content Posting Agent handles content planning, captions, scripts, post preparation, publishing workflows, approval requests, and performance summaries.',
    responsibilities: [
      'Creates content plans',
      'Writes captions and descriptions',
      'Prepares video scripts',
      'Prepares posts for publishing',
      'Manages publishing workflows',
      'Sends approval requests',
      'Delivers performance summaries',
    ],
    humanEscalation: 'Final brand approval, controversial topics, high-stakes campaign decisions.',
  },
  {
    id: 'operations-agent',
    name: 'Operations Tracker Agent',
    acronym: 'OPS',
    title: 'Workflow and Task Monitoring',
    department: 'OPERATIONS CONTROL',
    floor: 'FLOOR 4',
    image: '/images/robots/flux.jpg',
    tagline: 'Every task tracked. Nothing falls through the cracks.',
    description: 'The Operations Tracker Agent monitors open tasks, workflow status, overdue actions, failed steps, appointment status, escalation alerts, and operational reminders.',
    responsibilities: [
      'Tracks open tasks',
      'Monitors workflow status',
      'Identifies overdue actions',
      'Flags failed or incomplete steps',
      'Tracks appointment status',
      'Sends escalation alerts',
      'Delivers operational reminders',
    ],
    humanEscalation: 'Workflow failures, overdue critical tasks, system-wide operational issues.',
  },
  {
    id: 'reporting-agent',
    name: 'Reporting Agent',
    acronym: 'RPRT',
    title: 'Management Reporting and Analytics',
    department: 'EXECUTIVE ANALYTICS',
    floor: 'FLOOR 5',
    image: '/images/robots/lumen.jpg',
    tagline: 'Management receives organised information without chasing every department.',
    description: 'The Reporting Agent handles daily summaries, lead activity reports, follow-up status, campaign updates, CRM gap analysis, and management reports.',
    responsibilities: [
      'Prepares daily summaries',
      'Tracks lead activity',
      'Reports follow-up status',
      'Generates campaign updates',
      'Identifies CRM gaps',
      'Delivers management reports',
    ],
    humanEscalation: 'Strategic decisions based on reports, anomaly investigation.',
  },
  {
    id: 'safety-agent',
    name: 'Safety and Approval Agent',
    acronym: 'SAFE',
    title: 'Permissions and Safety Control',
    department: 'SAFETY & COMPLIANCE',
    floor: 'FLOOR 6',
    image: '/images/robots/guardian.jpg',
    tagline: 'Ensuring every AI action stays within your business boundaries.',
    description: 'The Safety and Approval Agent handles permission checks, sensitive actions, approval requests, activity history, pause controls, and knowledge boundaries across the entire workforce.',
    responsibilities: [
      'Checks permissions before actions',
      'Handles approval requests',
      'Reviews sensitive actions',
      'Maintains activity history',
      'Manages pause controls',
      'Enforces knowledge boundaries',
    ],
    humanEscalation: 'Emergency system override, policy changes, legal compliance decisions.',
    modes: [
      { name: 'Audit Mode', description: 'Silently logs all actions' },
      { name: 'Gatekeeper Mode', description: 'Requires human approval for sensitive actions' },
    ]
  },
  {
    id: 'voice-agent',
    name: 'AI Voice Receptionist',
    acronym: 'VOICE',
    title: 'Inbound Call Handling',
    department: 'COMMUNICATIONS',
    floor: 'LOBBY',
    image: '/images/robots/vox.jpg',
    tagline: 'Professional first-line support outside normal office hours.',
    description: 'The AI Voice Receptionist handles calls, qualification, appointment requests, call summaries, and human transfer — providing professional support when your human team is unavailable.',
    responsibilities: [
      'Answers incoming calls',
      'Qualifies callers',
      'Books appointment requests',
      'Prepares call summaries',
      'Transfers to humans when needed',
    ],
    humanEscalation: 'Complex inquiries, complaints, legal matters, high-value client calls.',
    notes: [
      'Voice usage is pay-as-you-go. Billing depends on call usage or minutes.',
      'Voice cloning requires explicit written permission.',
      'Not automatically unlimited — usage is monitored and controlled.',
    ],
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
  { id: 'f1', floor: 'FLOOR 1', name: 'Research & Intelligence', description: 'Company research and market intelligence', sectionLink: '#research', icon: 'Search' },
  { id: 'f2', floor: 'FLOOR 2', name: 'Sales & CRM', description: 'Outreach, qualification, and CRM management', sectionLink: '#sales', icon: 'MessageSquare' },
  { id: 'f3', floor: 'FLOOR 3', name: 'Content Studio', description: 'Content planning and publishing', sectionLink: '#content', icon: 'PenTool' },
  { id: 'f4', floor: 'FLOOR 4', name: 'Operations Control', description: 'Task and workflow monitoring', sectionLink: '#operations', icon: 'Workflow' },
  { id: 'f5', floor: 'FLOOR 5', name: 'Executive Analytics', description: 'Reporting and management briefings', sectionLink: '#reporting', icon: 'BarChart3' },
  { id: 'f6', floor: 'FLOOR 6', name: 'Safety & Compliance', description: 'Permissions and approval control', sectionLink: '#safety', icon: 'Shield' },
  { id: 'lobby', floor: 'LOBBY', name: 'Voice Reception', description: 'Inbound call handling', sectionLink: '#voice', icon: 'Phone' },
  { id: 'core', floor: 'CORE', name: 'AI Orchestrator', description: 'Central coordination', sectionLink: '#orchestrator', icon: 'Cpu' },
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

// ─── Workflow Data ───
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

// ─── Telegram Commands ───
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

// ─── Plans: B2B & B2Agent ───
export interface Plan {
  id: string;
  name: string;
  title: string;
  description: string;
  audience: string;
  icon: string;
  customOptions: string[];
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'b2b',
    name: 'B2B Plan',
    title: 'For Businesses & Companies',
    description: 'Everything is custom-built for your business. We design, deploy, and manage a coordinated AI workforce tailored to your operations, team size, and growth goals.',
    audience: 'Business owners, companies, clinics, agencies, real estate developers, and organisations that need a complete AI deployment.',
    icon: 'Building2',
    customOptions: [
      'How many AI agents your operation needs',
      'Which departments and workflows to connect',
      'How many integrations and connections required',
      'Custom safety controls and approval rules',
      'Dedicated reporting and management dashboards',
      'Number of team members who interact with the system',
      'Custom onboarding and team training',
      'Ongoing optimisation and scaling',
    ],
    featured: true,
  },
  {
    id: 'b2agent',
    name: 'B2Agent Plan',
    title: 'For Individual Agents & Professionals',
    description: 'A focused, lightweight AI system for individual professionals — real estate agents, consultants, freelancers, and solo practitioners who need AI support without the full infrastructure.',
    audience: 'Real estate agents, consultants, freelancers, solo practitioners, and professionals who want their own AI agent team.',
    icon: 'User',
    customOptions: [
      'Personal AI agent configuration',
      'Lead capture and WhatsApp follow-up',
      'Appointment booking and calendar management',
      'CRM organisation and lead tracking',
      'Personal-branding website with enquiry forms',
      'Content support for social presence',
      'Reporting and activity summaries',
      'Human escalation when needed',
    ],
  },
];

// ─── Report Metrics ───
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
      'Research Agent',
      'Sales and Follow-Up Agent',
      'Content Posting Agent',
      'Operations Tracker Agent',
      'Reporting Agent',
      'AI Orchestrator',
      'Safety and Approval Agent',
      'AI Voice Receptionist',
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
    tags: ['AI Orchestrator', 'Sales Agent', 'Operations Tracker'],
    desc: 'A complete AI workforce managing lead capture, WhatsApp qualification, and CRM entry for a luxury development launch.',
    mockupType: 'mobile',
    challenge: 'High volume of unqualified leads during launch phases resulting in slow response times.',
    solution: 'Deployed the Sales Agent to instantly engage leads on WhatsApp, qualify their budget, and push organized data to the Operations Tracker.',
  },
  {
    title: 'Premium AI Showcase Website',
    clientType: 'Boutique Agency',
    market: 'UK',
    type: 'Frontend Experience',
    category: 'Websites',
    tags: ['Content Agent', 'AI Orchestrator'],
    desc: 'High-performance website with integrated AI assistance, automated content preparation, and SEO infrastructure.',
    mockupType: 'desktop',
    challenge: 'Website was slow, visually outdated, and disconnected from the agency\'s operations.',
    solution: 'Built a new frontend architecture and connected the Content Agent to automatically generate and update content.',
  },
  {
    title: 'Agent Recruitment Automation',
    clientType: 'Brokerage Network',
    market: 'Global',
    type: 'Prototype',
    category: 'Automations',
    tags: ['Research Agent', 'Sales Agent', 'Operations Tracker'],
    desc: 'Automated research and outreach system for identifying and contacting top-performing brokers in new markets.',
    mockupType: 'dashboard',
    challenge: 'Scaling the brokerage required manual research of hundreds of profiles daily.',
    solution: 'Research Agent identifies targets, Sales Agent crafts personalized outreach, and Operations Tracker orchestrates the follow-up sequence.',
  },
  {
    title: 'Clinic Enquiry Management',
    clientType: 'Healthcare Practice',
    market: 'UAE',
    type: 'Demonstration',
    category: 'Clinics',
    tags: ['Voice Agent', 'Operations Tracker', 'Sales Agent'],
    desc: 'AI reception and enquiry management system for a multi-specialty clinic handling appointment requests and FAQs.',
    mockupType: 'mobile',
    challenge: 'Front desk overwhelmed with calls, missed enquiries during peak hours, and no systematic follow-up.',
    solution: 'Deployed Voice Agent for after-hours reception, Operations Tracker for appointment routing, and Sales Agent for enquiry tracking.',
  },
];
