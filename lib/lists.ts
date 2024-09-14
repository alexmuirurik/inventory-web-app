import { FaCreditCard, FaHandHoldingUsd, FaHeartbeat, FaUsers, FaUserTie } from "react-icons/fa";
import { BiQrScan } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { GiBuyCard } from "react-icons/gi";
import { FaChartPie, FaLocationPin } from "react-icons/fa6";
import { MdBusAlert } from "react-icons/md";
import { TbBrandApplePodcast } from "react-icons/tb";

export const routes = [
    {
        icon: FaHeartbeat,
        name: "Overview",
        title: 'Overview',
        link: '/',
    },
    {
        icon: BiQrScan,
        name: "Products",
        title: "Products",
        link: "/products",
    },
    {
        icon: MdCategory,
        name: "Categories",
        title: "Categories",
        link: "/categories",
    },
    {
        icon: TbBrandApplePodcast,
        name: "Brands",
        title: "Brands",
        link: "/brands",
    },
    {
        icon: FaChartPie,
        name: "Sales",
        title: "Sales",
        link: "/sales",
    },
    {
        icon: GiBuyCard,
        name: "Inventory",
        title: "Inventory",
        link: "/inventory",
    },
    {
        icon: FaHandHoldingUsd,
        name: "Invoices",
        title: "Invoices",
        link: "/invoices",
    },
    {
        icon: FaCreditCard,
        name: "Billings",
        title: "Billings",
        link: "/billings",
    },
    {
        icon: FaLocationPin,
        name: "Locations",
        title: "Locations",
        link: "/locations",
    }
]

export const secondaryroutes = [
    {
        icon: FaUserTie,
        name: 'Profile',
        title: "Profile",
        link: '/profile'
    },
    {
        icon: MdBusAlert, 
        name: "Suppliers",
        title: "suppliers",
        link: "/suppliers"
    },
    {
        icon: FaUsers,
        name: 'Clerks',
        title: "Clerks",
        link: '/clerks',
    }
]