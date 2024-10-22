import { Routes, Route } from '@solidjs/router';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CreateCampaign from './components/CreateCampaign';
import CampaignList from './components/CampaignList';
import CampaignDetail from './components/CampaignDetail';
import Analytics from './components/Analytics';

function App() {
  return (
    <div class="min-h-screen bg-gray-100">
      <Navbar />
      <div class="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" component={Dashboard} />
          <Route path="/create-campaign" component={CreateCampaign} />
          <Route path="/campaigns" component={CampaignList} />
          <Route path="/campaign/:id" component={CampaignDetail} />
          <Route path="/analytics" component={Analytics} />
        </Routes>
      </div>
    </div>
  );
}

export default App;