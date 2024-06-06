import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PerformanceChart = ({ performances, date }) => {
  // Ensure performances is always an array
  const performanceArray = Array.isArray(performances) ? performances : [];

  const data = {
    // labels: performanceArray.map((_, index) => `Performance ${index + 1}`),
    // labels: performanceArray.map((_, index) => `${moment(date).format('MMMM Do YYYY, h:mm:ss a')}`),
    datasets: [
      {
        label: 'Performance',
        data: performanceArray,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default PerformanceChart;
