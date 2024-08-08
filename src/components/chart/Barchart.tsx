import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, BarController } from 'chart.js';
import { UserSelection } from '@/app/type/userSelection';

interface ImpactBarChartProps {
  userInput: UserSelection | null;
}

Chart.register(Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, BarController);

const ImpactBarChart: React.FC<ImpactBarChartProps> = ({ userInput }) => {
  const labels = ['Walk', 'Bicycle', 'Car', 'Bus'];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Diet',
        data: [122, userInput?.CalculatedResult.DietImpact, 344, 455],
        backgroundColor: 'rgba(0, 200, 0, 0.2)',
        borderColor: 'rgba(0, 200, 0, 1)',
        borderWidth: 1,
        stack: 'Stack 0',
      },
      {
        label: 'Transport Emissions',
        data: [122, userInput?.CalculatedResult.BikeImpact, 344, 455],
        backgroundColor: 'rgba(255, 200, 0, 0.2)',
        borderColor: 'rgba(255, 200, 0, 1)',
        borderWidth: 1,
        stack: 'Stack 0',
      },
      {
        label: 'Region',
        data: [122, 233, 344, 455],
        backgroundColor: 'rgba(0, 200, 200, 0.2)',
        borderColor: 'rgba(0, 200, 200, 1)',
        borderWidth: 1,
        stack: 'Stack 0',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: 'Environmental Impact',
        color: 'white',
        font: {
          size: 20,
        },
        padding: {
          bottom: 30,
        },
      },
      tooltip: {
        bodyColor: 'white',
        titleColor: 'white',
        footerColor: 'white',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Units',
          color: 'white',
          font: {
            size: 15,
          },
        },
        ticks: {
          color: 'white',
        },
      },
      x: {
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="relative w-full h-64 md:h-96">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ImpactBarChart;
