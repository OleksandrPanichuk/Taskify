'use server'

import { createSafeAction, db } from '@/lib'
import { auth } from '@clerk/nextjs'
import { UpdateChecklistItem } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized'
		}
	}

	const { id, checked, text } = data

	try {
		const checklistItem = await db.checklistItem.update({
			where: {
				id,
				checklist: {
					card: {
						list: {
							board: {
								orgId
							}
						}
					}
				}
			},
			data: {
				text,
				checked
			}
		})

		return {
			data: checklistItem
		}
	} catch {
		return {
			error: 'Failed to update checklist item.'
		}
	}
}

export const updateChecklistItem = createSafeAction(
	UpdateChecklistItem,
	handler
)
