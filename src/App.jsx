import { createSignal, onMount } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CampaignDetail from './components/CampaignDetail';
import NewCampaign from './components/NewCampaign';
import AuthPage from './components/AuthPage';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('dashboard');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('dashboard');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  });

  return (
    <div class="h-full bg-gradient-to-br from-purple-100 to-blue-100">
      {currentPage() === 'login' ? (
        <AuthPage />
      ) : (
        <>
          <Navbar onSignOut={() => supabase.auth.signOut()} />
          <div class="container mx-auto px-4 py-8 h-full">
            <Routes>
              <Route path="/" component={Dashboard} />
              <Route path="/campaigns/new" component={NewCampaign} />
              <Route path="/campaigns/:id" component={CampaignDetail} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;