import { onMount, createSignal } from 'solid-js';
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js';
import { Line } from 'solid-chartjs';
import { fetchAnalyticsData } from '../store/analyticsStore';

Chart.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

function Analytics() {
  const [chartData, setChartData] = createSignal(null);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    const data = await fetchAnalyticsData();
    const chartDataset = {
      labels: data.labels,
      datasets: [
        {
          label: 'Campaign Performance',
          data: data.values,
          borderColor: 'rgba(99, 102, 241, 1)', // purple-500
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          fill: true,
        },
      ],
    };
    setChartData(chartDataset);
    setLoading(false);
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div>
      <h1 class="text-3xl font-bold text-purple-600 mb-8">Analytics</h1>
      {loading() ? (
        <p>Loading analytics data...</p>
      ) : (
        <div class="bg-white p-4 rounded-lg shadow-md">
          <Line data={chartData()} options={chartOptions} width={600} height={400} />
        </div>
      )}
    </div>
  );
}

export default Analytics;