import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PerformanceChart = ({ performances, date }) => {
  // Ensure performances is always an array
  const performanceArray = Array.isArray(performances) ? performances : [];

  const data = {
    labels: performanceArray.map((_, index) => `Q${index + 1}`),
    // labels: performanceArray.map((_, index) => `${moment(date).format('MMMM Do YYYY, h:mm:ss a')}`),
    datasets: [
      {
        label: 'Performance',
        data: performanceArray,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.4, // Add tension to create a smooth line
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
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const currentValue = context.dataset.data[index];
            let previousValue = null;
            let difference = null;
            if (index > 0) {
              previousValue = context.dataset.data[index - 1];
              difference = currentValue - previousValue;
            }
            let differenceText = difference ? ` (${difference > 0 ? '+' : ''}${difference}%)` : '';
            return `${currentValue}%${differenceText}`;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PerformanceChart;
