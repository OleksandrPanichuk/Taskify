import { Plus } from 'lucide-react'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

import { Logo, ModeToggle } from '@/components'
import { Button } from '@/components/ui'
import { FormPopover } from '@/components/form'
import { MobileSidebar } from '.'

export const Navbar = () => {
	return (
		<nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm dark:bg-neutral-900 bg-white flex items-center">
			<MobileSidebar />
			<div className="flex items-center gap-x-4">
				<div className="hidden md:flex">
					<Logo />
				</div>
				<FormPopover side="bottom">
					<Button
						variant="primary"
						size="sm"
						className="rounded-sm hidden md:block h-auto  py-1.5 px-2"
					>
						Create
					</Button>
				</FormPopover>
			</div>
			<div className="ml-auto flex items-center gap-x-2">
				<OrganizationSwitcher
					hidePersonal
					afterCreateOrganizationUrl="/organization/:id"
					afterLeaveOrganizationUrl="/select-org"
					afterSelectOrganizationUrl="/organization/:id"
					appearance={{
						elements: {
							rootBox: {
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}
						}
					}}
				/>
				<ModeToggle />
				<UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: {
								height: 30,
								width: 30
							}
						}
					}}
				/>
			</div>
		</nav>
	)
}
