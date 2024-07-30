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
    labels: ['Manufacture', 'Maintenance', 'EOL', 'Engine', 'Battery', 'Electricity', 'Food'],
    datasets: [
      {
        label: 'Impact',
        data: [
          userInput?.Result.bikeImpact,
          userInput?.Result.bikeMaintenance,
          userInput?.Result.bikeEol,
          userInput?.Result.bikeEngine,
          userInput?.Result.bikeBattery,
          userInput?.Result.bikeElectricity,       
          userInput?.Diet.impact,
        ],
        backgroundColor: [
          'rgba(0, 200, 0, 0.2)',       // Manufacture
          'rgba(153, 102, 255, 0.2)',   // Maintenance
          'rgba(128, 72, 26, 0.2)',     // EOL
          'rgba(255, 99, 132, 0.2)',    // Engine
          'rgba(54, 162, 235, 0.2)',    // Battery
          'rgba(255, 206, 86, 0.2)',    // Electricity
          'rgba(75, 192, 192, 0.2)',    // Food
        ],
        borderColor: [
          'rgba(0, 255, 0, 1)',         // Manufacture
          'rgba(153, 102, 255, 1)',     // Maintenance
          'rgba(128, 72, 26, 1)',       // EOL
          'rgba(255, 99, 132, 1)',      // Engine
          'rgba(54, 162, 235, 1)',      // Battery
          'rgba(255, 206, 86, 1)',      // Electricity
          'rgba(75, 192, 192, 1)',      // Food
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
