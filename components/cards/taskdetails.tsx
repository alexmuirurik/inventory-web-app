import React from 'react';
import { Folder, Task } from '@prisma/client';

const TaskDetails = ({ folder, task }: { folder: Folder, task: Task }) => {
    return (
        <div className="left">
            <div className='border mb-4'>
                <div className="flex gap-8 ps-4 pt-4 pb-4">
                    <div className="w-5/12 item">
                        <h4 className='font-bold underline'>Folder</h4>
                        <p className='text-sm'>{folder.title}</p>
                    </div>
                    <div className="w-full task">
                        <h4 className='font-bold underline'>Task</h4>
                        <p className='text-xs'>{task.title}</p>
                    </div>
                </div>
                <div className="flex gap-8 ps-4 pb-4">
                    <div className="w-5/12 item">
                        <h4 className='font-bold underline'>Deadline</h4>
                        <p className='text-sm'>{task.deadline + ' Days'}</p>
                    </div>
                    <div className="w-full task">
                        <h4 className='font-bold underline'>WordCount</h4>
                        <p className='text-xs'>{task.wordcount + ' Words'}</p>
                    </div>
                </div>
            </div>
            <div className="border p-4">
                <div className="content text-sm">
                    <p>{task.instructions}</p>
                </div>
            </div>
        </div>

    );
}

export default TaskDetails;
