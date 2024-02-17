import { z } from "zod"

export const UpdateChecklist = z.object({
	title: z.string().min(3,'Title is too short'),
	id: z.string()
})