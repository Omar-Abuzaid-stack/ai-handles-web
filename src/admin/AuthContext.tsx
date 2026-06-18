import React, { createContext, useContext, useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  isLocalMode: boolean;
  signIn: (email: string, pass: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isLocalMode = !isSupabaseConfigured;

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    } else {
      // Local honest mode
      const localUser = localStorage.getItem('vantility_local_admin');
      if (localUser) {
        setUser(JSON.parse(localUser));
      }
      setIsLoading(false);
    }
  }, []);

  const signIn = async (email: string, pass: string) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) {
        console.error("Login failed", error);
        return false;
      }
      return !!data.user;
    } else {
      if (email === 'admin@vantility.com' && pass === 'admin') {
        const dummyUser = { id: 'local-admin', email };
        localStorage.setItem('vantility_local_admin', JSON.stringify(dummyUser));
        setUser(dummyUser);
        return true;
      }
      return false;
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('vantility_local_admin');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isLocalMode, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
