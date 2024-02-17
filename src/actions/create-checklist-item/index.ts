'use server'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './types'
import { createSafeAction, db } from '@/lib'
import { CreateChecklistItem } from './schema'

const handler = async ({checklistId, text}: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized'
		}
	}

	try {
		const checklist = await db.checklist.findUnique({
			where: {
				id:checklistId
			}
		})
		if(!checklist) return {error: 'Checklist not found'}


		const checklistItem = await db.checklistItem.create({
			data: {
				text,
				checklistId
			}
		})

		return {
			data: checklistItem
		}
	} catch (err) {
		return {
			error: "Failed to create checklist item"
		}
	}
}



export const createChecklistItem = createSafeAction(CreateChecklistItem, handler);