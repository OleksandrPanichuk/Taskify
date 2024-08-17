'use client'

import { stripeRedirect } from '@/actions/stripe-redirect'
import { Button } from '@/components/ui'
import { useProModal } from '@/hooks'
import { useAction } from '@/hooks/use-action'
import { Modal } from '@mantine/core'
import Image from 'next/image'
import { toast } from 'sonner'

export const ProModal = () => {
	const { isOpen, onClose } = useProModal()

	const { execute, isLoading } = useAction(stripeRedirect, {
		onSuccess: (data) => {
			window.location.href = data
		},
		onError: (error) => {
			toast.error(error)
		}
	})

	const onClick = () => {
		execute({})
	}

	return (
		<Modal
			centered
			opened={isOpen}
			onClose={onClose}
			// withCloseButton={false}
			classNames={{
				body: 'p-0',
				header: 'min-h-0 h-0 p-0',
				close: 'absolute top-2 right-2 text-black hover:bg-zinc-100'
			}}
		>
			<div>
				<div className="aspect-video relative flex items-center justify-center">
					<Image src="/hero.svg" alt="Hero" className="object-cover" fill />
				</div>
				<div className="text-neutral-700 dark:text-neutral-200 mx-auto space-y-6 p-6">
					<h2 className="font-semibold text-xl">
						Upgrade to Taskify Pro Today!
					</h2>
					<p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
						Explore the best of Taskify
					</p>
					<div className="pl-3">
						<ul className="text-sm">
							<li className="list-disc">Unlimited boards</li>
							<li className="list-disc">Advanced checklists</li>
							<li className="list-disc">Admin and security features</li>
							<li className="list-disc">And more!</li>
						</ul>
					</div>
					<Button
						disabled={isLoading}
						onClick={onClick}
						className="w-full"
						variant="primary"
					>
						Upgrade
					</Button>
				</div>
			</div>
		</Modal>
	)
}
