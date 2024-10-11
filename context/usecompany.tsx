'use client'
import { Business } from '@prisma/client';
import React, { createContext, ReactNode, useContext, useState } from 'react';

const companyContext = createContext({logo: '', setCompanyLogo : (logo: string) => {}})
export const CompanyContextProvider = ({children, business}: {children: ReactNode, business?: Business }) => {
    const [logo, setCompanyLogo] = useState(business?.logo as string)
    return <companyContext.Provider value={{logo, setCompanyLogo}}>
        { children }
    </companyContext.Provider>
}

export const useCompanyContext = () => useContext(companyContext)
