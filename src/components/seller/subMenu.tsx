import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SideBarItem } from "../models/SideBarItem";


type SidebarLinkprops = {
  item: SideBarItem;
};
const SidebarLink = styled(Link)``;

const DropdownLink = styled(Link)``;


const Submenu: FC<SidebarLinkprops> = ({ item }) => {
  const [subNav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subNav);
  return (
    <> 
     
     <SidebarLink to={item.path }>
        <div>
          
        </div>
        <div
          onClick={showSubnav}
          className="flex flex-row text-[16px] not-italic font-medium md:font-medium ml-[90px] m-11 w-[200px] font-general"
        >
          {item.icon}
          <div className="ml-3.5 basis-[90%]">{item.title} </div>
          <div className=" flex flex-row ">
            {item?.subNav && subNav ? item?.iconClosed : item?.iconopened}
          </div>
        </div>
        </SidebarLink>
        {subNav &&
          item?.subNav?.map((item, index) => {
            return (
              <DropdownLink to={item.path} key = {index}>
              <div className="">
                <div className="ml-[120px] m-4 text-[16px] font-general not-italic font-medium md:font-medium">
                  {" "}
                  {item.title}{" "}
                </div>
              </div>
              </DropdownLink>
            );
          })}
     
    </>
  );
};

export default Submenu;