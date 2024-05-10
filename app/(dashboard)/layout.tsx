import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/template/Sidebar'
import Navbar from '@/components/template/Navbar'
import Footer from '@/components/template/Footer'


const DashboardLayout = async ({children}: React.PropsWithChildren) => {
    const session = await auth()
    if(!session?.user) redirect('/login')
    return (
        <main className="main relative w-[calc(100%_-_15rem)] left-52 ms-4 top-px">
            <Sidebar />
            <div className='main-wrapper'>
                <Navbar />
                <div className="container-fluid relative mt-2 min-h-[calc(100vh_-_8.5rem_-_2px)]">
                    {children}
                </div>
                <Footer />                
            </div>
        </main>
    )
}

export default DashboardLayout