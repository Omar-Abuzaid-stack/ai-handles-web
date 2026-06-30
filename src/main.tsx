import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './admin/AuthContext.tsx'
import AdminLayout from './admin/AdminLayout.tsx'
import AdminLogin from './admin/pages/AdminLogin.tsx'
import AdminDashboard from './admin/pages/AdminDashboard.tsx'
import AdminAgents from './admin/pages/AdminAgents.tsx'
import AdminTeam from './admin/pages/AdminTeam.tsx'
import AdminHomepage from './admin/pages/AdminHomepage.tsx'
import AdminTheme from './admin/pages/AdminTheme.tsx'
import AdminVideos from './admin/pages/AdminVideos.tsx'
import AdminClients from './admin/pages/AdminClients.tsx'
import AdminMedia from './admin/pages/AdminMedia.tsx'
import AdminUsers from './admin/pages/AdminUsers.tsx'
import AdminBusinessCards from './admin/pages/AdminBusinessCards.tsx'
import AdminIntegrations from './admin/pages/AdminIntegrations.tsx'
import ServicesPage from './pages/ServicesPage.tsx'
import AIWorkforcePage from './pages/AIWorkforcePage.tsx'
import IntegrationsPage from './pages/IntegrationsPage.tsx'
import WorkPage from './pages/WorkPage.tsx'
import TeamPage from './pages/TeamPage.tsx'
import TeamProfilePage from './pages/TeamProfilePage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import AIAgentsPage from './pages/services/AIAgentsPage.tsx'
import AutomationsPage from './pages/services/AutomationsPage.tsx'
import AIDeploymentPage from './pages/services/AIDeploymentPage.tsx'
import WebsitesPage from './pages/services/WebsitesPage.tsx'
import GrowthPage from './pages/services/GrowthPage.tsx'
import VoiceAIPage from './pages/services/VoiceAIPage.tsx'
import AIConsultingPage from './pages/services/AIConsultingPage.tsx'

import RouterListener from './components/RouterListener.tsx'

const PAGE_ROUTES = [
  { path: '/', element: <App /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/services/ai-agents', element: <AIAgentsPage /> },
  { path: '/services/automations', element: <AutomationsPage /> },
  { path: '/services/ai-deployment', element: <AIDeploymentPage /> },
  { path: '/services/websites', element: <WebsitesPage /> },
  { path: '/services/growth', element: <GrowthPage /> },
  { path: '/services/voice-ai', element: <VoiceAIPage /> },
  { path: '/services/ai-consulting', element: <AIConsultingPage /> },
  { path: '/ai-workforce', element: <AIWorkforcePage /> },
  { path: '/integrations', element: <IntegrationsPage /> },
  { path: '/work', element: <WorkPage /> },
  { path: '/team', element: <TeamPage /> },
  { path: '/team/:slug', element: <TeamProfilePage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/card/:slug', element: <TeamProfilePage /> },
];

const ARABIC_PAGE_ROUTES = [
  { path: '/ar', element: <App /> },
  { path: '/ar/services', element: <ServicesPage /> },
  { path: '/ar/services/ai-agents', element: <AIAgentsPage /> },
  { path: '/ar/services/automations', element: <AutomationsPage /> },
  { path: '/ar/services/ai-deployment', element: <AIDeploymentPage /> },
  { path: '/ar/services/websites', element: <WebsitesPage /> },
  { path: '/ar/services/growth', element: <GrowthPage /> },
  { path: '/ar/services/voice-ai', element: <VoiceAIPage /> },
  { path: '/ar/services/ai-consulting', element: <AIConsultingPage /> },
  { path: '/ar/ai-workforce', element: <AIWorkforcePage /> },
  { path: '/ar/integrations', element: <IntegrationsPage /> },
  { path: '/ar/work', element: <WorkPage /> },
  { path: '/ar/team', element: <TeamPage /> },
  { path: '/ar/team/:slug', element: <TeamProfilePage /> },
  { path: '/ar/contact', element: <ContactPage /> },
];

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <RouterListener />
      <Routes>
        {PAGE_ROUTES.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
        {ARABIC_PAGE_ROUTES.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="agents" element={<AdminAgents />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="homepage" element={<AdminHomepage />} />
          <Route path="theme" element={<AdminTheme />} />
          <Route path="videos" element={<AdminVideos />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="business-cards" element={<AdminBusinessCards />} />
          <Route path="settings/integrations" element={<AdminIntegrations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
)
