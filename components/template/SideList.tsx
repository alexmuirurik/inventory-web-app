'use client'
import React from 'react'
import Link from 'next/link';
import { FaCommentsDollar, FaCreditCard, FaFolder,FaHandHoldingUsd,FaHeartbeat, FaUsers } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export type Route = {
    icon: any;
    name: string;
    title: string;
    link: string;
};

export const routes: Route[] = [
    {
        icon: <FaHeartbeat className='relative float-left text-center w-8.5 mr-4 text-xl' />,
        name: "Overview",
        title: 'Overview',
        link: "/",
    },
    {
        icon: <FaFolder className='relative float-left text-center w-8.5 mr-4 text-xl' />,
        name: "Folders",
        title: "Folders",
        link: "/folders",
    },
    {
        icon: <FaUsers className='relative float-left text-center w-8.5 mr-4 text-xl' />,
        name: "Writers",
        title: "Writers",
        link: "/writers",
    },
    {
        icon: <FaCommentsDollar className='relative float-left text-center w-8.5 mr-4 text-xl' />,
        name: "Messages",
        title: "Messages",
        link: "/messages",
    },
    {
        icon: <FaHandHoldingUsd className='relative float-left text-center w-8.5 mr-4 text-xl' />,
        name: "Invoices",
        title: "Invoices",
        link: "/invoices",
    },
    {
        icon: <FaCreditCard className='relative float-left text-center w-8.5 mr-4 text-xl' />,
        name: "Billings",
        title: "Billings",
        link: "/billings",
    }
]

const SideList = () => {
    const pathname = usePathname()
    return routes.map(route => {
        const isActive = ( pathname === route.link ) ? 'active' : ''
        return <li className={isActive + ' flex [&.active]:sidebar-active hover:sidebar-active mt-1'}>
            <Link className='bg-transparent relative flex items-center w-full text-sm font-mono font-semibold mx-4 px-2 py-4' href={route.link}>
                {route.icon}
                {route.name}
            </Link>
        </li>
    })
}

export default SideList