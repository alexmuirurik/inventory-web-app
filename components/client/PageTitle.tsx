'use client'
import React from 'react'
import { routes } from '../template/SideList'
import { usePathname } from 'next/navigation'

const PageTitle = () => {
    const pathname = usePathname()
    const pagename = routes.find(route => route.link === pathname)
    return <>{pagename?.name}</>
}

export default PageTitle