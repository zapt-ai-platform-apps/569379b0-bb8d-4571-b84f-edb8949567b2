import { createSignal, onMount } from 'solid-js';
import { fetchCampaigns } from '../store/campaignStore';
import { Link } from '@solidjs/router';

function Dashboard() {
  const [campaigns, setCampaigns] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    const data = await fetchCampaigns();
    setCampaigns(data);
    setLoading(false);
  });

  return (
    <div>
      <h1 class="text-3xl font-bold text-purple-600 mb-8">Dashboard</h1>
      {loading() ? (
        <p>Loading campaigns...</p>
      ) : campaigns().length > 0 ? (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns().map((campaign) => (
            <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
              <h2 class="text-xl font-semibold text-gray-800 mb-2">{campaign.name}</h2>
              <p class="text-gray-600 mb-2">Type: {campaign.type}</p>
              <p class="text-gray-600 mb-2">Status: {campaign.status}</p>
              <Link
                href={`/campaign/${campaign.id}`}
                class="text-purple-500 hover:underline cursor-pointer"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No campaigns found. Start by creating a new campaign.</p>
      )}
    </div>
  );
}

export default Dashboard;