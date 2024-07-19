'use client'

import { updateCard } from '@/actions/update-card'
import { Badge, Button } from '@/components/ui'
import { priorityMap } from '@/constants/priority'
import { useAction } from '@/hooks'
import { useListsStore } from '@/store'
import { CardWithList } from '@/types'
import { Priority } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { AlertCircle, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { MouseEvent, useState } from 'react'
import { toast } from 'sonner'

import { Combobox, useCombobox } from '@mantine/core'

export const PrioritySelect = ({ card }: { card: CardWithList }) => {
	const queryClient = useQueryClient()
	const { orderedData, setOrderedData } = useListsStore()
	const params = useParams()

	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption()
	})
	const [value, setValue] = useState<Priority | null>(card.priority)

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

	const onClear = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setValue(null)
		execute({
			id: card.id,
			boardId: params.boardId as string,
			priority: null
		})
	}

	const onChange = (value: Priority) => {
		setValue(value)
		execute({
			id: card.id,
			boardId: params.boardId as string,
			priority: value
		})
	}
	return (
		<Combobox
			store={combobox}
			onOptionSubmit={(val) => {
				onChange(val as Priority)
				combobox.closeDropdown()
			}}
			width={'target'}
			position="bottom-end"
		>
			<Combobox.Target>
				<Button
					size="inline"
					variant="gray"
					onClick={() => combobox.toggleDropdown()}
					className="w-full"
				>
					{value ? (
						<div className="w-full flex items-center justify-between gap-2">
							<div className="flex items-center gap-1">
								Priority:
								<Badge variant={priorityMap[value].variant}>
									{priorityMap[value].text}
								</Badge>
							</div>
							<button onClick={onClear}>
								<X className={'size-4'} />
							</button>
						</div>
					) : (
						<>
							<AlertCircle className="size-4 mr-2" />
							<span className="block truncate flex-1  text-left">
								Add Priority
							</span>
						</>
					)}
				</Button>
			</Combobox.Target>
			<Combobox.Dropdown className="rounded-md border shadow-md  px-1 py-2 space-y-2">
				<Combobox.Options>
					{Object.entries(priorityMap).map(([key, value]) => (
						<Combobox.Option key={key} value={key}>
							<Badge
								className="w-full flex justify-center"
								variant={value.variant}
							>
								{value.text}
							</Badge>
						</Combobox.Option>
					))}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	)
}
