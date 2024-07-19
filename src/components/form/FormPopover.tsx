'use client'

import { useRouter } from 'next/navigation'
import { cloneElement, ElementRef, ReactElement, useRef } from 'react'
import { toast } from 'sonner'

import { createBoard } from '@/actions/create-board'
import { FormInput, FormPicker, FormSubmit } from '@/components/form'

import { useAction, useProModal } from '@/hooks'
import { ActionIcon, Popover, PopoverProps } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { XIcon } from 'lucide-react'

interface FormPopoverProps {
	children: React.ReactNode
	side?: PopoverProps['position']
	contentClassName?: string
}

export const FormPopover = ({
	children,
	side = 'right',
	contentClassName
}: FormPopoverProps) => {
	const proModal = useProModal()
	const router = useRouter()
	const closeRef = useRef<ElementRef<'button'>>(null)

	const [opened, { open, close, toggle }] = useDisclosure()

	const { execute, fieldErrors } = useAction(createBoard, {
		onSuccess: (data) => {
			toast.success('Board created!')
			closeRef.current?.click()
			router.push(`/board/${data.id}`)
		},
		onError: (error) => {
			toast.error(error)
			proModal.onOpen()
		}
	})

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const image = formData.get('image') as string

		execute({ title, image })
	}

	const childrenWithHandler = cloneElement(children as ReactElement, {
		onClick: toggle
	})

	return (
		<Popover
		opened={opened}
			width={300}
			position={side}
			onClose={close}
			onOpen={open}
			closeOnClickOutside={false}
		>
			<Popover.Target>{childrenWithHandler}</Popover.Target>
			<Popover.Dropdown className={contentClassName}>
				<div className="text-sm font-medium text-center text-neutral-600 dark:text-neutral-100 pb-4">
					Create board
				</div>

				<ActionIcon
					onClick={close}
					className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-6"
					variant="subtle"
					color="gray"
					aria-label="Close"
				>
					<XIcon className="size-4" />
				</ActionIcon>

				<form action={onSubmit} className="space-y-4">
					<div className="space-y-4">
						<FormPicker id="image" errors={fieldErrors} />
						<FormInput
							id="title"
							label="Board title"
							type="text"
							errors={fieldErrors}
						/>
					</div>
					<FormSubmit className="w-full">Create</FormSubmit>
				</form>
			</Popover.Dropdown>
		</Popover>
	)
}
