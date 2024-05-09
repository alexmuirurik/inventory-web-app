import React from 'react'
import Link from 'next/link';
import { FaFileWord, FaFolder, FaHeart, FaHeartbeat, FaUserTie, FaUsers } from 'react-icons/fa';

export type Route = {
    icon: any;
    name: string;
    title: string;
    link: string;
};

export const routes: Route[] = [
    {
        icon: <FaHeartbeat className='me-2' />,
        name: "Overview",
        title: 'Overview',
        link: "/",
    },
    {
        icon: <FaFolder className='me-2' />,
        name: "Projects",
        title: "Cyber Threat Posture",
        link: "/projects",
    },
    {
        icon: <FaFileWord className='me-2' />,
        name: "Tasks",
        title: "Tasks",
        link: "/tasks",
    },
    {
        icon: <FaUsers className='me-2' />,
        name: "Risk Alert",
        title: "Risk Alert",
        link: "/riskalert",
    }
]

const SideList = () => {
    return routes.map(route => 
        <li className='[&.active]:sidebar-active hover:sidebar-active mt-1 ps-4 py-3'>
            <Link className='hover:bg-transparent text-md font-semibold font-sans' href={route.link}>
                {route.icon}
                {route.name}
            </Link>
        </li>
    )
}

export default SideList