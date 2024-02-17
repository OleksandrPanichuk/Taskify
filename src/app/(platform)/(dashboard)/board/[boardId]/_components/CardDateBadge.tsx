import { Badge } from '@/components/ui'
import { Card } from '@prisma/client'
import { format, isAfter, isBefore } from 'date-fns'

import { useMemo } from 'react'

export const CardDateBadge = ({ data }: { data: Card }) => {
	const variant: 'green' | 'red' | 'orange' | 'outline' = useMemo(() => {
		if (data.completed) return 'green'

		const now = new Date()
		const startDate = data.startDate ? new Date(data.startDate) : undefined
		const endDate = data.endDate ? new Date(data.endDate) : undefined

		if (startDate && !endDate) {
			const after = isAfter(now, startDate)

			if (after) return 'red'
		}

		if (startDate && endDate) {
			const after = isAfter(now, startDate)
			const before = isBefore(now, endDate)
			
			if (!before) return 'red'

			if (after && before) return 'orange'
		}

		return 'outline'
	}, [data.completed, data.startDate, data.endDate])

	return (
		<>
			{data.startDate ? (
				data.endDate ? (
					<Badge variant={variant}>
						{format(data.startDate, 'LLL dd, y')} -{' '}
						{format(data.endDate, 'LLL dd, y')}
					</Badge>
				) : (
					<Badge variant={variant}>{format(data.startDate, 'LLL dd, y')}</Badge>
				)
			) : (
				<></>
			)}
		</>
	)
}
