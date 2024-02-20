import { createChecklist } from '@/actions/create-checklist'
import { Button, Input } from '@/components/ui'
import { useAction } from '@/hooks'
import { Popover } from '@headlessui/react'
import { useQueryClient } from '@tanstack/react-query'
import { ListChecks } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const CreateChecklistButton = ({ cardId }: { cardId: string }) => {
	const [title, setTitle] = useState<string>('')
	const queryClient = useQueryClient()

	const { execute, isLoading } = useAction(createChecklist, {
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({
				queryKey: ['card', cardId]
			})

			toast.success(`Checklist ${data.title} created`)
			setTitle('')
		},
		onError: () => {
			toast.error('Failed to create checklist')
		}
	})

	return (
		<Popover className={'relative'}>
			{({ close }) => (
				<>
					<Popover.Button as={'div'} className={'w-full'}>
						<Button
							variant={'gray'}
							className="w-full justify-start"
							size="inline"
						>
							<ListChecks className="h-4 w-4 mr-2" />
							Checklist
						</Button>
					</Popover.Button>
					<Popover.Panel className="p-4 w-auto flex min-w-[17.5rem] flex-col gap-4 bg-background top-[110%] md:right-0 absolute rounded-md z-[10000] shadow-md ">
						<h3 className="text-center w-full">Add Checklist</h3>
						<form
							className="flex flex-col gap-2 items-start"
							onSubmit={async (e) => {
								e.preventDefault()
								await execute({
									cardId,
									title
								})
								close()
							}}
						>
							<Input
								disabled={isLoading}
								value={title}
								className="text-sm px-2 py-1 h-7"
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Checklist name..."
							/>

							<Button
								type="submit"
								disabled={title.length < 3 || isLoading}
								variant={'primary'}
								size={'sm'}
							>
								Create
							</Button>
						</form>
					</Popover.Panel>
				</>
			)}
		</Popover>
	)
}
