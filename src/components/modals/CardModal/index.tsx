'use client'

import { useQuery } from '@tanstack/react-query'

import { useCardModal } from '@/hooks'
import { checkSubscription, fetcher } from '@/lib'
import { CardWithList } from '@/types'
import { AuditLog } from '@prisma/client'
// import { Dialog, DialogContent } from "@/components/ui";
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { Fragment } from 'react'
import { Actions } from './Actions'
import { Activity } from './Activity'
import { ChecklistContainer } from './ChecklistContainer'
import { CompletedCheckbox } from './CompletedCheckbox'
import { Description } from './Description'
import { Header } from './Header'

export const CardModal = () => {
	const id = useCardModal((state) => state.id)
	const isOpen = useCardModal((state) => state.isOpen)
	const onClose = useCardModal((state) => state.onClose)

	const { data: cardData } = useQuery<CardWithList>({
		queryKey: ['card', id],
		queryFn: () => fetcher(`/api/cards/${id}`),
		enabled: !!id && isOpen
	})

	const { data: auditLogsData } = useQuery<AuditLog[]>({
		queryKey: ['card-logs', id],
		queryFn: () => fetcher(`/api/cards/${id}/logs`),
		enabled: !!id && isOpen
	})

	const { data: isPro } = useQuery({
		queryFn: () => checkSubscription(),
		queryKey: ['subscription', id],
		enabled: !!id && isOpen
	})

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50 " onClose={onClose}>
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
							<Dialog.Panel className="w-full max-w-2xl h-[90%]  transform overflow-auto rounded-2xl bg-white dark:bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all">
								<div className="flex items-start justify-between gap-x-2 w-full">
									{!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
									<button onClick={onClose}>
										<X className="h-4 w-4" />
									</button>
								</div>
								<div className="flex flex-col gap-4">
									{cardData && <CompletedCheckbox data={cardData} />}
									<div className="w-full flex gap-4 flex-col md:flex-row space-y-6">
										<div className="w-full flex flex-col gap-4">
											{!cardData ? (
												<Description.Skeleton />
											) : (
												<Description data={cardData} isPro={isPro} />
											)}
											{!!cardData && <ChecklistContainer data={cardData} />}
										</div>
										{!cardData ? (
											<Actions.Skeleton />
										) : (
											<Actions data={cardData} />
										)}
									</div>
									
									{!auditLogsData ? (
										<Activity.Skeleton />
									) : (
										<Activity items={auditLogsData} />
									)}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}
