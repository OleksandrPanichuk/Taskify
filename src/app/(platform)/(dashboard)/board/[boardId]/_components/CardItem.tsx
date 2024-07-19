'use client'

import { Draggable } from '@hello-pangea/dnd'
import { Card } from '@prisma/client'

import { Badge } from '@/components/ui'
import { priorityMap } from '@/constants/priority'
import { useCardModal } from '@/hooks'
import { memo } from 'react'
import { CardDateBadge } from '.'

interface CardItemProps {
	data: Card
	index: number
}

export const CardItem = memo(({ data, index }: CardItemProps) => {
	const cardModal = useCardModal()

	return (
		<Draggable draggableId={data.id} index={index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					role="button"
					onClick={() => cardModal.onOpen(data.id)}
					className=" border-2 border-transparent hover:border-black dark:hover:border-neutral-300 dark:bg-neutral-900 py-2 px-3  bg-white rounded-md shadow-sm"
				>
					<div className="truncate text-sm">{data.title}</div>
					{(!!data.priority || !!data.startDate) && (
						<div className="flex items-center gap-1 mt-2 overflow-visible">
							<CardDateBadge data={data} />
							{data.priority && (
								<Badge variant={priorityMap[data.priority].variant}>
									{priorityMap[data.priority].text}
								</Badge>
							)}
						</div>
					)}
				</div>
			)}
		</Draggable>
	)
})

CardItem.displayName = 'CardItem'
