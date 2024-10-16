'use client'
import React, { useState } from 'react';
import { Input } from '../ui/input';
import FileResizer from 'react-image-file-resizer';
import Image from 'next/image';

const ChooseImage = ({image}: {image: string}) => {
    const [preview, setPreview] = useState(image)
    return (
        <div className="flex items-center gap-8 rounded-sm py-1 w-full cursor-pointer"
            onClick={() => document.getElementById('image')?.click()}>
            <Input id="image" type='file' accept="image/*" className="hidden" onChange={async (e) => {
                const file = e?.target?.files?.[0]
                FileResizer.imageFileResizer(file as File, 300, 300, "JPEG", 100, 0, (url) => { setPreview(url as string) }, "base64")
            }} />
            {preview !== '' ? 
                <div className='w-full'>
                    <Image className='!static w-fit !h-40' src={preview ?? '/uploads/1.jpg'} alt='' fill />
                    <span className="text-xs">Change Image</span>
                </div>
            :
                <span className="bg-transparent text-center text-gray-600 text-sm rounded-sm w-full">
                    Choose an Image
                </span>
            }
        </div>
    );
}

export default ChooseImage;
