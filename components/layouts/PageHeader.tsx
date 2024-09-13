import React from 'react'
import { Card, CardHeader, CardTitle } from '../ui/card'

const PageHeader = ({title, description, children}: {title: string, description: string, children?:any}) => {
    return (
        <Card className='bg-transparent p-0 border-0 shadow-none'>
            <CardHeader className='block sm:flex flex-row items-center justify-between p-0 pb-2'>
                <CardTitle className='flex items-center gap-2 text-base'>
                        <span className='font-mono font-bold'>{title}</span>
                        <small className='text-xs text-gray-400'>{description}</small>
                </CardTitle>
                <div className="flex justify-between sm:justify-end sm:gap-2 w-full md:w-6/12">
                    { children }
                </div>
            </CardHeader>
        </Card>
    )
}

export default PageHeader