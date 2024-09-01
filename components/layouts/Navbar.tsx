import React from 'react'
import Image from 'next/image'
import { auth } from '@/auth'
import PageTitle from './PageTitle'
import NavBarMenu from './NavBarMenu'
import { SignOut } from '../auth/auth-components'
import { Avatar, AvatarImage } from '../ui/avatar'


const Navbar = async () => {
    const session = await auth()
    const image = session?.user?.image ?? '/assets/img/Ellipse.png'
    return (
        <div className="navbar h-16 border border-gray-300 rounded-lg p-0">
			<div className="flex items-center w-full">
				<div className="flex items-center gap-2 w-7/12 sm:w-8/12 flex-1 ps-4">
					<Avatar className='h-6 w-6'>
						<AvatarImage className='h-6 w-6' src='/assets/img/Ellipse.png' alt=""/>
					</Avatar>
                    <PageTitle />
				</div>
				<div className="w-5/12 sm:w-4/12 flex flex-none ms-auto justify-end mb-2 mt-2 pe-4">
					<NavBarMenu />
				</div>
			</div>
		</div>
    )
}

export default Navbar