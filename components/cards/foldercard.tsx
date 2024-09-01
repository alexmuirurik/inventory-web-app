import React from 'react';
import Link from 'next/link';
import { FaFolderOpen } from 'react-icons/fa';
import { Folder } from '@prisma/client';

const FolderCard = ({folders}: {folders: Folder [] | [] }) => {
    return folders.map((folder) =>
        <Link href={'/folders/' + folder.slug} key={folder.id} 
            className="bg-transparent flex items-center gap-2 p-4 rounded-md border border-gray-300 shadow-sm font-bold">
            <FaFolderOpen className='' />
            <h4 className='text-xs'>{folder.title}</h4>
        </Link>
    );
}

export default FolderCard;
