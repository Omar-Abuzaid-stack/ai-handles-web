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

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/ai-workforce" element={<AIWorkforcePage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/team/:slug" element={<TeamProfilePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/card/:slug" element={<TeamProfilePage />} />
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
