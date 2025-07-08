
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface FynloUserData {
  is_platform_owner: boolean;
  restaurant_id?: string;
  subscription_plan: 'alpha' | 'beta' | 'omega';
  enabled_features: string[];
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  fynloUserData: FynloUserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [fynloUserData, setFynloUserData] = useState<FynloUserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (!error && data) {
        setUserRole(data.role);
      } else if (error) {
        console.error('Error fetching user role:', error);
        setUserRole('customer');
      } else {
        setUserRole('customer');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole('customer');
    }
  };

  const fetchFynloUserData = async (session: Session) => {
    try {
      const response = await fetch('https://api.fynlo.co.uk/api/v1/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          supabase_user_id: session.user.id,
          email: session.user.email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFynloUserData({
          is_platform_owner: data.is_platform_owner || false,
          restaurant_id: data.restaurant_id,
          subscription_plan: data.subscription_plan || 'alpha',
          enabled_features: data.enabled_features || [],
        });
      } else {
        console.error('Failed to verify user with Fynlo API:', response.statusText);
        // Set default values if API call fails
        setFynloUserData({
          is_platform_owner: false,
          subscription_plan: 'alpha',
          enabled_features: [],
        });
      }
    } catch (error) {
      console.error('Error calling Fynlo API:', error);
      // Set default values if API call fails
      setFynloUserData({
        is_platform_owner: false,
        subscription_plan: 'alpha',
        enabled_features: [],
      });
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer Supabase calls to prevent deadlocks
          setTimeout(() => {
            fetchUserRole(session.user.id);
            fetchFynloUserData(session);
          }, 0);
        } else {
          setUserRole(null);
          setFynloUserData(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          fetchUserRole(session.user.id);
          fetchFynloUserData(session);
        }, 0);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    userRole,
    fynloUserData,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
