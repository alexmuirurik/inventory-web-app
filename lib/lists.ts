import { FaCreditCard, FaHandHoldingUsd, FaHeartbeat, FaUsers, FaUserTie } from "react-icons/fa";
import { BiQrScan } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
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
        icon: MdOutlineDashboardCustomize,
        name: "Order Line",
        title: "Order Line",
        link: "/order-line",
    },
    {
        icon: BiQrScan,
        name: "Products",
        title: "Products",
        link: "/products",
    },
    {
        icon: MdCategory,
        name: "Category",
        title: "Category",
        link: "/categories",
    },
    {
        icon: TbBrandApplePodcast,
        name: "Arrears",
        title: "Arrears",
        link: "/arrears",
    },
    {
        icon: FaHandHoldingUsd,
        name: "Reports",
        title: "Reports",
        link: "/reports",
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

export const FRAMEWORKS = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
    {
        value: "wordpress",
        label: "WordPress",
    },
    {
        value: "express.js",
        label: "Express.js",
    },
    {
        value: "nest.js",
        label: "Nest.js",
    },
]