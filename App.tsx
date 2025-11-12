
import React, { useState, useEffect, useCallback } from 'react';
import HomePage from './components/HomePage';
import FrameGenerator from './components/FrameGenerator';
import PrivacyPolicy from './components/PrivacyPolicy';
import ConsentBanner from './components/ConsentBanner';
import type { User as AppUser } from './types';

const SUPABASE_URL = 'https://eyeyjxyszmxvdiitdofg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5ZXlqeHlzem14dmRpaXRkb2ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDYxNzMsImV4cCI6MjA3ODEyMjE3M30.lmT8W4LYgIaHQB9TZv-dG11pRW4VXBhnYvV4MyaNmqI';

const { createClient } = (window as any).supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const getRouteFromHash = () => window.location.hash || '#/';

const App: React.FC = () => {
  const [route, setRoute] = useState(getRouteFromHash());
  const [user, setUser] = useState<AppUser | null>(null);
  const [consentGiven, setConsentGiven] = useState(true);

  useEffect(() => {
    // listen for hash changes for navigation
    const handleRouteChange = () => {
      const newRoute = getRouteFromHash();
      setRoute(newRoute);
      
      if (newRoute.startsWith('#/tools/frame-generator')) {
        document.title = 'Profile Frame Generator | BoostedIn';
      } else if (newRoute.startsWith('#/privacy-policy')) {
        document.title = 'Privacy Policy | BoostedIn';
      } else {
        document.title = 'BoostedIn | Elevate Your LinkedIn Profile';
      }
    };

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);

    // check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'User',
          picture: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || '',
        });
      }
    });

    // listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'User',
            picture: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || '',
          });
        } else {
          setUser(null);
        }
      }
    );
    
    // check for cookie consent
    try {
      const consent = localStorage.getItem('consentGiven');
      if (consent !== 'true') {
        setConsentGiven(false);
      }
    } catch (error) {
      console.error("Failed to read consent from localStorage", error);
      setConsentGiven(false);
    }


    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogin = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
    });
    if (error) {
      console.error('Error logging in with LinkedIn:', error.message);
      alert('Could not log in. Please try again.');
    }
  }, []);

  const handleLogout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    }
  }, []);
  
  const handleAcceptConsent = useCallback(() => {
    try {
      localStorage.setItem('consentGiven', 'true');
      setConsentGiven(true);
    } catch (error) {
      console.error("Failed to save consent to localStorage", error);
      setConsentGiven(true);
    }
  }, []);

  const renderView = () => {
    if (route.startsWith('#/tools/frame-generator')) {
      return <FrameGenerator user={user} onLogin={handleLogin} onLogout={handleLogout} />;
    }
    if (route.startsWith('#/privacy-policy')) {
      return <PrivacyPolicy />;
    }
    return <HomePage user={user} onLogin={handleLogin} onLogout={handleLogout} />;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {renderView()}
      {!consentGiven && <ConsentBanner onAccept={handleAcceptConsent} />}
    </div>
  );
};

export default App;