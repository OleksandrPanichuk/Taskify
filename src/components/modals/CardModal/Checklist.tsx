'use client'

import { deleteChecklist } from '@/actions/delete-checklist'
import { updateChecklist } from '@/actions/update-checklist'
import { FormInput } from '@/components/form'
import { Button } from '@/components/ui'
import { useAction } from '@/hooks'
import { CardChecklist } from '@/types'
import { Progress } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { CheckSquare, Trash } from 'lucide-react'
import { ElementRef, useMemo, useRef } from 'react'
import { toast } from 'sonner'
import { ChecklistItem } from './ChecklistItem'
import { CreateChecklistItemButton } from './CreateChecklistItemButton'

export const Checklist = ({
	data,
	cardId
}: {
	data: CardChecklist
	cardId: string
}) => {
	const queryClient = useQueryClient()
	const inputRef = useRef<ElementRef<'input'>>(null)
	const { execute: delChecklist, isLoading: isDeletingChecklist } = useAction(
		deleteChecklist,
		{
			onSuccess: async (response) => {
				await queryClient.invalidateQueries({
					queryKey: ['card', response.cardId]
				})

				toast.success(`Checklist ${data.title} deleted.`)
			},
			onError: () => toast.error('Failed to delete checklist.')
		}
	)

	const onBlur = () => {
		inputRef.current?.form?.requestSubmit()
	}

	const { execute: updChecklist, isLoading: isUpdatingChecklist } = useAction(
		updateChecklist,
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries({
					queryKey: ['card', cardId]
				})

				toast.success(`Checklist ${data.title} updated.`)
			}
		}
	)

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string

		if (title === data.title) {
			return ''
		}

		updChecklist({
			title,
			id: data.id
		})

		return ''
	}

	const progress = useMemo(() => {
		const checkedItems = data.items.filter((item) => item.checked)

		if (!data.items.length) return 0

		return Math.floor((checkedItems.length / data.items.length) * 100)
	}, [data.items])

	return (
		<>
			<div className="flex items-center gap-3 w-full">
				<CheckSquare className="h-5 w-5 mt-0.5 text-neutral-700 dark:text-neutral-200" />
				<form action={onSubmit} className="flex-1">
					<FormInput
						disabled={isUpdatingChecklist}
						id="title"
						ref={inputRef}
						onBlur={onBlur}
						defaultValue={data.title}
						className="font-semibold text-sm px-1 text-neutral-700 dark:text-neutral-200 bg-transparent border-transparent relative  focus-visible:bg-white focus-visible:border-input dark:focus-visible:bg-black/60 truncate"
					/>
				</form>
				<Button
					disabled={isDeletingChecklist}
					onClick={() => delChecklist({ checklistId: data.id })}
					variant={'gray'}
					size="inline"
				>
					<Trash className="h-4 w-4 mr-2" />
					Delete
				</Button>
			</div>
			<div className="w-full flex items-center gap-2 ">
				<p className="text-sm w-9">{progress}%</p>
				<Progress color="white" className='w-full' value={progress} />
			</div>
			{!!data.items.length && (
				<ul className="w-full">
					{data.items.map((item) => (
						<ChecklistItem item={item} cardId={cardId} key={item.id} />
					))}
				</ul>
			)}
			<CreateChecklistItemButton cardId={cardId} checklistId={data.id} />
		</>
	)
}
