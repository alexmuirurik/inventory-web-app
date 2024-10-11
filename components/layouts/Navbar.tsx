import React from 'react'
import { auth } from '@/auth'
import NavBarMenu from './NavBarMenu'
import { Avatar, AvatarImage } from '../ui/avatar'
import { getUser } from '@/actions/userController'
import { getLocationById } from '@/actions/locationController'
import { getBusiness } from '@/actions/businessController'


const Navbar = async () => {
    const session = await auth()
	const activelocation = await getLocationById(session?.user?.activeLocation as string)
	const business = await getBusiness(session?.user?.id as string) ?? undefined
    return (
        <div className="navbar h-16 border border-gray-300 rounded-lg p-0">
			<div className="flex items-center w-full">
				<div className="flex items-center gap-2 w-7/12 sm:w-8/12 flex-1 ps-4">
					<Avatar className='h-6 w-6'>
						<AvatarImage className='h-6 w-6' src={business?.logo ?? '/assets/img/Ellipse.png'} alt=""/>
					</Avatar>
                    <span className='hidden sm:block text-sm font-bold '>{ activelocation?.name ?? 'Location Name' }</span>
				</div>
				<div className="w-5/12 sm:w-4/12 flex flex-none ms-auto justify-end mb-2 mt-2 pe-4">
					<NavBarMenu />
				</div>
			</div>
		</div>
    )
}

export default Navbar