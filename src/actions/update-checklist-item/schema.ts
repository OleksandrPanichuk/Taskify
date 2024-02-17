import { z } from "zod"

export const UpdateChecklistItem = z.object({
	id:z.string(),
	text: z.string().min(1).optional(),
	checked: z.boolean().optional()
})