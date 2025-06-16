import React from 'react';
import PageHeader from '@/src/components/layouts/PageHeader';
import { auth } from '@/auth';
import { getBusiness } from '@/src/actions/businessController';
import { redirect } from 'next/navigation';
import AddCategory from '@/src/components/forms/addcategory';
import { getManyCategories } from '@/src/actions/categoryController';
import CategoriesCard from '@/src/components/cards/categoriescard';

const CategoriesPage = async () => {
    const session = await auth()
    
    return (
        <div className="page-wrapper">
            <PageHeader title='Categories' description={String('')} >
                <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                <AddCategory business={undefined} />
            </PageHeader>
            <div className="page-body grid  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                <CategoriesCard categories={[]} />
            </div>
        </div>
    );
}

export default CategoriesPage;
