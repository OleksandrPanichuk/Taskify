'use client'

import { updateCard } from '@/actions/update-card'
import { Badge } from '@/components/ui'
import { priorityMap } from '@/constants/priority'
import { useAction } from '@/hooks'
import { useListsStore } from '@/store'
import { CardWithList } from '@/types'
import { Listbox } from '@headlessui/react'
import { Priority } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { AlertCircle, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { MouseEvent, useState } from 'react'
import { toast } from 'sonner'

export const PrioritySelect = ({ card }: { card: CardWithList }) => {
	const [value, setValue] = useState<Priority | null>(card.priority)
	const queryClient  = useQueryClient()
	const {orderedData, setOrderedData} = useListsStore()
	const params = useParams()

	const { execute } = useAction(updateCard, {
		onSuccess: async (data) => {
			setOrderedData(orderedData.map(item => item.id === data.id ? ({...item, ...data}) : item))
			
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


	const onClear = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setValue(null)
		execute({
			id: card.id,
			boardId:params.boardId as string,
			priority:null,
		})

	}

	const onChange = (value:Priority) => {
		setValue(value)
		execute({
			id: card.id,
			boardId:params.boardId as string,
			priority:value,
		})
	}
	return (
		<Listbox  value={value} onChange={onChange}>
			<div className="relative">
				<Listbox.Button className="relative w-full cursor-default rounded-lg  h-auto px-2 py-1.5  text-left  bg-neutral-200 text-secondary-foreground hover:bg-neutral-300 dark:text-white dark:bg-background flex items-center  text-sm">
					{value ? (
						<div className="w-full flex items-center justify-between gap-2">
							<div className='flex items-center gap-1'>
								Priority:
							<Badge variant={priorityMap[value].variant}>
								{priorityMap[value].text}
							</Badge>
							</div>
							<button onClick={onClear}>
								<X className={'h-4 w-4'} />
							</button>
						</div>
					) : (
						<>
							<AlertCircle className="h-4 w-4 mr-2" />
							<span className="block truncate flex-1">Add Priority</span>
						</>
					)}
				</Listbox.Button>
				<Listbox.Options className="absolute top-[110%] z-[100] rounded-md border bg-popover text-popover-foreground shadow-md w-[100px] px-1 py-2 space-y-2">
					{Object.entries(priorityMap).map(([key, value]) => (
						<Listbox.Option key={key} value={key}>
							<Badge
								className="w-full flex justify-center"
								variant={value.variant}
							>
								{value.text}
							</Badge>
						</Listbox.Option>
					))}
				</Listbox.Options>
			</div>
		</Listbox>
	)
}
