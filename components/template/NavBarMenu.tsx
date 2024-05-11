import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator,  MenubarTrigger } from "@/components/ui/menubar"
import { FaBell } from "react-icons/fa"
import { Avatar, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import { SignOut } from "../auth/SignOut"

const NavBarMenu = () => {
    return (
        <Menubar className="border-0">
            <MenubarMenu>
                <MenubarTrigger className="cursor-pointer">
                    <FaBell className="text-base" />
                </MenubarTrigger>
                <MenubarContent className="bg-zinc-100" align="end">
                    <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
                    <MenubarCheckboxItem checked>
                        Always Show Full URLs
                    </MenubarCheckboxItem>
                    <MenubarSeparator />
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger className="cursor-pointer">
                    <Avatar className="w-6 h-6">
                        <AvatarImage src="/assets/img/alexmuiruri.jpg" width={25} height={25} />
                    </Avatar>
                </MenubarTrigger>
                <MenubarContent className="bg-zinc-100" align='end'>
                    <MenubarItem inset className="p-0">
                        <Link href='/profile' className="w-full ps-7 py-2">Alex Muiruri</Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset className="p-0">
                        <Link href='/settings' className="w-full ps-7 py-2">Settings</Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset className="p-0">
                        <SignOut />
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default NavBarMenu