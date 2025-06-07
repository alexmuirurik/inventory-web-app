'use client'
import React, { createContext, ReactNode, useContext, useState } from 'react';

const searchContext = createContext({search: '', setSearchTerm : (search: string) => {}})
export const SearchContextProvider = ({children}: {children: ReactNode}) => {
    const [search, setSearch] = useState('')
    const setSearchTerm = (search: string) => setSearch(search)

    return <searchContext.Provider value={{search, setSearchTerm}}>
        { children }
    </searchContext.Provider>
}

export const useSearchContext = () => useContext(searchContext)
