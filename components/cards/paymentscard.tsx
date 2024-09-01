import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const PaymentsCard = () => {
    return (
        <Card className='bg-transparent'>
            <CardHeader className='flex justify-between py-2'>
                <CardTitle className='text-sm' >Add Funds</CardTitle>
            </CardHeader>
            <CardContent className='bg-gray-200 flex items-center justify-center pt-8 pb-4'>
                <Button className='w-full' > Pay With PayPal</Button>
            </CardContent>
        </Card>
    );
}

export default PaymentsCard;
