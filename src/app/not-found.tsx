import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/src/components/layouts/Sidebar'
import Navbar from '@/src/components/layouts/Navbar'
import { getBusiness } from '@/src/actions/businessController'
import PageHeader from '@/src/components/layouts/PageHeader'
import { LoadingButton } from '@/src/components/ui/loadingbutton'

const NotFound = async () => {
    const session = await auth()
    if (!session?.user) redirect('/login')
    const business =
        (await getBusiness(session?.user?.id as string)) ?? undefined
    return (
        <main className="main relative md:w-[calc(100%_-_15rem)] md:left-52 mx-3 md:mx-0 md:ms-4 top-px">
            <Sidebar business={business} />
            <div className="main-wrapper">
                <Navbar />
                <div className="container-fluid relative mt-2 mb-6 min-h-[calc(100vh_-_8.5rem_-_2px)]">
                    <div>
                        <PageHeader title="Page Not Found" description="-">
                            <LoadingButton className="bg-teal-500 hover:bg-teal-700 px-8">
                                Back
                            </LoadingButton>
                        </PageHeader>
                        <div className="flex justify-center items-center pt-12">
                            <p className="text-sm font-semibold">
                                <span className="">
                                    {' '}
                                    We could not find the page you were looking
                                    for.{' '}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default NotFound
