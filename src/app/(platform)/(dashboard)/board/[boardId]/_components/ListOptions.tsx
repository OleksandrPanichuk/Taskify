'use client'

import { toast } from 'sonner'
import { List } from '@prisma/client'
import { ElementRef, useRef } from 'react'
import { Copy, MoreHorizontal, Plus, Trash, X } from 'lucide-react'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	PopoverClose
} from '@/components/ui'
import { useAction } from '@/hooks'
import { Button } from '@/components/ui'
import { copyList } from '@/actions/copy-list'
import { deleteList } from '@/actions/delete-list'
import { FormSubmit } from '@/components/form'
import { Separator } from '@/components/ui'

interface ListOptionsProps {
	data: List
	onAddCard: () => void
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
	const closeRef = useRef<ElementRef<'button'>>(null)

	const { execute: executeDelete } = useAction(deleteList, {
		onSuccess: (data) => {
			toast.success(`List "${data.title}" deleted`)
			closeRef.current?.click()
		},
		onError: (error) => {
			toast.error(error)
		}
	})

	const { execute: executeCopy } = useAction(copyList, {
		onSuccess: (data) => {
			toast.success(`List "${data.title}" copied`)
			closeRef.current?.click()
		},
		onError: (error) => {
			toast.error(error)
		}
	})

	const onDelete = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string

		executeDelete({ id, boardId })
	}

	const onCopy = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string

		executeCopy({ id, boardId })
	}

	return (
		<Popover side="bottom">
			<PopoverTrigger>
				<Button className="h-auto w-auto p-2" variant="ghost">
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="px-0 pt-3 pb-3">
				<div className="text-sm font-medium text-center text-neutral-600 pb-4">
					List actions
				</div>
				<PopoverClose ref={closeRef} asChild>
					<Button
						className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
						variant="ghost"
					>
						<X className="h-4 w-4" />
					</Button>
				</PopoverClose>
				<Button
					onClick={onAddCard}
					className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm flex items-center gap-x-2"
					variant="ghost"
				>
					<Plus className="h-4 w-4" />
					Add card...
				</Button>
				<form action={onCopy}>
					<input hidden name="id" id="id" value={data.id} />
					<input hidden name="boardId" id="boardId" value={data.boardId} />
					<FormSubmit
						variant="ghost"
						className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm flex items-center gap-x-2"
					>
						<Copy className="h-4 w-4" />
						Copy list...
					</FormSubmit>
				</form>
				<Separator />
				<form action={onDelete}>
					<input hidden name="id" id="id" value={data.id} />
					<input hidden name="boardId" id="boardId" value={data.boardId} />
					<FormSubmit
						variant="ghost"
						className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm text-red-600 hover:text-red-700 flex items-center gap-x-2"
					>
						<Trash className="h-4 w-4" />
						Delete this list
					</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	)
}
