import { z } from 'zod'

export const CreateChecklistItem = z.object({
	checklistId: z.string(),
	text: z.string().min(1, 'Text is too short')
})
