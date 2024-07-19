import { updateCard } from '@/actions/update-card'
import { Badge } from '@/components/ui'
import { useAction } from '@/hooks'
import { useListsStore } from '@/store'
import { CardWithList } from '@/types'
import { Checkbox } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CheckSquare } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const CompletedCheckbox = ({ data }: { data: CardWithList }) => {
	const [checked, setChecked] = useState<boolean>(data.completed ?? false)
	const queryClient = useQueryClient()
	const params = useParams()

	const { orderedData, setOrderedData } = useListsStore()

	const { execute } = useAction(updateCard, {
		onSuccess: async (data) => {
			setOrderedData(
				orderedData.map((item) =>
					item.id === data.id ? { ...item, ...data } : item
				)
			)

			await queryClient.invalidateQueries({
				queryKey: ['card', data.id]
			})
			await queryClient.invalidateQueries({
				queryKey: ['card-logs', data.id]
			})
			toast.success(`Card "${data.title}" updated`)
		},
		onError: (error) => {
			toast.error(error)
		}
	})

	useEffect(() => {
		setChecked(data.completed ?? false)
	}, [data.completed])

	if (!data.startDate) return null

	return (
		<div className="flex items-start gap-x-3 w-full">
			<CheckSquare className="h-5 w-5 mt-0.5 text-neutral-700 dark:text-neutral-200" />
			<div className=" w-full">
				<p className="font-semibold text-neutral-700 mb-2 dark:text-neutral-200">
					Completed
				</p>
				<form
					className="flex items-center gap-2"
					onSubmit={(e) => e.preventDefault()}
				>
					<Checkbox
						checked={checked}
						onChange={(e) => {
							const checked = e.currentTarget.checked
							setChecked(checked)
							execute({
								id: data.id,
								startDate: data.startDate
									? new Date(data.startDate)
									: undefined,
								boardId: params.boardId as string,
								completed: Boolean(checked)
							})
						}}
					/>
					<Badge>
						{data.endDate ? (
							<>
								{format(new Date(data.startDate), 'LLL dd, y')} -{' '}
								{format(new Date(data.endDate), 'LLL dd, y')}
							</>
						) : (
							format(new Date(data.startDate), 'LLL dd, y')
						)}
					</Badge>
				</form>
			</div>
		</div>
	)
}
