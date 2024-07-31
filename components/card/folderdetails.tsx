import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import DashFolders from './dashfolders';
import FilesDetails from './filesdetails';

const FolderDetails = () => {
    return (
        <div className="md:flex space-y-4 md:space-y-0 gap-4 mt-4">
            <Card className='bg-transparent md:w-7/12 lg:w-9/12'>
                <CardHeader className='flex-row justify-between border-b py-4'>
                    <CardTitle className='text-base text-gray-800 font-bold'>Your Active Folders </CardTitle>
                    <CardDescription className='text-xs'>View More</CardDescription>
                </CardHeader>
                <CardContent className='px-0'>
                    <DashFolders />
                </CardContent>
            </Card>
            <Card className='bg-transparent md:w-5/12 lg:w-3/12'>
                <CardHeader className='flex-row justify-between border-b py-4'>
                    <CardTitle className='text-base text-gray-800 font-bold'>Folder Items </CardTitle>
                    <CardDescription className='text-xs'>View More</CardDescription>
                </CardHeader>
                <CardContent className='px-0'>
                    <FilesDetails />
                </CardContent>
            </Card>
        </div>
    );
}

export default FolderDetails;
