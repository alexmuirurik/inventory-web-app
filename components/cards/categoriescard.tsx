'use client'
import { Category } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { FaFolderOpen } from 'react-icons/fa';

const CategoriesCard = ({categories}: {categories: Category[]}) => {
    return categories.map((category) =>
        <Link href={'/categories/' + category.name} key={category.id} 
            className="bg-transparent flex items-center gap-2 p-4 rounded-md border border-gray-300 shadow-sm font-bold">
            <FaFolderOpen className='' />
            <h4 className='text-xs'>{category.name}</h4>
        </Link>
    );
}

export default CategoriesCard;
