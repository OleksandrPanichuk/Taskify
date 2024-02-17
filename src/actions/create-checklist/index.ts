"use server"
import { createSafeAction, db } from '@/lib'
import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './types'
import { CreateChecklist } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized'
		}
	}

	try {
		const card = await db.card.findUnique({
			where: {
				id: data.cardId
			}
		})

		if (!card) {
			return {
				error: 'Card not found.'
			}
		}

		const checklist = await db.checklist.create({
			data
		})

		return {
			data: checklist
		}
	} catch (err) {
		return {
			error: 'Failed to create checklist.'
		}
	}
}


export const createChecklist = createSafeAction(CreateChecklist, handler);