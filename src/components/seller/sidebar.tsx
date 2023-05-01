import React, { FC } from "react";
import { SidebarData } from "./sidebarData";
import Submenu from "./subMenu";

const Sidebar: FC = () => {
  return (
    <div className="mt-[50px]">
      <div className="flex">
        <div className="Sidebar my-[20px]">
          <div>
            {SidebarData.map((item, index) => {
              return <Submenu item={item} key={index} />;
            })}
          </div>
        </div>
        <div className="border-r-[1.5px] border-[#AFAFAF] h-[800px] mt-[50px] ml-[20px]"></div>
      </div>
    </div>
  );
};

export default Sidebar;
