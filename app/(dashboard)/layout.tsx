import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/layouts/Sidebar'
import Navbar from '@/components/layouts/Navbar'
import { getBusiness } from '@/actions/businessController'

const DashboardLayout = async ({children}: React.PropsWithChildren) => {
    const session = await auth() 
    if(!session?.user) redirect('/login')
    const business = await getBusiness(session.user.id as string) ?? undefined
    return (
        <main className="main relative md:w-[calc(100%_-_6rem)] lg:w-[calc(100%_-_15rem)] md:left-16 lg:left-52 mx-3 md:mx-0 md:ms-4 top-px">
            <Sidebar business={business}/>
            <div className='main-wrapper'>
                <Navbar />
                <div className="container-fluid relative mt-2 mb-6 min-h-[calc(100vh_-_8.5rem_-_2px)]">
                    {children}
                </div>                
            </div>
        </main>
    )
}

export default DashboardLayout