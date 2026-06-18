import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './admin/AuthContext.tsx'
import AdminLayout from './admin/AdminLayout.tsx'
import AdminLogin from './admin/pages/AdminLogin.tsx'
import AdminDashboard from './admin/pages/AdminDashboard.tsx'
import AdminAgents from './admin/pages/AdminAgents.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="agents" element={<AdminAgents />} />
          {/* Add more admin routes here later */}
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
)
