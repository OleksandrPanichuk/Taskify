import { z } from "zod"

export const CreateChecklist = z.object({
	cardId: z.string(),
	title: z.string().min(3, 'Title is too short')
})