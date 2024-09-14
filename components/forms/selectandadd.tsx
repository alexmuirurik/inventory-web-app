"use client"
import React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { FormControl } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover" 
import { Brand, Category, Tag } from "@prisma/client"
import { UseFormReturn } from "react-hook-form"

const SelectAndAdd = ({ list, form, formItem, field}: {list: Category[] | Brand[] | Tag[], form: any, formItem: string, field: any } ) => {
    const labels =  list.map(item => ({ label: item.name, value: item.id }))

    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button variant="outline" role="combobox">
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                            {labels.map(item => 
                                <CommandItem value={item.label} key={item.value} onSelect={() => { form.setValue(formItem, item.value ) }} >
                                    <Check className={"mr-2 h-4 w-4" + item.value === field.value ? "opacity-100" : "opacity-0" } />
                                    {item.label}
                                </CommandItem>)}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default SelectAndAdd