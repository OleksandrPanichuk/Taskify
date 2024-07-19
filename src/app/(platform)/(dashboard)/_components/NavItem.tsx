'use client'

import { Activity, CreditCard, Layout, Settings } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { Button, Skeleton } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Accordion } from '@mantine/core'

export type Organization = {
	id: string
	slug: string
	imageUrl: string
	name: string
}

interface NavItemProps {
	isExpanded: boolean
	isActive: boolean
	organization: Organization
	onExpand: (id: string) => void
}

export const NavItem = ({
	isExpanded,
	isActive,
	organization,
	onExpand
}: NavItemProps) => {
	const router = useRouter()
	const pathname = usePathname()

	const routes = [
		{
			label: 'Boards',
			icon: <Layout className="h-4 w-4 mr-2" />,
			href: `/organization/${organization.id}`
		},
		{
			label: 'Activity',
			icon: <Activity className="h-4 w-4 mr-2" />,
			href: `/organization/${organization.id}/activity`
		},
		{
			label: 'Billing',
			icon: <CreditCard className="h-4 w-4 mr-2" />,
			href: `/organization/${organization.id}/billing`
		},
		{
			label: 'Settings',
			icon: <Settings className="h-4 w-4 mr-2" />,
			href: `/organization/${organization.id}/settings`
		}
	]

	const onClick = (href: string) => {
		router.push(href)
	}

	return (
		<Accordion.Item value={organization.id} className="border-none">
			<Accordion.Control
				onClick={() => onExpand(organization.id)}
				className={cn(
					'flex items-center gap-x-2  text-neutral-200 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline !p-1.5',
					isActive && !isExpanded && 'bg-sky-500/10 '
				)}
				classNames={{label:"!py-0"}}
				
			>
				<div className="flex items-center gap-x-2">
					<div className="w-7 h-7 relative">
						<Image
							fill
							src={organization.imageUrl}
							alt="Organization"
							className="rounded-sm object-cover"
						/>
					</div>
					<span className="font-medium text-sm">{organization.name}</span>
				</div>
			</Accordion.Control>
			<Accordion.Panel classNames={{content:"!p-0"}} className="pt-1 text-neutral-700">
				{routes.map((route) => (	
					<Button
						key={route.href}
						size="sm"
						onClick={() => onClick(route.href)}
						className={cn(
							'w-full font-normal justify-start pl-10 mb-1',
							pathname === route.href && 'bg-sky-500/10 text-sky-700'
						)}
						variant="ghost"
					>
						{route.icon}
						{route.label}
					</Button>
				))}
			</Accordion.Panel>
		</Accordion.Item>
	)
}

NavItem.Skeleton = function SkeletonNavItem() {
	return (
		<div className="flex items-center gap-x-2">
			<div className="w-10 h-10 relative shrink-0">
				<Skeleton className="h-full w-full absolute" />
			</div>
			<Skeleton className="h-10 w-full" />
		</div>
	)
}
