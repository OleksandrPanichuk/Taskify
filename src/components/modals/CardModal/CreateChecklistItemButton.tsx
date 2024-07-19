'use client'

import { createChecklistItem } from '@/actions/create-checklist-item'
import { Button, Input } from '@/components/ui'
import { useAction } from '@/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useClickOutside } from '@mantine/hooks'

export const CreateChecklistItemButton =  ({
	cardId,
	checklistId
}: {
	cardId: string
	checklistId: string
}) => {
	const [isEditing, setIsEditing] = useState(false)
	const [text, setText] = useState('')
	const queryClient = useQueryClient()
	
	const cancel = () => {
		if (isLoading) {
			return
		}
		
		setIsEditing(false)
		setText('')
	}
	const formRef = useClickOutside(cancel, null)

	const { execute, isLoading } = useAction(createChecklistItem, {
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['card', cardId]
			})
			cancel()
		},
		onError: () => toast.error('Failed to create checklist item.')
	})

	return isEditing ? (
		<form
			ref={formRef}
			onSubmit={(e) => {
				e.preventDefault()
				execute({
					checklistId,
					text
				})
			}}
			className="flex flex-col gap-2 items-start w-full"
		>
			<Input
				value={text}
				disabled={isLoading}
				className="text-base px-2 py-1 h-8"
				onChange={(e) => setText(e.target.value)}
				placeholder="Add new item..."
			/>

			<div className="flex items-center gap-2 ">
				<Button
					type="submit"
					disabled={!text || isLoading}
					variant={'primary'}
					size={'sm'}
				>
					Add
				</Button>
				<Button
					size={'sm'}
					variant={'secondary'}
					onClick={cancel}
					disabled={isLoading}
					type="button"
				>
					Cancel
				</Button>
			</div>
		</form>
	) : (
		<Button  className="md:ml-9 ml-4" onClick={() => setIsEditing(true)} size="inline">
			Add an Item
		</Button>
	)
}
