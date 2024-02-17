"use server"


import { createSafeAction, db } from '@/lib'
import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './types'
import { DeleteChecklistItem } from './schema'

export const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized'
		}
	}

	try {
		const deletedChecklist = await db.checklistItem.delete({
			where: data
		})

		return {
			data: deletedChecklist
		}
	} catch (err) {
		console.log(err)
		return {
			error: 'Failed to delete checklist'
		}
	}
}



export const deleteChecklistItem = createSafeAction(DeleteChecklistItem,handler)