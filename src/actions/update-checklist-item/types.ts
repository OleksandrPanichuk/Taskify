import { z } from "zod"
import { UpdateChecklistItem } from "./schema"
import { ActionState } from "@/lib"
import { ChecklistItem } from "@prisma/client"


export type InputType = z.infer<typeof UpdateChecklistItem>
export type ReturnType = ActionState<InputType, ChecklistItem>