import { createSignal, onMount } from 'solid-js';
import { fetchCampaigns, deleteCampaign } from '../store/campaignStore';
import { Link } from '@solidjs/router';

function CampaignList() {
  const [campaigns, setCampaigns] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    const data = await fetchCampaigns();
    setCampaigns(data);
    setLoading(false);
  });

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      await deleteCampaign(id);
      setCampaigns(campaigns().filter((campaign) => campaign.id !== id));
    }
  };

  return (
    <div>
      <h1 class="text-3xl font-bold text-purple-600 mb-8">Campaigns</h1>
      {loading() ? (
        <p>Loading campaigns...</p>
      ) : campaigns().length > 0 ? (
        <div class="space-y-4">
          {campaigns().map((campaign) => (
            <div class="bg-white p-4 rounded-lg shadow-md">
              <div class="flex justify-between items-center">
                <div>
                  <h2 class="text-xl font-semibold text-gray-800">{campaign.name}</h2>
                  <p class="text-gray-600">Type: {campaign.type}</p>
                  <p class="text-gray-600">Status: {campaign.status}</p>
                </div>
                <div class="flex space-x-2">
                  <Link
                    href={`/campaign/${campaign.id}`}
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    View
                  </Link>
                  <button
                    class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleDelete(campaign.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No campaigns found. Start by creating a new campaign.</p>
      )}
    </div>
  );
}

export default CampaignList;