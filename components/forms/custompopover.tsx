import React, { ReactNode } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Input } from '../ui/input';

export const CustomPopover = ({ children }: { children: ReactNode }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Input className='border' placeholder='Search Product' />
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                {children}
            </PopoverContent>
        </Popover>
    );
}

