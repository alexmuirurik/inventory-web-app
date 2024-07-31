import React from 'react';
import { Badge } from '../ui/badge';
import WeeklyChart from './weeklychart';
import FolderChart from './folderchart';
import TasksChart from './taskschart';

const TitleCards = () => {
    return (
        <div className='row md:grid-cols-2 lg:grid-cols-4'>
            <div className="col border p-4">
                <h4 className="title font-bold text-gray-800">Weekly Sales</h4>
                <div className="sm:flex items-center">
                    <div className="md:w-5/12">
                        <h3 className='text-2xl md:text-4xl'>$47K</h3>
                        <Badge className='bg-teal-300 hover:bg-teal-400 text-gray-800 text-xs font-semibold'>+3.5%</Badge>
                    </div>
                    <div className="md:w-7/12">
                        <WeeklyChart />
                    </div>
                </div>
            </div>
            <div className="col border p-4">
                <h4 className="title font-bold text-gray-800">Total Folders</h4>
                <div className="sm:flex items-center">
                    <div className="md:w-5/12">
                        <h3 className='text-2xl md:text-4xl'>$47K</h3>
                        <Badge className='bg-teal-300 hover:bg-teal-400 text-gray-800 text-xs font-semibold'>+3.5%</Badge>
                    </div>
                    <div className="md:w-7/12">
                        <FolderChart />
                    </div>
                </div>
            </div>
            <div className="col border p-4">
                <h4 className="title font-bold text-gray-800">Ongoing Tasks</h4>
                <div className="sm:flex items-center">
                    <div className="md:w-5/12">
                        <h3 className='text-2xl md:text-4xl'>$47K</h3>
                        <Badge className='bg-teal-300 hover:bg-teal-400 text-gray-800 text-xs font-semibold'>+3.5%</Badge>
                    </div>
                    <div className="md:w-7/12">
                        <WeeklyChart />
                    </div>
                </div>
            </div>
            <div className="col border p-4">
                <h4 className="title font-bold text-gray-800">Total Payments</h4>
                <div className="sm:flex items-center">
                    <div className="md:w-5/12">
                        <h3 className='text-2xl md:text-4xl'>$47K</h3>
                        <Badge className='bg-teal-300 hover:bg-teal-400 text-gray-800 text-xs font-semibold'>+3.5%</Badge>
                    </div>
                    <div className="md:w-7/12">
                        <TasksChart />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TitleCards;
