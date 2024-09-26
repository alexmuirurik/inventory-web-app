'use client'
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { LoadingButton } from '../ui/loadingbutton';

interface sheet {
    btntitle: string, 
    description: string,
    open: boolean, 
    setOpen: Dispatch<SetStateAction<boolean>>,
    children: ReactNode
}

const CustomSheet = ({btntitle, description, open, setOpen, children}: sheet) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <LoadingButton variant="outline" className='bg-teal-500 hover:bg-teal-400 text-gray-200 hover:text-gray-100 font-mono font-bold'>
                    {btntitle}
                </LoadingButton>
            </SheetTrigger>
            <SheetContent>
                { children }
            </SheetContent>
        </Sheet>

    );
}

export default CustomSheet;
