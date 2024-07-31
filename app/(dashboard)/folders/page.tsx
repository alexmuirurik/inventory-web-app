import React from 'react'
import PageHeader from '@/components/card/PageHeader'
import { FaFolderOpen } from 'react-icons/fa'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Folders = () => {
    return (
        <div className="page-wrapper">
            <PageHeader title='Folders' description='540+' >
                <div className="flex items-center gap-2">
                    <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                    <Button className="bg-teal-500 hover:bg-teal-700">Add a Folder</Button>
                </div>
            </PageHeader>
            <div className="page-body">
                <div className="row text-gray-600">
                    <Link href='/folders/items-1' className="bg-transparent flex items-center gap-2 p-4 rounded-md border border-gray-300 shadow-sm font-bold">
                        <FaFolderOpen className='' />
                        <h4 className='text-xs'>Folder Title</h4>
                    </Link>
                    <div className="bg-transparent flex items-center gap-2 p-4 rounded-md border border-gray-300 shadow-sm font-bold">
                        <FaFolderOpen className='' />
                        <h4 className='text-xs'>Folder Title</h4>
                    </div>
                    <div className="bg-transparent flex items-center gap-2 p-4 rounded-md border border-gray-300 shadow-sm font-bold">
                        <FaFolderOpen className='' />
                        <h4 className='text-xs'>Folder Title</h4>
                    </div>
                    <div className="bg-transparent flex items-center gap-2 p-4 rounded-md border border-gray-300 shadow-sm font-bold">
                        <FaFolderOpen className='' />
                        <h4 className='text-xs'>Folder Title</h4>
                    </div>
                    <div className="bg-transparent flex items-center gap-2 p-4 rounded-md border border-gray-300 shadow-sm font-bold">
                        <FaFolderOpen className='' />
                        <h4 className='text-xs'>Folder Title</h4>
                    </div>
                    <div className="bg-transparent flex items-center gap-2 p-4 rounded-md border border-gray-300 shadow-sm font-bold">
                        <FaFolderOpen className='' />
                        <h4 className='text-xs'>Folder Title</h4>
                    </div>
                    <div className="bg-transparent flex items-center gap-2 p-4 rounded-md border border-gray-300 shadow-sm font-bold">
                        <FaFolderOpen className='' />
                        <h4 className='text-xs'>Folder Title</h4>
                    </div>
                    <div className="bg-transparent flex items-center gap-2 p-4 rounded-md border border-gray-300 shadow-sm font-bold">
                        <FaFolderOpen className='' />
                        <h4 className='text-xs'>Folder Title</h4>
                    </div>
                    <div className="bg-transparent flex items-center gap-2 p-4 rounded-md border border-gray-300 shadow-sm font-bold">
                        <FaFolderOpen className='' />
                        <h4 className='text-xs'>Folder Title</h4>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Folders