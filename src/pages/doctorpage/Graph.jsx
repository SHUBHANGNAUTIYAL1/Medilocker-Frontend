import React from 'react';
import { Line } from 'react-chartjs-2';

const BloodPressureChart = ({ bp }) => {
  const data = {
    labels: Array.from({ length: bp.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Blood Pressure',
        data: bp,
        borderColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
      },
    },
  };

  return <Line data={data} options={options} />;
};

// Repeat similar changes for other chart components (SugarChart, HeartRateChart, and PulseChart)


export { BloodPressureChart};
