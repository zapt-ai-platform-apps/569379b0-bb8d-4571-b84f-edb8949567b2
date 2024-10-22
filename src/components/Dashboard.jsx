import { createSignal, onMount, For } from 'solid-js';
import { Link } from '@solidjs/router';
import { supabase, createEvent } from '../supabaseClient';

function Dashboard() {
  const [campaigns, setCampaigns] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const fetchCampaigns = async () => {
    setLoading(true);
    // Fetch campaigns from backend or database
    // This is a placeholder. Replace with actual API call.
    const mockCampaigns = [
      { id: 1, name: 'Campaign 1', status: 'Active' },
      { id: 2, name: 'Campaign 2', status: 'Paused' },
    ];
    setCampaigns(mockCampaigns);
    setLoading(false);
  };

  onMount(fetchCampaigns);

  return (
    <div class="h-full">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold text-purple-600">Dashboard</h1>
        <Link
          href="/campaigns/new"
          class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Create Campaign
        </Link>
      </div>
      {loading() ? (
        <p>Loading campaigns...</p>
      ) : (
        <div class="space-y-4">
          <For each={campaigns()}>
            {(campaign) => (
              <div class="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-semibold text-lg text-purple-600 mb-2">{campaign.name}</p>
                    <p class="text-gray-700">Status: {campaign.status}</p>
                  </div>
                  <Link
                    href={`/campaigns/${campaign.id}`}
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            )}
          </For>
        </div>
      )}
    </div>
  );
}

export default Dashboard;