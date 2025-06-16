import { auth } from '@/auth'
import { getBusiness } from '@/src/actions/businessController'
import AddBusinessInformation from '@/src/components/forms/add-business-information'
import PageHeader from '@/src/components/layouts/PageHeader'
import { Input } from '@/src/components/ui/input'
import { LoadingButton } from '@/src/components/ui/loadingbutton'
import { User } from '@prisma/client'

const SettingsPage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user.id as string)
    const businessLocation = business?.locations.find(
        (location) => location.id === session?.user.activeLocation
    )

    return (
        <div className="page-wrapper">
            <PageHeader
                title="Settings"
                description={business?.name as 'Create a business '}
            >
                <Input />
                <LoadingButton className="bg-teal-600">
                    <span className="text-nowrap">Make Payment</span>
                </LoadingButton>
            </PageHeader>
            <div className="flex gap-2 border">
                <div className="space-y-4 w-9/12 p-4">
                    <AddBusinessInformation
                        user={session?.user as User}
                        business={business}
                        location={businessLocation}
                    />
                </div>
                <div className="border-s w-3/12 space-y-4 p-6">
                    <h2 className="text-2xl text-center font-bold">
                        How It Works
                    </h2>
                    <div className="content">
                        <p>
                            {
                                "We'll use your mpesa details to setup subscrption for you"
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
