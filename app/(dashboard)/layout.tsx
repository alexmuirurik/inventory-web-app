import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { SignOut } from '@/components/auth/auth-components'
import Sidebar from '@/components/template/Sidebar'
import Navbar from '@/components/template/Navbar'
import Footer from '@/components/template/Footer'


const DashboardLayout = async ({children}: React.PropsWithChildren) => {
    const session = await auth()
    if(!session?.user) redirect('/login')
    return (
        <main className="main">
            <Sidebar />
            <div className='main-wrapper'>
                <Navbar />
                <div className="container-fluid">
                    {children}
                </div>
                <Footer />                
            </div>
        </main>
    )
}

export default DashboardLayout