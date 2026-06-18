import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../AuthContext';
import { Lock } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, isLocalMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const success = await signIn(email, password);
    if (success) {
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } else {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-[#C9A96E]">
          <Lock size={40} strokeWidth={1} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-mono tracking-widest text-[#F5F0EB]">
          VANTILITY
        </h2>
        <p className="mt-2 text-center text-sm text-[#8A8478]">
          Executive Command Center
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#111111] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/5">
          {isLocalMode && (
            <div className="mb-6 p-4 bg-[#C9A96E]/10 border border-[#C9A96E]/20 rounded-md text-sm text-[#C9A96E] text-center">
              Running in Local Mode.<br/>Use <strong>admin@vantility.com / admin</strong>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-white/70">Email address</label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-white/10 rounded-md shadow-sm placeholder-white/30 focus:outline-none focus:ring-[#C9A96E] focus:border-[#C9A96E] sm:text-sm bg-black text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-white/10 rounded-md shadow-sm placeholder-white/30 focus:outline-none focus:ring-[#C9A96E] focus:border-[#C9A96E] sm:text-sm bg-black text-white"
                />
              </div>
            </div>

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#C9A96E] hover:bg-[#D4B881] focus:outline-none transition-colors"
              >
                {loading ? 'Authenticating...' : 'Access Command Center'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
