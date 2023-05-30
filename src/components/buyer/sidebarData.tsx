import React from "react";
import  ArrowUp from '../../assets/ArrowUp.svg'
import  ArrowDown  from '../../assets/ArrowDown.svg'
//import  IconAccount  from '../../assets/Account.svg'
//import  setting  from '../assets/setting.svg'
//import  finan  from '../assets/Finance.svg'
//import  analy from '../../assets/Analytic.svg'
import  product  from '../assets/Product.svg'
import { SideBarItem } from "../../models/SideBarItem";
//import purchase from '../assets/purchase.svg'

export const SidebarData:SideBarItem[] = [
    {
        title: 'My Account',  
     //   icon: <img src={IconAccount} alt="" />,
        iconopened: <img src={ArrowDown} alt="" />,
        iconClosed: <img src={ArrowUp} alt="" />,
        subNav:[
            {
                title: 'My profile',
                path: '/CustomerProfile',
            },
            {
                title: 'My Address',
                path: '/CustomerAddress',
            },
            {
                title: 'My Payment',
                path: '/CustomerPayment',
            },
    
        ]
    },

  
]
