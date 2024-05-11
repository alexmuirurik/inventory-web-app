import React from 'react'
import PageHeader from '@/components/card/PageHeader'
import { FaFolderOpen } from 'react-icons/fa'
import Link from 'next/link'

const Folders = () => {
    return (
        <div className="page-wrapper">
            <PageHeader title='Folders' description='540+' >
                <div className="flex gap-2">
                    <input type="text" className="input input-sm input-success form-control bg-transparent text-sm ps-11" placeholder="Search"/>
                    <a href="/keen/demo2/apps/file-manager/folders.html" className="btn btn-info bg-teal-500 btn-sm fw-bolder">Add New Folder</a>
                </div>
            </PageHeader>
            <div className="page-body">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-600">
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