import React from "react";
import  ArrowUp from '../assets/ArrowUp.svg'
import  ArrowDown  from '../assets/ArrowDown.svg'
import  IconAccount  from '../assets/Account.svg'
import  setting  from '../assets/setting.svg'
import  finan  from '../assets/Finance.svg'
import  analy from '../assets/Analytic.svg'
import  product  from '../assets/Product.svg'
import { SideBarItem } from "../../models/SideBarItem";
import purchase from '../assets/purchase.svg'

export const SidebarData:SideBarItem[] = [
    {
        title: 'My Account',  
        icon: <img src={IconAccount} alt="" />,
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
                title: 'My Bank Account',
                path: '/CustomerBankAccount',
            },
            {
                title: 'My Card',
                path: '/CustomerCard',
            }
        ]
    },

    {
        title: 'My Purchase',
        icon: <img src={purchase} alt="" />,
        iconopened: <img src={ArrowDown} alt="" />,
        iconClosed: <img src={ArrowUp} alt="" />,
        subNav:[
            {
                title: 'My Purchase',
                path: '/CustomerPurchase',
                
            },
            {
                title: 'My Order',
                path: '/MyOrder',
            },
            {
                title: 'Order History',
                path: '/OrderHistory',
            }

        ]
    },
    {
        title: 'Analytics',
        icon: <img src={analy} alt="" />,
        iconopened: <img src={ArrowDown} alt="" />,
        iconClosed: <img src={ArrowUp} alt="" />,
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
        iconopened: <img src={ArrowDown} alt="" />,
        iconClosed: <img src={ArrowUp} alt="" />,
        subNav:[
            {
                title: 'My Balance',
                path: '/order/myorder',
                
            },
            {
                title: 'My Bank Account',
                path: '/Bankaccount',
            },
            {
                title: 'My Card',
                path: '/MyCard',
            }

        ]
    },
    {
        title: 'Setting',
        icon: <img src={setting} alt="" />,
        iconopened: <img src={ArrowDown} alt="" />,
        iconClosed: <img src={ArrowUp} alt="" />,
        subNav:[
            {
                title: 'My Address',
                path: '/MyAddress',
                
            },
            

        ]
    },
]