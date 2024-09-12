import { FaCreditCard, FaHandHoldingUsd, FaHeartbeat, FaUsers, FaUserTie } from "react-icons/fa";
import { BiQrScan } from "react-icons/bi";
import { GiBuyCard } from "react-icons/gi";
import { FaChartPie, FaLocationPin } from "react-icons/fa6";
import { MdBusAlert } from "react-icons/md";

export const routes = [
    {
        icon: FaHeartbeat,
        name: "Overview",
        title: 'Overview',
        link: "/",
    },
    {
        icon: BiQrScan,
        name: "Inventory",
        title: "Inventory",
        link: "/inventory",
    },
    {
        icon: FaChartPie,
        name: "Sales",
        title: "Sales",
        link: "/sales",
    },
    {
        icon: GiBuyCard,
        name: "Purchases",
        title: "Purchases",
        link: "/purchases",
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