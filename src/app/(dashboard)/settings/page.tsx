import PageHeader from "@/src/components/layouts/PageHeader"
import { Button } from "@/src/components/ui/button"

const SettingsPage = () => {
    return (
        <div className="page-wrapper">
            <PageHeader title="Settings" description="" />
            <div className="flex items-start gap-2 border">
                <div className=" w-9/12 p-4">
                    <h1>Profile Details</h1>
                </div>
                <div className="border-s w-3/12 p-4">
                    <div className="ul">
                        <li>User Account</li>
                        <li>Business Account</li>
                        <li>Billings</li>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
