import { Line } from 'solid-chartjs';
import { Chart, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

function ChartComponent(props) {
  return (
    <Line data={props.data} options={props.options} width={500} height={300} />
  );
}

export default ChartComponent;