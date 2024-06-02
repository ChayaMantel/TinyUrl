import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LinkClicksBySourceChart = ({url}) => {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const fetchClicks = async () => {
      try {
        const response = await axios.get(`${url}/clicks`);
        const dataLink = response.data;
        const label = Object.keys(dataLink);
        const value = Object.values(dataLink);

        const data = {
          labels: label,
          datasets: [
            {
              label: 'Number of Clicks',
              data: value,
              backgroundColor: 'blue',
              borderColor: 'rgba(75, 192, 192, 0.6)',
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error('Error fetching user links:', error);
      }
    };

    fetchClicks();
  }, []);


  const chartOptions = {
    scales: {
      y: {
        type: 'linear', 
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Clicks on Links</h2>
      <Bar data={chartData} options={chartOptions}/>
    </div>
  );
};

export default LinkClicksBySourceChart;
