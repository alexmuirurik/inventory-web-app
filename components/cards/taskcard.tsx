'use client'
import React, { useState } from 'react'
import { TableCell, TableRow } from "@/components/ui/table"
import { FaFileWord } from 'react-icons/fa'
import { Checkbox } from '../ui/checkbox'
import { Folder, Task } from '@prisma/client'
import Link from 'next/link'
import { toTitleCase } from '@/lib/utils'

const TaskCard = ({ folder, tasks }: { folder: Folder, tasks: Task[] | [] }) => {
    const [checked, setChecked] = useState(new Map)
    return tasks.map((task, index) => (
        <TableRow key={task.id} className='border-b items-center'>
            <TableCell className={' hidden border-e border-gray-200 w-px p-1 pe-2'}>
                <Checkbox className='me-2 border-gray-400 data-[state=checked]:bg-teal-600 ' />
            </TableCell>
            <TableCell className="flex items-center font-medium capitalize ps-0">
                <Link className='flex items-center gap-2' href={'/folders/' + folder.slug + '/' + task.slug  }>
                    <FaFileWord className='text-base text-blue-600' />
                    <span className='font-bold'>{task.title}</span>
                </Link>
            </TableCell>
            <TableCell>{task.wordcount} Words</TableCell>
            <TableCell className='text-teal-600 font-semibold'>{toTitleCase(task.status)}</TableCell>
            <TableCell className="text-right">{task.createdAt.toUTCString()}</TableCell>
        </TableRow>
    ))
}

export default TaskCard;
