'use client'

import { MoreHorizontal, Trash, X } from 'lucide-react'
import { toast } from 'sonner'

import { deleteBoard } from '@/actions/delete-board'
import { Button } from '@/components/ui'
import { useAction } from '@/hooks'
import { Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

interface BoardOptionsProps {
	id: string
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
	const [opened, { toggle, close }] = useDisclosure()
	const { execute, isLoading } = useAction(deleteBoard, {
		onError: (error) => {
			toast.error(error)
		}
	})

	const onDelete = () => {
		execute({ id })
	}

	return (
		<Popover opened={opened} onClose={close} position="bottom-end">
			<Popover.Target>
				<Button
					onClick={toggle}
					className="h-auto w-auto p-2"
					variant="transparent"
				>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</Popover.Target>
			<Popover.Dropdown className=" p-2 pt-3">
				<div className="text-sm font-medium text-center text-neutral-600 dark:text-neutral-200 pb-4">
					Board actions
				</div>
				<Button
					onClick={close}
					className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 "
					variant="ghost"
				>
					<X className="h-4 w-4" />
				</Button>

				<Button
					variant="ghost"
					onClick={onDelete}
					disabled={isLoading}
					className="  text-red-600   hover:text-red-700  transition-all rounded-md w-full h-auto py-2 px-5 justify-start font-normal text-sm flex items-center gap-x-2"
				>
					<Trash className="w-5 h-5" />
					Delete this board
				</Button>
			</Popover.Dropdown>
		</Popover>
	)
}
