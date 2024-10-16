"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

export default function AuthButton() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const pathname = usePathname();

  useEffect(() => {
    console.log('AuthButton component mounted');
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      console.log('Fetched user:', user);
      console.log('Fetch user error:', error);
      setUser(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      setUser(session?.user ?? null);
    });

    return () => {
      console.log('Unsubscribing from auth listener');
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      console.log('Initiating login process');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}${pathname}`,
        },
      });
      
      if (error) throw error;
      console.log('Login successful, data:', data);
      
    } catch (error: any) {
      console.error('Authentication error:', error);
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      console.log('Initiating logout process');
      await supabase.auth.signOut();
      console.log('Logout successful');
    } catch (error: any) {
      console.error('Logout error:', error);
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log('Current user state:', user);

  if (user) {
    console.log('User is logged in, avatar URL:', user.user_metadata?.avatar_url);
    return (
      <Button 
        onClick={handleLogout} 
        disabled={loading} 
        className='p-1 h-auto bg-transparent hover:bg-gray-100 rounded-full'
        variant="ghost"
      >
        {loading ? (
          'Loading...'
        ) : (
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.user_metadata?.avatar_url} alt="Profile" />
            <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
          </Avatar>
        )}
      </Button>
    );
  }

  return (
    <Button onClick={handleLogin} disabled={loading} className='font-medium text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out'>
      {loading ? 'Loading...' : 'Sign in with Google'}
    </Button>
  );
}
