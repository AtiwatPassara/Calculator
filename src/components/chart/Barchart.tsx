import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, BarController, scales} from 'chart.js';

interface ImpactBarChartProps {
  userInput : UserSelection | null
}

interface Physical{
  gender: string,
  age: number,
  weight: number,
  fitness: number,
  physicalImpact: number,
}

interface Cycling{
  bike: string | null, 
  speed: number,
  duration: number,
  temperature: number | null,
  pressure: number | null,
  bikeImpact: number,
}

interface Diet{
  region: string,
  eating: string, 
  impact: number,
}

interface UserSelection {
  Physical : Physical,
  Cycling : Cycling,
  Diet : Diet,
}


Chart.register( Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, BarController);

const ImpactBarChart: React.FC<ImpactBarChartProps> = ({userInput}) => {

    const labels = ['Bike','Bicycle','Car','Bus'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Diet',
          data: [122,233,344,455],
          backgroundColor: 'rgba(0, 200, 0, 0.2)',
          borderColor : 'rgba(0, 200, 0, 1)',
          borderWidth : 1,
          stack: 'Stack 0',
        },
        {
          label: 'Physical',
          data: [122,233,344,455],
          backgroundColor: 'rgba(255, 200, 0, 0.2)',
          borderColor: 'rgba(255, 200, 0, 1)',
          borderWidth : 1,
          stack: 'Stack 0',
        },
        {
          label: 'Region',
          data: [122,233,344,455],
          backgroundColor: 'rgba(0, 200, 200, 0.2)',
          borderColor: 'rgba(0, 200, 200, 1)',
          borderWidth : 1,
          stack: 'Stack 0',
        },
      ]
    };
  const options = {
    responsive: true,
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
    <div style={{ width: '600px', height: '300px' }}>
      <Bar data={data} options={options} className='p-6'/>
    </div>
  );
};

export default ImpactBarChart;
