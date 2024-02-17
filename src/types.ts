import { Card, ChecklistItem, List } from '@prisma/client'

export type ListWithCards = List & { cards: Card[] }

export type CardWithList = Card & {
	list: List
	checklist: CardChecklist[]
}

export type CardChecklist = {
	title:string, 
	id:string, 
	items:ChecklistItem[]
}
