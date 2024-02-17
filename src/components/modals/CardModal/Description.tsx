'use client'

import { useQueryClient } from '@tanstack/react-query'
import { AlignLeft } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { updateCard } from '@/actions/update-card'
import { FormSubmit, FormTextarea } from '@/components/form'
import { Button, Skeleton } from '@/components/ui'
import { useAction } from '@/hooks'
import { CardWithList } from '@/types'

import { Editor, EditorOutput } from './Editor'

interface DescriptionProps {
	data: CardWithList
	isPro?: boolean
}

export const Description = ({ data, isPro }: DescriptionProps) => {
	const params = useParams()
	const queryClient = useQueryClient()

	const [isEditing, setIsEditing] = useState(false)
	const [editorContent, setEditorContent] = useState<string>('')

	const formRef = useRef<ElementRef<'form'>>(null)
	const textareaRef = useRef<ElementRef<'textarea'>>(null)


	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			textareaRef.current?.focus()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing()
		}
	}

	useEventListener('keydown', onKeyDown)
	useOnClickOutside(formRef, disableEditing)

	const { execute, fieldErrors } = useAction(updateCard, {
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({
				queryKey: ['card', data.id]
			})
			await queryClient.invalidateQueries({
				queryKey: ['card-logs', data.id]
			})
			toast.success(`Card "${data.title}" updated`)
			disableEditing()
		},
		onError: (error) => {
			toast.error(error)
		}
	})

	const onSubmit = (formData: FormData) => {
		const description = formData.get('description') as string
		const boardId = params.boardId as string

		execute({
			id: data.id,
			description,
			boardId
		})
	}
	const onEditorChange = () => {
		const boardId = params.boardId as string
		execute({
			id: data.id,
			description: editorContent,
			boardId
		})
	}

	return (
		<div className="flex items-start gap-x-3 w-full">
			<AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700 dark:text-neutral-200" />
			<div className="w-full">
				<p className="font-semibold text-neutral-700 mb-2 dark:text-neutral-200">
					Description
				</p>
				{isPro ? (
					isEditing ? (
						<form action={onEditorChange} ref={formRef} className={'space-y-2'}>
							<Editor
								initialContent={data.description}
								onChange={(content) => setEditorContent(content)}
							/>

							<div className="flex items-center gap-x-2">
								<FormSubmit>Save</FormSubmit>
								<Button
									type="button"
									onClick={disableEditing}
									size="sm"
									variant="ghost"
								>
									Cancel
								</Button>
							</div>
						</form>
					) : (
						<div role="button" onClick={enableEditing}>
							{data.description ? (
								<EditorOutput content={data.description} />
							) : (
								<div className="min-h-[78px] bg-neutral-200 dark:bg-background text-sm font-medium py-3 px-3.5 rounded-md">
									Add a more detailed description...
								</div>
							)}
						</div>
					)
				) : isEditing ? (
					<form action={onSubmit} ref={formRef} className="space-y-2">
						<FormTextarea
							id="description"
							className="w-full mt-2"
							placeholder="Add a more detailed description"
							defaultValue={data.description || undefined}
							errors={fieldErrors}
							ref={textareaRef}
						/>
						<div className="flex items-center gap-x-2">
							<FormSubmit>Save</FormSubmit>
							<Button
								type="button"
								onClick={disableEditing}
								size="sm"
								variant="ghost"
							>
								Cancel
							</Button>
						</div>
					</form>
				) : (
					<pre
						onClick={enableEditing}
						role="button"
						className="min-h-[78px] bg-neutral-200 dark:bg-background text-sm font-medium py-3 px-3.5 rounded-md"
					>
						{data.description || 'Add a more detailed description...'}
					</pre>
				)}
			</div>
		</div>
	)
}

Description.Skeleton = function DescriptionSkeleton() {
	return (
		<div className="flex items-start gap-x-3 w-full">
			<Skeleton className="h-6 w-6 bg-neutral-200" />
			<div className="w-full">
				<Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
				<Skeleton className="w-full h-[78px] bg-neutral-200" />
			</div>
		</div>
	)
}
