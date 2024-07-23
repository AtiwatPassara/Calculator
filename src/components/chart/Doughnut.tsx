import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { UserSelection } from '@/app/type/userSelection';

interface MyDoughnutChartProps {
  userInput: UserSelection | null;
}

Chart.register(ArcElement, Tooltip, Legend, Title);

const ImpactDoughnutChart: React.FC<MyDoughnutChartProps> = ({ userInput }) => {
  const data = {
    labels: ['Cycling', 'Diet', 'Physical'],
    datasets: [
      {
        label: 'Impact',
        data: [
          userInput?.Cycling.bikeImpact,
          userInput?.Diet.impact,
          userInput?.Physical.physicalImpact,
        ],
        backgroundColor: [
          'rgba(0, 200, 0, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(128, 72, 26, 0.2)',
        ],
        borderColor: [
          'rgba(0, 255, 0, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(128, 72, 26, 1)',
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
      },
      tooltip: {
        bodyColor: 'white', // Set tooltip text color to white
        titleColor: 'white', // Set tooltip title color to white
        footerColor: 'white', // Set tooltip footer color to white
      },
    },
  };

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ImpactDoughnutChart;
