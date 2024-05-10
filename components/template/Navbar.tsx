import React from 'react'
import Image from 'next/image'
import { FaBell } from 'react-icons/fa'
import { Link } from 'lucide-react'
import { auth } from '@/auth'
import { SignOut } from '@/components/auth/auth-components'


const Navbar = async () => {
    const session = await auth()
    const image = session?.user?.image ?? '/assets/img/Ellipse.png'
    return (
        <div className="navbar h-16 border border-gray-300 rounded-lg p-0">
			<div className="flex w-full">
				<div className="flex gap-2 w-7/12 sm:w-8/12 flex-1 ps-4">
					<Image src="/assets/img/Ellipse.png" alt="" width={25} height={25} className='rounded-full' />
                    Dashboard
				</div>
				<div className="w-5/12 sm:w-4/12 flex flex-none ms-auto justify-between md:justify-end mb-2 mt-2 pe-4">
					<div className="dropdown dropdown-end pb-0 md:me-8 mt-1">
						<div role="button" className="rounded">
							<div className="indicator">
								<FaBell />
							</div>
						</div>
						<div className="mt-3 z-[1] card card-compact border border-gray-800 dropdown-content rounded-md w-64 bg-dark-blue shadow">
							<div className="card-body">
								<span className="font-bold text-lg">8 Items</span>
								<span className="text-info">Subtotal: $999</span>
								<div className="card-actions">
									<button className="btn btn-primary btn-block">
										View cart
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="dropdown dropdown-end pb-0 md:me-8 lg:me-0 mt-1">
						<div role="button" className="rounded">
							<div className="indicator">
								<Image className="rounded-full" src={image} alt="" width={20} height={20} />
							</div>
						</div>
						<ul	className="menu menu-sm border border-gray-800 dropdown-content mt-3 z-[1] p-2 shadow bg-dark-blue rounded-md w-56">
							<li>
								<Link href='/profile' className="justify-between">
									{session?.user?.name ?? 'Profile'}
								</Link>
							</li>
							<li>
								<Link href='/settings'>Settings</Link>
							</li>
							<li>
								<Link href='/signout'>Logout</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Navbar