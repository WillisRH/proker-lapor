import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import moment from 'moment';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PerformanceChart = ({ performances, date }) => {
  // Ensure performances is always an array
  const performanceArray = Array.isArray(performances) ? performances : [];

  // Calculate the overall performance trend
  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;
  
  performanceArray.forEach((value, index) => {
    if (index > 0) {
      const difference = value - performanceArray[index - 1];
      if (difference > 0) {
        positiveCount++;
      } else if (difference < 0) {
        negativeCount++;
      } else {
        neutralCount++;
      }
    }
  });

  let performanceText = 'neutral';
  const totalChanges = positiveCount + negativeCount + neutralCount;

  if (positiveCount / totalChanges > 0.5) {
    performanceText = 'mostly positive';
  } else if (negativeCount / totalChanges > 0.5) {
    performanceText = 'mostly negative';
  } else if (positiveCount > negativeCount) {
    performanceText = 'positive';
  } else if (negativeCount > positiveCount) {
    performanceText = 'negative';
  }

  const data = {
    labels: performanceArray.map((_, index) => `Q${index + 1}`),
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

  return (
    <div>
      <Line data={data} options={options} />
      <p className='text-gray-600 text-sm text-center'>{performanceText.toUpperCase()}</p>
    </div>
  );
};

export default PerformanceChart;

//AIzaSyCZeRs0jnJQ4ooUO1AeIwUG1FIDSaELNHA