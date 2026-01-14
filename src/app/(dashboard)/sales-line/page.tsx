import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getManyProducts } from '@/src/actions/productController'
import { getBusiness } from '@/src/actions/businessController'
import { SearchContextProvider } from '@/src/context/usesearch'
import PageHeader from '@/src/components/layouts/PageHeader'
import SearchForm from '@/src/components/forms/search-form'
import { getManySales } from '@/src/actions/salesController'
import SalesCard from '@/src/components/cards/sales-card'
import { LineProvider, OpenLine } from '@/src/context/useLine'
import AddSaleReport from '@/src/components/forms/add-sale-report'

const OrderLinePage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id ?? '')
    if (!business) return redirect('/settings')
    const businessLocation = business.locations.find(
        (location) => location.id === session?.user.activeLocation
    )
    const products = (await getManyProducts(businessLocation?.id)) ?? []
    const sales = (await getManySales(businessLocation?.id as string)) ?? []

    return (
        <div className="page-wrapper">
            <SearchContextProvider>
                <LineProvider>
                    <PageHeader
                        title="Sales Report"
                        description={String(sales.length)}
                    >
                        <SearchForm />
                        <OpenLine title="Add Sale" />
                    </PageHeader>
                    <div className="space-y-4">
                        <AddSaleReport
                            products={products}
                            businessLocation={businessLocation}
                        />
                        <SalesCard sales={sales} />
                    </div>
                </LineProvider>
            </SearchContextProvider>
        </div>
    )
}

export default OrderLinePage
