import { createSignal, onMount, createEffect } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import Favorites from './components/Favorites';
import EarningsTracker from './components/EarningsTracker';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('login');
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      {currentPage() === 'login' ? (
        <AuthPage />
      ) : (
        <>
          <Navbar onSignOut={handleSignOut} />
          <div class="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" component={HomePage} />
              <Route path="/favorites" component={Favorites} />
              <Route path="/earnings" component={EarningsTracker} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;