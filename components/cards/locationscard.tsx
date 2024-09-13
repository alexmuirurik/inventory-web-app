'use client'
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { FaFileInvoice } from 'react-icons/fa';
import { BusinessLocation } from '@prisma/client';

const LocationsCard = ({locations}: {locations: BusinessLocation[]}) => {
    const [checkbox, setCheckbox] = useState('hidden')
    return (
        <Table>
            <TableBody className='border-t border-gray-200 rounded-lg'>
                {locations.map(location => (
                    <TableRow key={location.id} className='items-center'>
                        <TableCell className='border-e border-gray-200 w-px p-1 pe-2'>
                            <Checkbox className={ checkbox + ' me-2 border-gray-400 data-[state=checked]:bg-teal-600 ' } />
                        </TableCell>
                        <TableCell className="flex items-center gap-2 font-medium capitalize ps-0">
                            <FaFileInvoice className='text-base text-orange-600' />
                            {location.name}
                        </TableCell>
                        <TableCell>{location.country}</TableCell>
                        <TableCell>{location.city}</TableCell>
                        <TableCell className="text-right">{location.address}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default LocationsCard;
