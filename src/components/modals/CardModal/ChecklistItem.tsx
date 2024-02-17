import { deleteChecklistItem } from '@/actions/delete-checklist-item'
import { updateChecklistItem } from '@/actions/update-checklist-item'
import { Button, Checkbox } from '@/components/ui'
import { useAction } from '@/hooks'
import { type ChecklistItem as ChecklistItemType } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'

export const ChecklistItem = ({
	item,
	cardId
}: {
	item: ChecklistItemType
	cardId: string
}) => {
	const queryClient = useQueryClient()

	const { execute: deleteItem, isLoading: isDeleting } = useAction(
		deleteChecklistItem,
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: ['card', cardId]
				})
			}
		}
	)


	const {execute: updChecklistItem, isLoading: isUpdating} = useAction(updateChecklistItem, {
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['card', cardId]
			})
		}
	})

	return (
		<li key={item.id} className="flex items-start break-all gap-2 w-full mb-1">
			<Checkbox className='mt-1' onCheckedChange={checked => updChecklistItem({
				id:item.id,
				checked: Boolean(checked)
			})} id={item.id} defaultChecked={item.checked} />
			<label htmlFor={item.id} className="flex-1">
				{item.text}
			</label>
			<Button
				onClick={() =>
					deleteItem({
						id: item.id
					})
				}
				disabled={isDeleting}
				size="inline"
				variant="gray"
				className="rounded-md dark:bg-background bg-neutral-200 p-1.5 "
			>
				<Trash className="w-4 h-4" />
			</Button>
		</li>
	)
}
