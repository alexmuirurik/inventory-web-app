import React from 'react'
import PageHeader from '@/components/layouts/PageHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { FaEllipsisV } from 'react-icons/fa'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Cloud, Github, LifeBuoy, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { getCompany } from '@/actions/companyController'
import { redirect } from 'next/navigation'

const notifications = [
	{
		title: "Brian Cox",
		description: "brian@exchange.com",
		image: "https://randomuser.me/api/portraits/men/2.jpg"
	},
	{
		title: "Mikaela Collins",
		description: "f.mit@kpmg.com",
		image: "https://randomuser.me/api/portraits/women/2.jpg"
	},
	{
		title: "Neil Owen",
		description: "owen.neil@gmail.com",
		image: "https://randomuser.me/api/portraits/men/5.jpg"
	},
]


const Messages = async () => {
	const session = await auth()
    const company = await getCompany(session?.user?.id as string)
    if(!company) return redirect('/settings')
	return (
		<div className="page-wrapper">
			<PageHeader title='Messages' description='540+' >
				<div className="flex items-center gap-2">
					<input type="text" className="bg-transparent focus-within:!ring-0 border text-sm !w-full ps-5 py-2" placeholder="Search" />
					<Button className="w-full bg-teal-500 hover:bg-teal-700">Compose a Message</Button>
				</div>
			</PageHeader>
			<div className="page-body md:flex gap-2">
				<Card className='bg-transparent p-0 md:w-4/12 lg:w-3/12'>
					<CardHeader className='p-2'>
						<Input placeholder='Search' />
					</CardHeader>
					<CardContent className="p-0">
						{notifications.map((notification, index) => (
							<div key={index} className="flex hover:bg-gray-300 rounded-md gap-2 py-2 my-1 px-4 cursor-pointer" >
								<Avatar className='w-7 h-7'>
									<AvatarImage src={notification.image} />
								</Avatar>
								<div className="space-y-1">
									<h6 className="text-sm font-bold leading-none">
										{notification.title}
									</h6>
									<p className="text-sm text-muted-foreground">
										{notification.description}
									</p>
								</div>
							</div>
						))}
					</CardContent>
				</Card>
				<Card className='bg-transparent p-0 md:w-8/12 lg:w-9/12'>
					<CardHeader className='flex flex-row justify-between items-center border-b border-gray-300 p-2 ps-4'>
						<div className="titles">
							<CardTitle className='text-lg font-bold'>Brian Cox</CardTitle>
							<CardDescription className='flex items-center gap-1'>
								<span className="flex h-2 w-2 rounded-full bg-teal-600" />Active
							</CardDescription>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild className='border-0'>
								<Button variant="outline"><FaEllipsisV /></Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="bg-transparent w-56 " align='end'>
								<DropdownMenuItem className='hover:bg-gray-300 rounded-md'>
									<Github className="mr-2 h-4 w-4" />
									<span>GitHub</span>
								</DropdownMenuItem>
								<DropdownMenuItem className='hover:bg-gray-300 rounded-md'>
									<LifeBuoy className="mr-2 h-4 w-4" />
									<span>Support</span>
								</DropdownMenuItem>
								<DropdownMenuItem className='hover:bg-gray-300 rounded-md' disabled>
									<Cloud className="mr-2 h-4 w-4" />
									<span>API</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</CardHeader>
				</Card>
			</div>
		</div>
	)
}

export default Messages