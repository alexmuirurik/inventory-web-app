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
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>{btntitle}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}

export default CustomDialog;
