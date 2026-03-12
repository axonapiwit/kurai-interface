import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Financial Overhead', 'Bonus & Fund', 'IT Infrastructure', 'Gift Code Inventory'],
  datasets: [
    {
      data: [73, 55, 38, 21],
      label: 'Allocation %',
      backgroundColor: [
        'rgba(32, 129, 226, 0.25)',
        'rgba(124, 58, 237, 0.25)',
        'rgba(5, 150, 105, 0.25)',
        'rgba(217, 119, 6, 0.25)',
      ],
      borderColor: [
        'rgba(32, 129, 226, 1)',
        'rgba(124, 58, 237, 1)',
        'rgba(5, 150, 105, 1)',
        'rgba(217, 119, 6, 1)',
      ],
      borderWidth: 2,
    },
  ],
};

export default function DonutChart() {
  return <Doughnut data={data} />;
}