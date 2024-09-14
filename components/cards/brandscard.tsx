'use client'
import { Brand } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { FaFolderOpen } from 'react-icons/fa';

const BrandsCard = ({brands}: {brands: Brand[]}) => {
    return brands.map((brand) =>
        <Link href={'/categories/' + brand.id} key={brand.id} 
            className="bg-transparent flex items-center gap-2 p-4 rounded-md border border-gray-300 shadow-sm font-bold">
            <FaFolderOpen className='' />
            <h4 className='text-xs'>{brand.name}</h4>
        </Link>
    );
}

export default BrandsCard;
