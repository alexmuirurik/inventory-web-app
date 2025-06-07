import React from 'react';
import { getManyBrands } from '@/src/actions/brandController';
import { getBusiness } from '@/src/actions/businessController';
import { getManyCategories } from '@/src/actions/categoryController';
import { getProductById, getProductInStock } from '@/src/actions/productController';
import { auth } from '@/auth';
import AddCategory from '@/src/components/forms/addcategory';
import PageHeader from '@/src/components/layouts/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { redirect } from 'next/navigation';

const SingleProductPage = async ({ params }: { params: { product: string } }) => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business || business.subscription !== 'active') return redirect('/settings')
    const product = await getProductById(params.product) ?? undefined
    if(!product) redirect('/products')
    const stock = await getProductInStock(session?.user.activeLocation as string, product.id) ?? undefined
    const categories = await getManyCategories(business.id) ?? []
    const brands = await getManyBrands(business.id) ?? []
    return (
        <div className='page-wrapper'>
            <PageHeader title='Products' description={String(1)} >
                <AddCategory business={business} />
            </PageHeader>
            <div className="page-body sm:flex gap-4">
                <Card className='bg-transparent w-8/12 h-fit rounded-md'>
                    <CardHeader className='px-3 py-2 border-b'>
                        <CardTitle className='text-sm'>General Information</CardTitle>
                    </CardHeader>
                    <CardContent className='p-3'>
                    </CardContent>
                </Card>
                <div className="w-4/12 h-fit space-y-4">
                    <Card className='bg-transparent rounded-md'>
                        <CardHeader className='p-3 py-2 border-b'>
                            <CardTitle className='text-sm'>Add Stock</CardTitle>
                        </CardHeader>
                        
                    </Card>
                </div>

            </div>
        </div>
    );
}

export default SingleProductPage;
