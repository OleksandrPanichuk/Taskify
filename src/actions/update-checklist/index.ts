'use server'

import { auth } from '@clerk/nextjs'

import { db } from '@/lib'
import { createSafeAction } from '@/lib/'

import { UpdateChecklist } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized'
		}
	}

	const { id, title } = data
	try {
		const checklist = await db.checklist.update({
			where: {
				id,
				card: {
					list: {
						board: {
							orgId
						}
					}
				}
			},
			data: {
				title
			}
		})

		return {
			data: checklist
		}
	} catch (error) {
		return {
			error: 'Failed to update.'
		}
	}
}

export const updateChecklist = createSafeAction(UpdateChecklist, handler)
