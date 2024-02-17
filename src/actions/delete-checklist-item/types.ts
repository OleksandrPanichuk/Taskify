import { z } from "zod"
import { DeleteChecklistItem } from "./schema"
import { ActionState } from "@/lib"
import { ChecklistItem } from "@prisma/client"

export type InputType = z.infer<typeof DeleteChecklistItem>
export type ReturnType = ActionState<InputType, ChecklistItem >