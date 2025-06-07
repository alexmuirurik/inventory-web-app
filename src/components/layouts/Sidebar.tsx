import React from 'react'
import SideList from './SideList'
import { PiBankBold } from "react-icons/pi";
import { Business } from '@prisma/client';

const Sidebar = async ({business}: {business: Business | undefined}) => { 
    return (
        <aside className="fixed hidden md:block bg-teal-600 md:w-16 lg:w-52 h-[calc(100vh_-_.5rem)] border border-gray-300 top-px left-px rounded-lg overflow-hidden hover:w-52 group hover:z-50">
            <div className="sidebar-head flex items-center gap-4 text-lg text-gray-200 font-bold font-mono h-16 ps-5 border-b border-gray-300">
                <PiBankBold className='h-6 w-6' />
                <span className='hidden group-hover:block lg:block text-sm'>{business?.name ?? ''}</span>
            </div>
            <div className="sidebar-body mt-2">
                <ul className="flex flex-col p-0 text-white">
                    <SideList />
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar