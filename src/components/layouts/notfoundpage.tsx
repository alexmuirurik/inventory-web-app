import React from 'react'
import PageHeader from './PageHeader'
import { Button } from '../ui/button'

const NotFoundPage = () => {
    return (
        <div>
            <PageHeader title="Page Not Found" description="540+">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2"
                        placeholder="Search"
                    />
                    <Button className="w-full bg-teal-500 hover:bg-teal-700">
                        Add Funds
                    </Button>
                </div>
            </PageHeader>
            <div className="flex justify-center items-center pt-12">
                <p className="text-sm font-semibold">
                    <span className="">
                        {' '}
                        We could not find the page you were looking for.{' '}
                    </span>
                    <span className="font-bold text-lg text-teal-800">
                        Are you lost?{' '}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default NotFoundPage
