import React from 'react'
import { Card, CardHeader, CardTitle } from '../ui/card'

const PageHeader = ({title, description, children}: {title: string, description: string, children?:any}) => {
    return (
        <Card className='bg-transparent p-0 border-0 shadow-none'>
            <CardHeader className='flex flex-row items-center justify-between p-0 pb-2'>
                <CardTitle className='text-base'>{title} <small className='text-xs text-gray-400'>{description}</small></CardTitle>
                { children }
            </CardHeader>
        </Card>
    )
}

export default PageHeader