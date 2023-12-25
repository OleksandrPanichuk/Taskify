'use client'

import { useRouter } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

import { createBoard } from '@/actions/create-board'
import { FormInput, FormPicker, FormSubmit } from '@/components/form'
import {
	Button,
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
	TypePopoverAutoPosition
} from '@/components/ui'
import { useAction, useProModal } from '@/hooks'
import { X } from 'lucide-react'
import { cn } from '@/lib'

interface FormPopoverProps {
	children: React.ReactNode
	side?: 'left' | 'right' | 'top' | 'bottom'
	autoPosition?: TypePopoverAutoPosition
	contentClassName?: string
}

export const FormPopover = ({
	children,
	side = 'bottom',
	autoPosition,
	contentClassName
}: FormPopoverProps) => {
	const proModal = useProModal()
	const router = useRouter()
	const closeRef = useRef<ElementRef<'button'>>(null)

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

	return (
		<Popover side={side} autoPosition={autoPosition}>
			<PopoverTrigger>{children}</PopoverTrigger>
			<PopoverContent className={cn('w-80   mx-2', contentClassName)}>
				<div className="text-sm font-medium text-center text-neutral-600 pb-4">
					Create board
				</div>

				<PopoverClose asChild ref={closeRef}>
					<Button
						className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
						variant="ghost"
					>
						<X className="h-4 w-4" />
					</Button>
				</PopoverClose>

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
			</PopoverContent>
		</Popover>
	)
}
