import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Shield, Plus, Trash2 } from 'lucide-react';

type AdminRole = 'owner' | 'administrator' | 'editor' | 'content_manager' | 'media_manager';

interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  createdAt: string;
}

const rolePermissions: Record<AdminRole, string[]> = {
  owner: ['All permissions'],
  administrator: ['Edit content', 'Add team members', 'Upload files', 'Publish changes', 'Manage clients', 'Manage projects', 'View leads', 'Manage settings', 'Manage administrators'],
  editor: ['Edit content', 'Publish changes', 'View leads'],
  content_manager: ['Edit content', 'Add team members', 'Publish changes'],
  media_manager: ['Upload files', 'Manage media', 'Edit content'],
};

const AdminUsers: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<AdminRole>('editor');

  useEffect(() => {
    const stored = localStorage.getItem('aihandle_admin_users');
    const list: AdminUser[] = stored ? JSON.parse(stored) : [];
    if (user && !list.find(u => u.email === user.email)) {
      list.unshift({ id: 'owner', email: user.email, role: 'owner', createdAt: new Date().toISOString() });
      localStorage.setItem('aihandle_admin_users', JSON.stringify(list));
    }
    setUsers(list);
  }, [user]);

  const saveUsers = (list: AdminUser[]) => {
    localStorage.setItem('aihandle_admin_users', JSON.stringify(list));
    setUsers(list);
  };

  const handleAdd = () => {
    if (!newEmail) return;
    const newUser: AdminUser = {
      id: `admin-${Date.now()}`,
      email: newEmail,
      role: newRole,
      createdAt: new Date().toISOString(),
    };
    saveUsers([...users, newUser]);
    setNewEmail('');
    setNewRole('editor');
    setShowAdd(false);
  };

  const handleRemove = (id: string) => {
    if (id === 'owner') return;
    saveUsers(users.filter(u => u.id !== id));
  };

  const handleRoleChange = (id: string, role: AdminRole) => {
    saveUsers(users.map(u => u.id === id ? { ...u, role } : u));
  };

  const getRoleBadge = (role: AdminRole) => {
    const colors: Record<AdminRole, string> = {
      owner: 'bg-[#C9A96E]/10 text-[#C9A96E] border-[#C9A96E]/20',
      administrator: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      editor: 'bg-green-500/10 text-green-400 border-green-500/20',
      content_manager: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      media_manager: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    };
    return colors[role] || colors.editor;
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-mono text-[#F5F0EB]">Admin Users</h1>
          <p className="text-white/50 text-sm mt-1">Manage who can access the admin panel</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="bg-[#C9A96E] hover:bg-[#D4B881] text-black px-4 py-2 rounded-md font-medium transition-colors text-sm flex items-center gap-2"><Plus size={16} /> Add Admin</button>
      </div>

      {showAdd && (
        <div className="bg-[#111111] border border-[#C9A96E]/30 rounded-lg p-6 mb-6">
          <h3 className="text-sm font-medium text-[#C9A96E] mb-4">New Admin User</h3>
          <div className="flex gap-3">
            <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="Email address" className="flex-1 bg-black border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#C9A96E] focus:outline-none" />
            <select value={newRole} onChange={e => setNewRole(e.target.value as AdminRole)} className="bg-black border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#C9A96E] focus:outline-none">
              <option value="administrator">Administrator</option>
              <option value="editor">Editor</option>
              <option value="content_manager">Content Manager</option>
              <option value="media_manager">Media Manager</option>
            </select>
            <button onClick={handleAdd} className="px-4 py-2 bg-[#C9A96E] text-black rounded-md text-sm font-medium">Add</button>
          </div>
        </div>
      )}

      {/* Roles Reference */}
      <div className="bg-[#111111] border border-white/5 rounded-lg p-6 mb-6">
        <h3 className="text-sm font-medium text-white/70 mb-3 flex items-center gap-2"><Shield size={16} /> Role Permissions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(rolePermissions).map(([role, perms]) => (
            <div key={role} className="p-3 bg-black/30 rounded border border-white/5">
              <span className={`text-xs px-2 py-0.5 rounded border ${getRoleBadge(role as AdminRole)}`}>{role.replace('_', ' ')}</span>
              <p className="text-xs text-white/40 mt-2">{perms.join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User List */}
      <div className="space-y-2">
        {users.map(u => (
          <div key={u.id} className="bg-[#111111] border border-white/5 rounded-lg p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] text-sm font-medium">
              {u.email.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#F5F0EB] truncate">{u.email}</p>
              <p className="text-xs text-white/40">Joined {new Date(u.createdAt).toLocaleDateString()}</p>
            </div>
            <select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value as AdminRole)} disabled={u.id === 'owner'} className="bg-black border border-white/10 rounded px-3 py-1.5 text-white text-sm focus:border-[#C9A96E] focus:outline-none disabled:opacity-50">
              <option value="owner">Owner</option>
              <option value="administrator">Administrator</option>
              <option value="editor">Editor</option>
              <option value="content_manager">Content Manager</option>
              <option value="media_manager">Media Manager</option>
            </select>
            {u.id !== 'owner' && (
              <button onClick={() => handleRemove(u.id)} className="p-2 text-white/30 hover:text-red-400 hover:bg-white/5 rounded-md transition-colors"><Trash2 size={16} /></button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
