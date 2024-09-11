'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { routes } from '@/lib/lists'

const PageTitle = () => {
    const pathname = usePathname()
    const pagename = routes.find(route => route.link === pathname)
    return <>{pagename?.name}</>
}

export default PageTitle