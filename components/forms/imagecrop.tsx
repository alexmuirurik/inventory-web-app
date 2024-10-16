'use client'
import React, { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Imageweploader } from './imageweploader';
import { Button } from '../ui/button';
import { Business, User } from '@prisma/client';
import { useCompanyContext } from '@/context/usecompany';

const ImageCrop = () => {
    const [preview, setPreview] = useState('')
    const {logo, setCompanyLogo} = useCompanyContext()
    const setLogo = () => setCompanyLogo(preview)
    return (
        <Dialog>
            <div className="flex flex-col items-center gap-4 border p-4">
                <DialogTrigger asChild>
                    <Avatar className="h-20 w-20 cursor-pointer hover:ring-2 hover:ring-teal-300">
                        <AvatarImage src={logo} alt='Business Image' />
                        <AvatarFallback className="text-xs text-center font-bold text-slate-950 bg-slate-200">
                            Business Logo
                        </AvatarFallback>
                    </Avatar>
                </DialogTrigger>
                <p className="text-xs text-center text-gray-400">
                    Click logo to change
                </p>
            </div>
            <DialogContent className="bg-white">
                <DialogHeader className="text-sm text-gray-500 mx-auto">
                    Size of the uploaded image will be auto adjusted to fit
                </DialogHeader>
                <div className="flex justify-center">
                    <Imageweploader height={300} width={300} setPreview={setPreview} preview={preview} />
                </div>
                <DialogFooter className="flex gap-4">
                    <DialogClose asChild>
                        <Button className="mr-1" variant={'secondary'}>
                            <span>Cancel</span>
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={setLogo} className="bg-teal-600 outline outline-2 font-semibold" >
                            <span>Confirm</span>
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ImageCrop;
