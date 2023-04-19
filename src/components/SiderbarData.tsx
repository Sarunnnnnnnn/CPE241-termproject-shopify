import React from "react";
import  Home  from '../assets/Home.svg'
import  ArrowUp from '../assets/ArrowUp.svg'
import  ArrowDown  from '../assets/ArrowDown.svg'
import  IconOrder  from '../assets/Order.svg'
import  setting  from '../assets/setting.svg'
import  finan  from '../assets/Finance.svg'
import  analy from '../assets/Analytic.svg'
import  product  from '../assets/Product.svg'
import { SideBarItem } from "../models/SideBarItem";

export const SidebarData:SideBarItem[] = [
    {
        title: 'Home',
        path: '/Home',
        icon: <img src={Home} alt="" />,
        
    },

    {
        title: 'Order',  
        icon: <img src={IconOrder} alt="" />,
        iconClosed: <img src={ArrowDown} alt="" />,
        iconopened: <img src={ArrowUp} alt="" />,
        subNav:[
            {
                title: 'My Order',
                path: '/myorder',
                
            },
            {
                title: 'Order History',
                path: '/orderHistory',
            }

        ]
    },

    {
        title: 'Product',
        icon: <img src={product} alt="" />,
        iconClosed: <img src={ArrowDown} alt="" />,
        iconopened: <img src={ArrowUp} alt="" />,
        subNav:[
            {
                title: 'My Products',
                path: '/MyProducts',
                
            },
            {
                title: 'Add New Product',
                path: '/MyProducts/orderHistory',
            },
            {
                title: 'Stock History',
                path: '/Stock History',
            }

        ]
    },
    {
        title: 'Analytics',
        icon: <img src={analy} alt="" />,
        iconClosed: <img src={ArrowDown} alt="" />,
        iconopened: <img src={ArrowUp} alt="" />,
        subNav:[
            {
                title: 'Sales Overview',
                path: '/SalesOverview',
                
            },
            {
                title: 'Shipping Company Score',
                path: '/ShippingCompanyScore',
            },
            {
                title: 'Customer Insight',
                path: '/CustomerInsight',
            }

        ]
    },
    {
        title: 'Finance',
        icon: <img src={finan} alt="" />,
        iconClosed: <img src={ArrowDown} alt="" />,
        iconopened: <img src={ArrowUp} alt="" />,
        subNav:[
            {
                title: 'My Balance',
                path: '/order/myorder',
                
            },
            {
                title: 'Bank Account',
                path: '/Bankaccount',
            }

        ]
    },
    {
        title: 'Setting',
        icon: <img src={setting} alt="" />,
        iconClosed: <img src={ArrowDown} alt="" />,
        iconopened: <img src={ArrowUp} alt="" />,
        subNav:[
            {
                title: 'My Address',
                path: '/MyAddress',
                
            },
            {
                title: 'Shop profile',
                path: '/Shopprofile',
            }

        ]
    },
]