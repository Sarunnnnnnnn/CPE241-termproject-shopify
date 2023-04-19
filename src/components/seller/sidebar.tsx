import React, { FC } from "react";
import { SidebarData } from "./sidebarData";
import Submenu from "./subMenu";


const Sidebar: FC = () => {
  return (
    <div>
        
    <div className="flex">
      <div className="Sidebar my-[50px]">
        <div>
          {SidebarData.map((item, index) => {
            return <Submenu item={item} key={index} />;
          })}
        </div>
      </div>
      <div className="border-r-[1.5px] border-[#AFAFAF] h-[1000px] mt-[50px]"></div>
    </div>
    </div>
  );
};

export default Sidebar;

//<div key ={index} className =''>{ item.icon}

// <div className='ml-3 my-3 '>
//  { item.title}
//  </div>
//   </div>

//import React from 'react'

//flex flex-row text-[16px] text-[#48466D] not-italic font-medium md:font-medium mx-[90px]
//function sidebar() {
//return (
//<h1 className="text-[16px] text-[#48466D] not-italic font-medium md:font-medium my-[120px] mx-[90px] ;
//font-weight: 500;">
//Home

//</h1>
//)
//}
//export default sidebar
