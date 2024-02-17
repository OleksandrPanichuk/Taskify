import { z } from "zod"

export const DeleteChecklist = z.object({
	checklistId: z.string(),
})