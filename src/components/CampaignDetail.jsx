import { createSignal, onMount } from 'solid-js';
import { useParams } from '@solidjs/router';
import { Line } from 'solid-chartjs';
import { Chart, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

function CampaignDetail() {
  const params = useParams();
  const [campaign, setCampaign] = createSignal(null);
  const [loading, setLoading] = createSignal(false);

  const fetchCampaignDetails = async () => {
    setLoading(true);
    // Fetch campaign details and analytics from backend
    // This is a placeholder. Replace with actual API call.
    const mockCampaign = {
      id: params.id,
      name: 'Campaign ' + params.id,
      status: 'Active',
      analytics: {
        dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        metrics: [100, 200, 150, 300, 250],
      },
    };
    setCampaign(mockCampaign);
    setLoading(false);
  };

  onMount(() => {
    Chart.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);
    fetchCampaignDetails();
  });

  const chartData = {
    labels: campaign()?.analytics.dates || [],
    datasets: [
      {
        label: 'Engagement',
        data: campaign()?.analytics.metrics || [],
        fill: false,
        borderColor: 'rgb(99, 102, 241)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div class="h-full">
      {loading() ? (
        <p>Loading campaign details...</p>
      ) : (
        campaign() && (
          <>
            <h1 class="text-3xl font-bold text-purple-600 mb-6">{campaign().name}</h1>
            <p class="mb-4">Status: {campaign().status}</p>
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold mb-4 text-purple-600">Analytics</h2>
              <Line data={chartData} width={400} height={200} />
            </div>
          </>
        )
      )}
    </div>
  );
}

export default CampaignDetail;