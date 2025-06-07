'use client'
import React from 'react'

const SearchForm = () => {
    return (
        <input
            type="text"
            className="bg-transparent hidden md:block focus-within:!ring-0 border text-sm ps-5 py-2"
            placeholder="Search"
        />
    )
}

export default SearchForm
