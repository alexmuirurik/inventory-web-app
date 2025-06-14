import { cn } from '@/src/lib/utils'
import React from 'react'

const DialogPagigation = ({
    pages,
    current,
}: {
    pages: number
    current: number
}) => {
    let pg = 0
    while (pg < pages) {
        return (
            <div key={pg} className="flex items-center">
                <div
                    className={cn(
                        'w-4 h-4 rounded-full transition-all duration-300 ease-in-out',
                        pg <= current ? 'bg-primary' : 'bg-primary/30',
                        pg <= current && 'bg-primary'
                    )}
                />
                <div className="flex items-center">
                    <div
                        className={cn(
                            'w-8 h-0.5',
                            pg < current ? 'bg-primary' : 'bg-primary/30'
                        )}
                    />
                    <div
                        className={cn(
                            'w-4 h-4 rounded-full transition-all duration-300 ease-in-out',
                            pg < current ? 'bg-primary' : 'bg-primary/30',
                            pg < current && 'bg-primary'
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default DialogPagigation
