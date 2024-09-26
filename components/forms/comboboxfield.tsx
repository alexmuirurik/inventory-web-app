import React, { useState } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { cartSchema, comboboxSchema } from '@/prisma/schema';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Brand, BusinessLocation, Cashier, Category, Customer, Product, Supplier } from '@prisma/client';

interface data {itemname: string, field: any, form: any, data: BusinessLocation[] | Product []  }
const ComboboxField = ({itemname, field, form, data}: data) => {
    const [productId, setProductId] = useState('')
    const onItemSelect = (name: string, item: Product | Brand | Category | Supplier | Customer) => {
        form.setValue(name, item.id)
        return setProductId(item.id)
    }
    return (
        <Popover>
            <PopoverTrigger asChild className='w-full'>
                <FormControl>
                    <Button variant="outline" className={"flex justify-start w-full ps-0 " + !field.value && "text-muted-foreground"}>
                        {field.value ? data.find(item => item.id === field.value)?.name : "Select " + itemname}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full z-50 p-0">
                <Command className='w-full'>
                    <CommandInput placeholder={"Search " + itemname + "..."} />
                    <CommandList>
                        <CommandEmpty>{itemname} Not Found.</CommandEmpty>
                        <CommandGroup className='w-full'>
                            {data.map(item => (
                                <CommandItem value={item.id} key={item.id} onSelect={() => onItemSelect(field.name, item)}>
                                    <Check className={"mr-2 h-4 w-4 " + (item.id !== field.value) && 'opacity-0'} />
                                    {item.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>

    );
}

export default ComboboxField;
