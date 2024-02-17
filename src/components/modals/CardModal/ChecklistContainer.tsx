import { CardWithList } from '@/types'
import { Checklist } from './Checklist'

export const ChecklistContainer = ({ data }: { data: CardWithList }) => {
	if (!data.checklist.length) return null
	return (
		<ul>
			{data.checklist.map((list) => (
				<li key={list.id} className="flex flex-col gap-2 items-start mb-2">
					<Checklist cardId={data.id} data={list} />
				</li>
			))}
		</ul>
	)
}
