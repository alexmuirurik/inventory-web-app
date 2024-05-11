import { DataTableDemo } from '@/actions/getTasksData'
import PageHeader from '@/components/card/PageHeader'
import React from 'react'

const Tasks = () => {
    return (
        <div className="page-wrapper">
            <PageHeader title='Tasks' description='540+' >
                <div className="flex gap-2">
                    <input type="text" className="input input-sm input-success form-control bg-transparent text-sm ps-11" placeholder="Search" />
                    <a href="/keen/demo2/apps/file-manager/folders.html" className="btn btn-info bg-teal-500 btn-sm fw-bolder">Add New Task</a>
                </div>
            </PageHeader>
            <div className="page-body">
                <DataTableDemo />
            </div>
        </div>
    )
}

export default Tasks