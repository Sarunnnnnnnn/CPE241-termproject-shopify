import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SideBarItem } from "../../models/SideBarItem";

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
      <SidebarLink to={item.path}>
        <div
          onClick={showSubnav}
          className="flex flex-row text-[16px] not-italic font-medium md:font-medium ml-[70px] mt-7 mb-5 font-general w-[200px]"
        >
          {item.icon}
          <div className="ml-3.5 basis-[90%]">{item.title}</div>
          <div className="flex flex-row">
            {item?.subNav && subNav ? item?.iconClosed : item?.iconopened}
          </div>
        </div>
      </SidebarLink>
      {subNav &&
        item?.subNav?.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              <div className="w-[250px]">
                <div className="ml-[100px] mb-3 text-[16px] font-general font-medium md:font-medium">
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
