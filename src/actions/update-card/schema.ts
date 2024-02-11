import { Priority } from "@prisma/client"
import { z } from "zod"

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z.string({
      required_error: "Description is required",
      invalid_type_error: "Description is required",
    }).min(3, {
      message: "Description is too short.",
    }),
  ),
  priority: z.nativeEnum(Priority).optional().nullable(),
  startDate: z.optional(z.date().nullable()),
  endDate: z.optional(z.date().nullable()),
  title: z.optional(
    z.string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    }).min(3, {
      message: "Title is too short",
    })
  ),
  id: z.string(),
});