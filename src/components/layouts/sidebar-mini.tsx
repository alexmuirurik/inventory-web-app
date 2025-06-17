'use client'
import { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { FaBarsStaggered } from 'react-icons/fa6'

const SidebarMini = () => {
    const [showSidebar, setShowSidebar] = useState(false)

    useEffect(() => {
        const mainWrapper = document.getElementById('main-wrapper')
        const main = document.getElementById('main')
        if (showSidebar) {
            main?.setAttribute('sidebar-mini', 'shown')
        } else {
            main?.setAttribute('sidebar-mini', 'hidden')
        }

        if (mainWrapper) {
            mainWrapper.onclick = () => setShowSidebar(false)
            mainWrapper.onload = () => setShowSidebar(false)

            return () =>{
                mainWrapper.removeEventListener('click', () =>
                    setShowSidebar(false)
                )
                mainWrapper.removeEventListener('load', () =>
                    setShowSidebar(false)
                )
            }
        }
    }, [showSidebar])

    return (
        <div className="md:hidden flex items-center gap-2 w-7/12 sm:w-8/12 flex-1 ps-4">
            {showSidebar ? (
                <FaBarsStaggered
                    className="h-6 w-6"
                    onClick={() => setShowSidebar(false)}
                />
            ) : (
                <FaBars
                    className="h-6 w-6"
                    onClick={() => setShowSidebar(true)}
                />
            )}
        </div>
    )
}

export default SidebarMini
