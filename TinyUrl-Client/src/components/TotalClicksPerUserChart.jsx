import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; 

Chart.register(...registerables); 


const UserClicksChart = ({userId}) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchUserLinks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        const user = response.data.user;
        const links = user.links;
        const linkClickCounts = links.map(link => ({
          originalUrl: link.originalUrl,
          clickCount: link.clicks.length,
        }));
        const data = {
          labels: linkClickCounts.map(link => link.originalUrl),
          datasets: [
            {
              label: 'Number of Clicks',
              data: linkClickCounts.map(link => link.clickCount),
              backgroundColor: 'red',
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

    fetchUserLinks();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Clicks on Links</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default UserClicksChart;
