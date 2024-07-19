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
		<Modal centered opened={isOpen} onClose={onClose}>
			<div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-900">
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
						<ul className="text-sm list-disc">
							<li>Unlimited boards</li>
							<li>Advanced checklists</li>
							<li>Admin and security features</li>
							<li>And more!</li>
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
