import  Home  from '../../assets/Home.svg'
import  ArrowUp from '../../assets/ArrowUp.svg'
import  ArrowDown  from '../../assets/ArrowDown.svg'
import  IconOrder  from '../../assets/Order.svg'
import  setting  from '../../assets/setting.svg'
import  finan  from '../../assets/Finance.svg'
import  analy from '../../assets/Analytic.svg'
import  product  from '../../assets/Product.svg'
import { SideBarItem } from "../../models/SideBarItem";

export const SidebarData:SideBarItem[] = [
    {
        title: 'Home',
        path: '/homeSeller',
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
                path: '/myOrder',
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
                path: '/myProducts',
            },
            {
                title: 'Add New Product',
                path: '/addNewProduct',
            },
            {
                title: 'Stock History',
                path: '/stockHistory',
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
                path: '/salesOverview',
            },
            {
                title: 'Shipping Company Score',
                path: '/shippingCompanyScore',
            },
            {
                title: 'Customer Insight',
                path: '/customerInsight',
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
                path: '/myBalance',
            },
            {
                title: 'Bank Account',
                path: '/bankAccount',
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
                path: '/myAddress',
            },
            {
                title: 'Shop profile',
                path: '/shopProfile',
            }
        ]
    },
]
