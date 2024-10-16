import React from 'react';
import { getManyBrands } from '@/actions/brandController';
import { getBusiness } from '@/actions/businessController';
import { getManyCategories } from '@/actions/categoryController';
import { getProductById } from '@/actions/productController';
import { auth } from '@/auth';
import AddBrand from '@/components/forms/addbrand';
import AddCategory from '@/components/forms/addcategory';
import AddStock from '@/components/forms/addstock';
import EditProduct from '@/components/forms/editproduct';
import PageHeader from '@/components/layouts/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { redirect } from 'next/navigation';

const SingleProductPage = async ({ params }: { params: { product: string } }) => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business || business.subscription !== 'active') return redirect('/settings')
    const product = await getProductById(params.product) ?? undefined
    if(!product) redirect('/products')
    const categories = await getManyCategories(business.id) ?? []
    const brands = await getManyBrands(business.id) ?? []
    return (
        <div className='page-wrapper'>
            <PageHeader title='Products' description={String(1)} >
                <AddCategory business={business} />
                <AddBrand business={business} />
            </PageHeader>
            <div className="page-body sm:flex gap-4">
                <Card className='bg-transparent w-8/12 h-fit rounded-md'>
                    <CardHeader className='px-3 py-2 border-b'>
                        <CardTitle className='text-sm'>General Information</CardTitle>
                    </CardHeader>
                    <CardContent className='p-3'>
                        <EditProduct brands={brands} categories={categories} product={product} />
                    </CardContent>
                </Card>
                <div className="w-4/12 h-fit space-y-4">
                    <Card className='bg-transparent rounded-md'>
                        <CardHeader className='p-3 py-2 border-b'>
                            <CardTitle className='text-sm'>Add Stock</CardTitle>
                        </CardHeader>
                        <CardContent className='p-3'>
                            <AddStock product={product} businessLocationId={session?.user.activeLocation as string} />
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}

export default SingleProductPage;
