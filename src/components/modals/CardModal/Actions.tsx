'use client'

import { toast } from 'sonner'
import { Copy, Trash } from 'lucide-react'
import { useParams } from 'next/navigation'

import { CardWithList } from '@/types'
import { useAction, useCardModal } from '@/hooks'
import { copyCard } from '@/actions/copy-card'
import { Button } from '@/components/ui'
import { deleteCard } from '@/actions/delete-card'
import { Skeleton } from '@/components/ui'
import { DatePicker } from './DatePicker'
import { PrioritySelect } from './PriotirySelect'

interface ActionsProps {
	data: CardWithList
}

export const Actions = ({ data }: ActionsProps) => {
	const params = useParams()
	const cardModal = useCardModal()

	const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
		copyCard,
		{
			onSuccess: (data) => {
				toast.success(`Card "${data.title}" copied`)
				cardModal.onClose()
			},
			onError: (error) => {
				toast.error(error)
			}
		}
	)

	const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
		deleteCard,
		{
			onSuccess: (data) => {
				toast.success(`Card "${data.title}" deleted`)
				cardModal.onClose()
			},
			onError: (error) => {
				toast.error(error)
			}
		}
	)

	const onCopy = () => {
		const boardId = params.boardId as string

		executeCopyCard({
			id: data.id,
			boardId
		})
	}

	const onDelete = () => {
		const boardId = params.boardId as string

		executeDeleteCard({
			id: data.id,
			boardId
		})
	}

	return (
		<div className="space-y-2 mt-2 md:max-w-[180px] w-full">
			<p className="text-xs font-semibold">Add to card</p>
			<DatePicker card={data} />
			<PrioritySelect card={data} />
			<p className="text-xs font-semibold">Actions</p>
			<Button
				onClick={onCopy}
				disabled={isLoadingCopy}
				variant="gray"
				className="w-full justify-start"
				size="inline"
			>
				<Copy className="h-4 w-4 mr-2" />
				Copy
			</Button>
			<Button
				onClick={onDelete}
				disabled={isLoadingDelete}
				variant="gray"
				className="w-full justify-start"
				size="inline"
			>
				<Trash className="h-4 w-4 mr-2" />
				Delete
			</Button>
		</div>
	)
}

Actions.Skeleton = function ActionsSkeleton() {
	return (
		<div className="space-y-2 mt-2 md:max-w-[180px] w-full">
			<Skeleton className="w-20 h-4 bg-neutral-200" />
			<Skeleton className="w-full h-8 bg-neutral-200" />
			<Skeleton className="w-full h-8 bg-neutral-200" />
			<Skeleton className="w-full h-8 bg-neutral-200" />
		</div>
	)
}
