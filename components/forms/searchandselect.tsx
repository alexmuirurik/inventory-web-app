'use client'
import React, { useState } from "react";
import { Input } from "../ui/input";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

interface selecttypes { 
    onValueChange: (value:string) => void
    title: string, 
    defaultValue?: string | null, 
    list?: { name: string, id: string }[] 
}

const SearchAndSelect = ({ onValueChange, title, defaultValue, list }: selecttypes ) => {
    const [sortlist, setSortList] = useState<{ label: string, value: string }[]>([])
    const [value, setValue] = useState(defaultValue)
    const labels = list?.map(item => ({ label: item.name as string, value: item.id as string }))
    const label = labels?.find(item => item.value === value)?.label
    const handleValueChange = (value: string) => {
        setValue(value)
        onValueChange(value)
        if (!value || value === '') return setSortList(labels ? labels : [])
        const filteredlist = labels?.filter(item => item.label.toLowerCase().includes(value.toLocaleLowerCase()))
        if(filteredlist) setSortList(filteredlist)
    }
    const handleValueClick = async (value: string) => {
        onValueChange(value)
        setValue(value)
        setSortList([])
    }
    return (
        <div className="relative bg-transparent w-full" >
            <Input placeholder={title} onChange={(e) => handleValueChange(e.currentTarget.value)} value={label} defaultValue={label}/>
            {(sortlist.length > 0 ) && <div className='absolute bg-neutral-100 w-full top-11 z-20 ' >
                <ul className={" bg-transparent w-full border py-3 px-1"}>
                    {sortlist.map(item =>
                        <li className="hover:bg-neutral-400 cursor-pointer py-2 px-2" key={item.value} value={item.value} onClick={() => handleValueClick(item.value)}>
                            <span className="text-sm w-full">
                                {item.label}
                            </span>
                        </li>
                    )}
                </ul>
            </div>}
        </div >
    );
}

export default SearchAndSelect