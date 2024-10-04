'use client'
import React, { Dispatch, SetStateAction, useState } from "react";
import { Command, CommandInput, CommandItem, CommandList } from "../ui/command";
import { useCheckoutContext } from "@/context/usecheckout";
import { addProductToCart } from "@/actions/salesController";

interface ICommandProps { 
    setLoading: Dispatch<SetStateAction<boolean>>, 
    locationId: string,
    confirmList: any[], 
    list: any[] 
}

const SelectAndAdd = ({ confirmList, setLoading, locationId, list }: ICommandProps) => {
    const [sortlist, setSortList] = useState<{ label:string, value:string }[]>([])
    const { products, setProductId } = useCheckoutContext()
    const handleValueChange = (value: string) => {
        if(!value || value === '') return setSortList([])
        const labels = list.map(item => ({ label: item.name as string, value: item.id as string }))
        const usedlabels = confirmList.map(item => ({ label: item.name as string, value: item.id as string }))
        const sorteditems = labels.filter(item => !!usedlabels.includes(item))
        const filteredlist = sorteditems.filter(item => item.label.toLowerCase().includes(value.toLocaleLowerCase()))
        setSortList(filteredlist)
    }
    const handleValueClick = async (productId:string) => {
        setLoading(true)
        const addtocart = await addProductToCart(locationId, productId, 1)
        if (!addtocart) return
        setProductId(productId, 1)
        const sortedlist = sortlist.filter(item => item.value !== productId)
        setLoading(false)
        setSortList(sortedlist)
    }
    return (
        <Command className="" >
            <CommandInput  placeholder="Search Product..." onValueChange={handleValueChange} />
                <CommandList>
                    {sortlist.map( item =>
                        <CommandItem className="cursor-pointer" key={item.value} value={item.value}>
                            <span className="w-full" onClick={() => handleValueClick(item.value) }>
                                {item.label}
                            </span>
                        </CommandItem>
                    )} 
                </CommandList>
        </Command>
    );
}

export default SelectAndAdd