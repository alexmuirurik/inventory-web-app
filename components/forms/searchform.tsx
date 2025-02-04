'use client'
import React from 'react'
import { Input } from '../ui/input'
import { useSearchContext } from '@/context/usesearch'

const SearchForm = ({ placeholder }: { placeholder: string }) => {
    const { search, setSearchTerm } = useSearchContext()
    return (
        <Input
            className=""
            onInput={(e) => setSearchTerm(e.currentTarget.value)}
            placeholder={`${placeholder}...`}
        />
    )
}

export default SearchForm
