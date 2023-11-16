'use client'

import Image from 'next/image'
import { Transition, Dialog } from '@headlessui/react'
import { useProModal } from '@/hooks'
import { Button } from '@/components/ui'
import { useAction } from '@/hooks/use-action'
import { stripeRedirect } from '@/actions/stripe-redirect'
import { toast } from 'sonner'
import { Fragment } from 'react'

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
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-[99]" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<div className="aspect-video relative flex items-center justify-center">
									<Image
										src="/hero.svg"
										alt="Hero"
										className="object-cover"
										fill
									/>
								</div>
								<div className="text-neutral-700 mx-auto space-y-6 p-6">
									<h2 className="font-semibold text-xl">
										Upgrade to Taskify Pro Today!
									</h2>
									<p className="text-xs font-semibold text-neutral-600">
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
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}
