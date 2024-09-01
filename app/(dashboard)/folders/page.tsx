import React from 'react'
import PageHeader from '@/components/layouts/PageHeader'
import { FaFolderOpen } from 'react-icons/fa'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import AddFolder from '@/components/forms/addfolder'
import { auth } from '@/auth'
import { getCompany } from '@/actions/companyController'
import { redirect } from 'next/navigation'
import FolderCard from '@/components/cards/foldercard'
import { getFolders } from '@/actions/FolderController'

const Folders = async () => {
    const session = await auth()
    const company = await getCompany(session?.user?.id as string)
    if(!company) return redirect('/settings')
    
    const folders = await getFolders(company.id) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title='Folders' description={String(folders.length)} >
                <div className="flex items-center gap-2">
                    <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                    <AddFolder company={company} />
                </div>
            </PageHeader>
            <div className="page-body">
                <div className="row text-gray-600">
                    <FolderCard folders={folders} />
                </div>
            </div>
        </div>

    )
}

export default Folders