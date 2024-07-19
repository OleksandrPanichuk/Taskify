'use client'

import { useQuery } from '@tanstack/react-query'

import { useCardModal } from '@/hooks'
import { checkSubscription, fetcher } from '@/lib'
import { CardWithList } from '@/types'
import { Modal } from '@mantine/core'
import { AuditLog } from '@prisma/client'
import { X } from 'lucide-react'
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

// className="w-full max-w-2xl h-[90%]  transform overflow-auto rounded-2xl bg-white dark:bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all"

	return (
		<Modal size="100%" className="rounded-xl" withCloseButton={false}  onClose={onClose} opened={isOpen} closeOnClickOutside centered >
			
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
						{!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
					</div>

					{!auditLogsData ? (
						<Activity.Skeleton />
					) : (
						<Activity items={auditLogsData} />
					)}
				</div>
		</Modal>
	)
}
