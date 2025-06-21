import React from 'react'
import { auth } from '@/auth'
import NavBarMenu from './NavBarMenu'
import { Avatar, AvatarImage } from '../ui/avatar'
import { getLocationById } from '@/src/actions/locationController'
import { getBusiness } from '@/src/actions/businessController'
import SidebarMini from './sidebar-mini'
import { Business, BusinessLocation } from '@prisma/client'

const Navbar = async ({
    business,
    activeLocation,
}: {
    business?: Business | null
    activeLocation?: BusinessLocation
}) => {
    return (
        <div className="navbar h-16 border border-gray-300 rounded-lg p-0">
            <div className="flex items-center w-full">
                <div className="hidden md:flex items-center gap-2 w-7/12 sm:w-8/12 flex-1 ps-4">
                    <Avatar className="h-6 w-6">
                        <AvatarImage
                            className="h-6 w-6"
                            src={business?.logo ?? '/assets/img/Ellipse.png'}
                            alt=""
                        />
                    </Avatar>
                    <span className="hidden sm:block text-sm font-bold ">
                        {activeLocation?.name ?? 'Location Name'}
                    </span>
                </div>
                <SidebarMini />
                <div className="w-5/12 sm:w-4/12 flex flex-none ms-auto justify-end mb-2 mt-2 pe-4">
                    <NavBarMenu />
                </div>
            </div>
        </div>
    )
}

export default Navbar
