import React from 'react'
import Image from 'next/image'
import SideList from './SideList'

const Sidebar = () => {
    return (
        <aside className="sidebar fixed bg-teal-600 w-56 h-[calc(100vh_-_.5rem)] top-px left-px transition-all delay-300 rounded-lg overflow-hidden">
            <div className="sidebar-head flex items-center h-16 ps-4 border-b border-gray-500">
                <Image src='/assets/img/silver-copyscribers.png' alt='' className='' width={180} height={50} />
            </div>
            <div className="sidebar-body mt-2">
                <ul className="menu menu-sm p-0 text-white">
                    <SideList />
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar