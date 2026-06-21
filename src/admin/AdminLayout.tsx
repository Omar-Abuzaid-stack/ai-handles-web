import React from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router';
import { useAuth } from './AuthContext';
import { 
  LayoutDashboard, Users, UserCog, LogOut, 
  Image as ImageIcon, Video, Globe, Home, Palette, Shield
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { user, isLoading, isLocalMode, signOut } = useAuth();
  const location = useLocation();

  if (isLoading) return <div className="h-screen w-full bg-[#0A0A0A] text-[#F5F0EB] flex items-center justify-center">Loading Command Center...</div>;
  if (!user) return <Navigate to="/admin/login" state={{ from: location }} replace />;

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-[#F5F0EB] font-body overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/50 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-mono tracking-widest text-[#C9A96E]">AI HANDLE</h1>
          <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Command Center</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-3">
          <Link to="/admin" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname === '/admin' ? 'bg-white/10 text-[#C9A96E]' : 'hover:bg-white/5 text-white/70'}`}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <div className="pt-2 pb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/30">Content</div>
          <Link to="/admin/homepage" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname.startsWith('/admin/homepage') ? 'bg-white/10 text-[#C9A96E]' : 'hover:bg-white/5 text-white/70'}`}>
            <Home size={18} /> Homepage
          </Link>
          <Link to="/admin/team" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname.startsWith('/admin/team') ? 'bg-white/10 text-[#C9A96E]' : 'hover:bg-white/5 text-white/70'}`}>
            <Users size={18} /> Team Members
          </Link>
          <Link to="/admin/agents" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname.startsWith('/admin/agents') ? 'bg-white/10 text-[#C9A96E]' : 'hover:bg-white/5 text-white/70'}`}>
            <UserCog size={18} /> AI Agents
          </Link>
          <div className="pt-2 pb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/30">Media</div>
          <Link to="/admin/videos" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname.startsWith('/admin/videos') ? 'bg-white/10 text-[#C9A96E]' : 'hover:bg-white/5 text-white/70'}`}>
            <Video size={18} /> Videos
          </Link>
          <Link to="/admin/media" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname.startsWith('/admin/media') ? 'bg-white/10 text-[#C9A96E]' : 'hover:bg-white/5 text-white/70'}`}>
            <ImageIcon size={18} /> Media Library
          </Link>
          <div className="pt-2 pb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/30">Business</div>
          <Link to="/admin/clients" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname.startsWith('/admin/clients') ? 'bg-white/10 text-[#C9A96E]' : 'hover:bg-white/5 text-white/70'}`}>
            <Globe size={18} /> Clients & Projects
          </Link>
          <div className="pt-2 pb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/30">System</div>
          <Link to="/admin/theme" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname.startsWith('/admin/theme') ? 'bg-white/10 text-[#C9A96E]' : 'hover:bg-white/5 text-white/70'}`}>
            <Palette size={18} /> Theme
          </Link>
          <Link to="/admin/users" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname.startsWith('/admin/users') ? 'bg-white/10 text-[#C9A96E]' : 'hover:bg-white/5 text-white/70'}`}>
            <Shield size={18} /> Users & Roles
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-white/70 transition-colors mb-2">
            <Globe size={18} /> View Public Site
          </a>
          <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-white/70 transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {isLocalMode && (
          <div className="bg-[#C9A96E]/20 border-b border-[#C9A96E]/30 px-6 py-2 flex items-center justify-between">
            <span className="text-sm text-[#C9A96E]">
              <strong>Local Development Mode:</strong> Changes are saved to this device only. They do not update the live website.
            </span>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
