'use client'
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { LoadingButton } from '../ui/loadingbutton';

interface dialogprops {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    btntitle: string,
    description: string,
    children: ReactNode
}

const CustomDialog = ({ open, setOpen, btntitle, description, children }: dialogprops) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <LoadingButton variant="outline" className='bg-teal-500 hover:bg-teal-400 text-gray-200 hover:text-gray-100 font-mono font-bold'>
                    {btntitle}
                </LoadingButton>
            </DialogTrigger>
            <DialogContent className="bg-neutral-700 border-gray-500">
                <DialogHeader className='flex justify-center items-center'>
                    <DialogTitle className='text-teal-600 font-bold'>{btntitle}</DialogTitle>
                    <DialogDescription className='text-gray-400 text-xs'>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}

export default CustomDialog;
