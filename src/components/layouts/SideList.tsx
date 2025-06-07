'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { routes } from '@/src/lib/lists'

const SideList = () => {
    const pathname = usePathname()
    const newpath = pathname.split('/')
    return routes.map((route) => {
        const routepath = route.link.split('/')
        const isActive =
            pathname === route.link || newpath.at(1) === routepath.at(1)
                ? 'active'
                : ''
        return (
            <li
                key={route.link}
                className={
                    isActive +
                    ' flex [&.active]:sidebar-active hover:sidebar-active mt-1'
                }
            >
                <Link
                    className="bg-transparent relative flex items-center w-full text-sm font-mono font-semibold mx-4 px-2 py-4"
                    href={route.link}
                >
                    <route.icon className="relative float-left text-center w-8.5 mr-4 text-xl" />
                    <span className="hidden group-hover:block lg:block">
                        {route.name}
                    </span>
                </Link>
            </li>
        )
    })
}

export default SideList
