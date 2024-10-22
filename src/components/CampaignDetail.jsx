import { useParams } from '@solidjs/router';
import { createSignal, onMount } from 'solid-js';
import { getCampaignById } from '../store/campaignStore';

function CampaignDetail() {
  const params = useParams();
  const [campaign, setCampaign] = createSignal(null);

  onMount(async () => {
    const data = await getCampaignById(Number(params.id));
    setCampaign(data);
  });

  return (
    <div>
      {campaign() ? (
        <>
          <h1 class="text-3xl font-bold text-purple-600 mb-4">{campaign().name}</h1>
          <p class="text-gray-700 mb-2">Type: {campaign().type}</p>
          <p class="text-gray-700 mb-2">Status: {campaign().status}</p>
          <p class="text-gray-700 mb-2">
            Scheduled At: {campaign().scheduleAt || 'Not Scheduled'}
          </p>
          <div class="bg-white p-4 rounded-lg shadow-md mt-4">
            <h2 class="text-2xl font-semibold mb-2">Message</h2>
            <p class="text-gray-700">{campaign().message}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CampaignDetail;