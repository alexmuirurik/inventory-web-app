import { files } from '@/lib/sampledata';
import React from 'react';

const FilesDetails = () => {
    const img = 'https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg'
    return files.map(file =>
        <div className='flex items-center gap-4 border-b mt-3 p-3'>
            <img className='w-10 h-10 border ' src={img} alt="" />
            <div className="items">
                <h5 className="font-bold text-sm">{file.title}</h5>
                <p>
                    <span className='text-xs text-gray-700 me-1'>Antony</span>
                    <span className='text-xs'>Yesterday at 1:30PM</span>
                </p>
            </div>
        </div>
    );
}

export default FilesDetails;
