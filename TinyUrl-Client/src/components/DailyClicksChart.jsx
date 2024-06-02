import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserClicksByDayOfWeekChart = ({userId}) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchUserLinks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        const user = response.data.user;
        const links = user.links;
        const clickCountsByDay = Array(7).fill(0);
        links.forEach(link => {
          link.clicks.forEach(click => {

            const dayOfWeek = new Date(click.insertedAt).getDay();
            clickCountsByDay[dayOfWeek] += 1

          });
        });
        const data = {
          labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          datasets: [
            {
              label: 'Number of Clicks',
              data: clickCountsByDay,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                'red',
              ],
              borderColor: '#fff',
              borderWidth: 3,
                         
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
      <Pie data={chartData} />
    </div>
  );
};

export default UserClicksByDayOfWeekChart;
