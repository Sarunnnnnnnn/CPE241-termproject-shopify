import React from 'react';
import ChartExample from '../../components/seller/chart';
import PieExample from '../../components/seller/pie';

const ChartPage: React.FC = () => {
  return (
  
    <div className='font-general text-[24px] font-medium ml-[55px] mt-[120px] '> Sales Overview 
    <div className='mt-[10px] flex'>
      <ChartExample />
      <PieExample />
    </div>
    </div>
  );
};

export default ChartPage;