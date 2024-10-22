import { createSignal, onMount } from 'solid-js';
import { Chart, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Line } from 'solid-chartjs';

function EarningsTracker() {
  const [earningsData, setEarningsData] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [date, setDate] = createSignal('');
  const [amount, setAmount] = createSignal('');

  const fetchEarnings = () => {
    setLoading(true);
    try {
      const earnings = JSON.parse(localStorage.getItem('earnings')) || [];
      setEarningsData(earnings);
    } catch (error) {
      console.error('Error fetching earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEarning = () => {
    if (date() && amount()) {
      const newEarnings = [...earningsData(), { date: date(), amount: parseFloat(amount()) }];
      localStorage.setItem('earnings', JSON.stringify(newEarnings));
      setEarningsData(newEarnings);
      setDate('');
      setAmount('');
    } else {
      alert('Please enter both date and amount.');
    }
  };

  onMount(() => {
    Chart.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);
    fetchEarnings();
  });

  const chartData = {
    labels: earningsData().map((data) => data.date),
    datasets: [
      {
        label: 'Earnings',
        data: earningsData().map((data) => data.amount),
        fill: false,
        borderColor: 'rgb(99, 102, 241)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div class="h-full">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Earnings Tracker</h1>
      <div class="mb-6">
        <h2 class="text-2xl font-bold mb-4 text-purple-600">Add Earnings</h2>
        <div class="flex flex-col md:flex-row gap-4">
          <input
            type="date"
            value={date()}
            onInput={(e) => setDate(e.target.value)}
            class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount()}
            onInput={(e) => setAmount(e.target.value)}
            class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          />
          <button
            class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={addEarning}
          >
            Add
          </button>
        </div>
      </div>
      <Show when={!loading()} fallback={<p>Loading earnings data...</p>}>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <Line data={chartData} options={{ responsive: true }} width={400} height={200} />
        </div>
      </Show>
    </div>
  );
}

export default EarningsTracker;