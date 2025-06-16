import React from 'react'
import PageHeader from '@/src/components/layouts/PageHeader'
import { auth } from '@/auth'
import { getBusiness } from '@/src/actions/businessController'
import { redirect } from 'next/navigation'
import AddCategory from '@/src/components/forms/addcategory'
import { getManyCategories } from '@/src/actions/categoryController'
import CategoriesCard from '@/src/components/cards/categoriescard'
import { getLocationById } from '@/src/actions/locationController'

const CategoriesPage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business) return redirect('/settings')

    const businessLocation = await getLocationById(
        session?.user.activeLocation as string
    )
    const categories =
        (await getManyCategories(businessLocation?.id as string)) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader
                title="Categories"
                description={String(categories.length)}
            >
                <input
                    type="text"
                    className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2"
                    placeholder="Search"
                />
                <AddCategory businessLocation={businessLocation} />
            </PageHeader>
            <div className="page-body grid  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                <CategoriesCard categories={categories} />
            </div>
        </div>
    )
}

export default CategoriesPage
