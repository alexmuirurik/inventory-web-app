import React from 'react'
import Link from 'next/link';
import { FaCommentsDollar, FaCreditCard, FaFileWord, FaFolder,FaHandHoldingUsd,FaHeartbeat, FaUsers } from 'react-icons/fa';
import { headers } from 'next/headers';

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
        name: "Projects",
        title: "Cyber Threat Posture",
        link: "/projects",
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
    const reqheaders = headers().get("x-forwarded-host")
    return routes.map(route => {
        const isActive = ( reqheaders?.includes(route.link) ) ? 'active' : ''
        return <li className={isActive + ' flex [&.active]:sidebar-active hover:sidebar-active mt-1 py-4'}>
            <Link className='relative flex items-center bg-transparent text-sm font-sans mx-4 px-2' href={route.link}>
                {route.icon}
                {route.name}
            </Link>
        </li>
    })
}

export default SideList