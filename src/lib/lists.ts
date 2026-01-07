import {
    FaHandHoldingUsd,
    FaHeartbeat,
    FaUsers,
    FaUserTie,
} from 'react-icons/fa'
import { BiQrScan } from 'react-icons/bi'
import { MdCategory } from 'react-icons/md'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { FaLocationPin } from 'react-icons/fa6'
import { MdBusAlert } from 'react-icons/md'

export const routes = [
    {
        icon: FaHeartbeat,
        name: 'Overview',
        title: 'Overview',
        link: '/',
    },
    {
        icon: MdOutlineDashboardCustomize,
        name: 'Sales Line',
        title: 'Sales Line',
        link: '/sales-line',
    },
    {
        icon: BiQrScan,
        name: 'Products',
        title: 'Products',
        link: '/products',
    },
    {
        icon: FaHandHoldingUsd,
        name: 'Stocks Line',
        title: 'Stocks Line',
        link: '/stocks-line',
    },
    {
        icon: MdCategory,
        name: 'Categories',
        title: 'Categories',
        link: '/categories',
    },
    {
        icon: FaLocationPin,
        name: 'Locations',
        title: 'Locations',
        link: '/locations',
    },
]

export const secondaryroutes = [
    {
        icon: FaUserTie,
        name: 'Profile',
        title: 'Profile',
        link: '/profile',
    },
    {
        icon: MdBusAlert,
        name: 'Suppliers',
        title: 'suppliers',
        link: '/suppliers',
    },
    {
        icon: FaUsers,
        name: 'Clerks',
        title: 'Clerks',
        link: '/clerks',
    },
]

export const FRAMEWORKS = [
    {
        value: 'next.js',
        label: 'Next.js',
    },
    {
        value: 'sveltekit',
        label: 'SvelteKit',
    },
    {
        value: 'nuxt.js',
        label: 'Nuxt.js',
    },
    {
        value: 'remix',
        label: 'Remix',
    },
    {
        value: 'astro',
        label: 'Astro',
    },
    {
        value: 'wordpress',
        label: 'WordPress',
    },
    {
        value: 'express.js',
        label: 'Express.js',
    },
    {
        value: 'nest.js',
        label: 'Nest.js',
    },
]
