import React, { useState } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { cartSchema, comboboxSchema } from '@/prisma/schema';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Brand, Cashier, Category, Customer, Product, Supplier } from '@prisma/client';

interface data { 
    form: UseFormReturn<z.infer<typeof cartSchema>>,
    data: Product[] | Brand[] | Category[] | Supplier[] | Customer[],
    formItem: "productId" | "buyingPrice" | "sellingPrice" | "discount" | "supplierId" | "colors" | `colors.${number}` | `colors.${number}.value` | `colors.${number}.label`
    itemname: string
}
const ComboboxField = ({form, data, formItem, itemname}: data) => {
    const [productId, setProductId] = useState('')
    const onItemSelect = (item: Product | Brand | Category | Supplier | Customer ) => {
        form.setValue(formItem, item.id)
        return setProductId(item.id)
    }
    return (
        <FormField control={form.control} name={formItem} render={({ field }) => (
            <FormItem className="flex items-center w-full ">
                <FormLabel className='text-xs w-1/3'>{ itemname }</FormLabel>
                <Popover>
                    <PopoverTrigger asChild className='flex justify-start w-2/3'>
                        <FormControl>
                            <Button variant="outline" className={"flex justify-start w-full ps-0 " + !field.value && "text-muted-foreground"}>
                                { field.value ? data.find(item => item.id === field.value )?.name : "Select " + itemname }
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command className='w-full'>
                            <CommandInput placeholder={"Search " + itemname + "..."} />
                            <CommandList>
                                <CommandEmpty>{itemname} Not Found.</CommandEmpty>
                                <CommandGroup className='w-full'>
                                    { data.map(item => (
                                        <CommandItem value={item.id} key={item.id} onSelect={() => onItemSelect(item)}>
                                            <Check className={"mr-2 h-4 w-4 " + (item.id !== field.value) && 'opacity-0' }/>
                                            {item.name}
                                        </CommandItem>
                                    )) }
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </FormItem>
        )}
        />
    );
}

export default ComboboxField;
