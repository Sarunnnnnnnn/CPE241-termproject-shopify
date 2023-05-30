import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);
const PieExample: React.FC = () => {
    const data = {
        labels: ['Furnitures', 'Clothes', 'Gadgets', 'Shoes'],
        datasets: [
          {
            label: '',
            data: [12, 19, 3, 5,],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
        
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(75, 192, 192, 1)',
            
            ],
            borderWidth: 1,
          },
        ],
      };
    
  return (
    <div className= 'w-[300px] h-[300px] ml-[55px] mt-6 '>
      <h1 className='font-general text-[18px] font-medium'>Sales Volume by category </h1>
      <Doughnut data={data} />
    </div>
  );
};

export default PieExample;