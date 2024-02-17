'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { DateRange } from 'react-day-picker'

import { Button, Calendar } from '@/components/ui'

import { updateCard } from '@/actions/update-card'
import { useAction } from '@/hooks'
import { cn } from '@/lib'
import { CardWithList } from '@/types'
import { Popover } from '@headlessui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { useListsStore } from '@/store'

export function DatePicker({ card }: { card: CardWithList }) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: card.startDate ? new Date(card.startDate) : undefined,
		to: card.endDate ? new Date(card.endDate) : undefined
	})

	const queryClient = useQueryClient()
	const params = useParams()

	const {orderedData, setOrderedData} = useListsStore()

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

	const onChange = (value: DateRange | undefined) => {
		setDate(value)

		execute({
			id: card.id,
			startDate: value?.from ?? null,
			endDate: value?.to ?? null,
			boardId: params.boardId as string,
			completed: value?.from ? card.completed ?? false : undefined
		})
	}
	return (
		<Popover className={'relative'}>
			<Popover.Button as={'div'} className={'w-full'}>
				<Button
					id="date"
					variant={'gray'}
					className={
						' justify-start w-full  text-left font-normal'
					}
					size="inline"
				>
					<CalendarIcon className="h-4 w-4 mr-2 min-w-[1rem]" />
					<span>
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, 'LLL dd, y')} -{' '}
									{format(date.to, 'LLL dd, y')}
								</>
							) : (
								format(date.from, 'LLL dd, y')
							)
						) : (
							<>Pick a date</>
						)}
					</span>
				</Button>
			</Popover.Button>
			<Popover.Panel className="w-auto p-0 bg-background top-[110%] md:right-0 absolute rounded-md z-[10000] ">
				<Calendar
					initialFocus
					mode="range"
					defaultMonth={date?.from}
					selected={date}
					onSelect={onChange}
					numberOfMonths={1}
				/>
			</Popover.Panel>
		</Popover>
	)
}
