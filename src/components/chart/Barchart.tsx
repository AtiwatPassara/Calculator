import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, BarController } from 'chart.js';
import { UserSelection } from '@/app/type/userSelection';
import { transportsData } from '@/app/type/bikeTestData';

interface ImpactBarChartProps {
  userInput: UserSelection | null;
  transportData: transportsData[] | null;
}

Chart.register(Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, BarController);

const ImpactBarChart: React.FC<ImpactBarChartProps> = ({ userInput, transportData }) => {
  const filterByCountry = (countryName: string, transportData: transportsData[]) => {
    const globalData = transportData.filter(item => item.country === 'Global');
    const countryData = transportData.filter(item => item.country === countryName);

    // Create a map of mode to impact for the selected country
    const countryDataMap = new Map(countryData.map(item => [item.mode, item.impact]));

    // Fill in missing categories with global data
    const combinedData = globalData.map(globalItem => {
      const impact = countryDataMap.get(globalItem.mode) || globalItem.impact;
      return { ...globalItem, impact };
    })
    .filter(item => item.impact !== null);

    return combinedData;
  };

  const userCountryName = userInput?.Country?.name || 'Global';

  const filteredData = transportData ? filterByCountry(userCountryName, transportData) : [];

  const otherModesLabels = filteredData.map(t => t.mode);
  const otherModesData = filteredData.map(t => parseFloat(String(t.impact)));

  const bikeLabel = 'Bike';
  let bikeData = userInput?.CalculatedResult.TotalImpact || 0;
  if (userInput?.CalculatedResult?.TotalImpact) {
    bikeData = Math.round(userInput.CalculatedResult.TotalImpact);
  }

  // Combine labels and data
  const labels = [...otherModesLabels, bikeLabel];
  const dataValues = [...otherModesData, bikeData];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Environmental Impact',
        data: dataValues,
        backgroundColor: [
          'rgba(0, 200, 0, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ].slice(0, labels.length),
        borderColor: [
          'rgba(0, 200, 0, 1)',
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
        ].slice(0, labels.length),
        borderWidth: 1,
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
          text: 'gCO2eq/pkm',
          color: 'white',
          font: {
            size: 15,
          },
        },
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', 
        },
      },
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
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
