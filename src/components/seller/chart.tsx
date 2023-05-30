import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);
const ChartExample: React.FC = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep","Oct","Nov","Dec" ],
    datasets: [
      {
        label: "Revenue",
        data: [600, 2500, 1000, 3000, 2650, 1560, 1100, 2100 , 5000 ,3564 , 1860, 6400],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4
      },
    
    ]
  };
    
  return (
    <div className= 'w-[650px] h-[500px] ml-[55px] mt-6'>
      <h1 className='font-general text-[18px] font-medium'>Monthly Sales</h1>
      <Line data={data}  />
    </div>
  );
};

export default ChartExample;