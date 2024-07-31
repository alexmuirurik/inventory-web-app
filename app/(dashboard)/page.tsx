import DashChart from '@/components/card/dashchart'
import FolderDetails from '@/components/card/folderdetails'
import TitleCards from '@/components/card/titlecards'
import React from 'react'

const Dashboard = () => {
    return (
        <div className="content">
            <TitleCards />
            <FolderDetails />
            <DashChart />
        </div>
    )
}

export default Dashboard