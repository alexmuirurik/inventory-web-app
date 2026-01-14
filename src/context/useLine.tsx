'use client'

import * as React from 'react'
import { Button } from '../components/ui/button'

const LineContext = React.createContext<{
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}>({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => {},
})

export const LineProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <LineContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </LineContext.Provider>
    )
}

export const OpenLine = ({ title }: { title: string }) => {
    const { setIsOpen, isOpen } = useLine()
    return (
        <Button
            className="bg-teal-500 hover:bg-teal-400 text-gray-200 hover:text-gray-100 w-full sm:w-auto font-mono font-bold"
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? 'Close Line' : title}
        </Button>
    )
}

export const useLine = () => React.useContext(LineContext)
