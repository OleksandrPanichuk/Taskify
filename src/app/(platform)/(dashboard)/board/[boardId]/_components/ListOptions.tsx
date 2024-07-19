'use client'

import { List } from '@prisma/client'
import { Copy, MoreHorizontal, Plus, Trash } from 'lucide-react'
import { toast } from 'sonner'

import { copyList } from '@/actions/copy-list'
import { deleteList } from '@/actions/delete-list'
import { useAction } from '@/hooks'
import { Button, Divider, Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

interface ListOptionsProps {
	data: List
	onAddCard: () => void
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
	const [opened, { close, toggle }] = useDisclosure()

	const { execute: executeDelete } = useAction(deleteList, {
		onSuccess: (data) => {
			toast.success(`List "${data.title}" deleted`)
			close()
		},
		onError: (error) => {
			toast.error(error)
		}
	})

	const { execute: executeCopy } = useAction(copyList, {
		onSuccess: (data) => {
			toast.success(`List "${data.title}" copied`)
			close()
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
		<Popover opened={opened} onClose={close} position="bottom">
			<Popover.Target>
				<Button
					onClick={toggle}
					className="h-auto w-auto p-2"
					color="gray"
					variant="subtle"
					size="sm"
				>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</Popover.Target>
			<Popover.Dropdown className="px-0 pt-3 pb-3 dark:bg-neutral-900">
				<div className="text-sm font-medium text-center text-neutral-600 dark:text-neutral-200 pb-4">
					List actions
				</div>

				<Button
					onClick={onAddCard}
					className="rounded-none w-full h-auto p-2 px-5  font-normal text-sm flex"
					variant="subtle"
					color="gray"
				>
					<Plus className="h-4 w-4 mr-2" />
					Add card...
				</Button>
				<form action={onCopy}>
					<input hidden name="id" id="id" value={data.id} />
					<input hidden name="boardId" id="boardId" value={data.boardId} />
					<Button
						variant="subtle"
						color="gray"
						className="rounded-none w-full h-auto p-2 px-5  font-normal text-sm flex"
					>
						<Copy className="h-4 w-4 mr-2" />
						Copy list...
					</Button>
				</form>
				<Divider />
				<form action={onDelete}>
					<input hidden name="id" id="id" value={data.id} />
					<input hidden name="boardId" id="boardId" value={data.boardId} />
					<Button
						variant="subtle"
						color="gray"
						className="rounded-none w-full h-auto p-2 px-5  font-normal text-sm text-red-600 hover:text-red-700  flex"
					>
						<Trash className="h-4 w-4 mr-2" />
						Delete this list
					</Button>
				</form>
			</Popover.Dropdown>
		</Popover>
	)
}
