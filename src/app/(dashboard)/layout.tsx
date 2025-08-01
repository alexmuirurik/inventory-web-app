import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/src/components/layouts/Sidebar'
import Navbar from '@/src/components/layouts/Navbar'
import { getBusiness } from '@/src/actions/businessController'

const DashboardLayout = async ({ children }: React.PropsWithChildren) => {
    const session = await auth()
    if (!session?.user) redirect('/login')
    const business = await getBusiness(session.user.id)
    const activelocation = business?.locations.find(
        (location) => location.id === session.user.activeLocation
    )
    return (
        <main
            id="main"
            className="relative md:w-[calc(100%_-_6rem)] lg:w-[calc(100%_-_15rem)] md:left-16 lg:left-52 mx-3 md:mx-0 md:ms-4 top-px"
            sidebar-mini="hidden"
        >
            <Sidebar business={business} />
            <div id="main-wrapper">
                <Navbar business={business} activeLocation={activelocation} />
                <div className="container-fluid relative mt-2 mb-6 min-h-[calc(100vh_-_8.5rem_-_2px)]">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default DashboardLayout
