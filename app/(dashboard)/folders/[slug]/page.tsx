import React from 'react'
import CardTasks from '@/components/cards/CardTasks'
import PageHeader from '@/components/layouts/PageHeader'
import AddTask from '@/components/forms/addtask'
import { auth } from '@/auth'
import { getCompany } from '@/actions/companyController'
import { notFound, redirect } from 'next/navigation'
import { getSingleFolder } from '@/actions/FolderController'
import { Table, TableBody, TableCaption } from '@/components/ui/table'
import TaskCard from '@/components/cards/taskcard'
import { getFolderTasks } from '@/actions/taskController'

const SingleFolder = async ({ params }: { params: { slug: string } }) => {
    const session = await auth()
    const company = await getCompany(session?.user?.id as string)
    if (!company) return redirect('/settings')

    const folder = await getSingleFolder(params.slug)
    if (!folder) return notFound()
    
    const tasks = await getFolderTasks(folder.id) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title='Tasks' description={String(tasks.length)} >
                <div className="flex items-center gap-2">
                    <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                    <AddTask company={company} folder={folder} />
                </div>
            </PageHeader>
            <div className="page-body">
                <Table>
                    <TableBody className='border-t border-gray-200 rounded-md'>
                        <TaskCard folder={folder} tasks={tasks} />
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default SingleFolder