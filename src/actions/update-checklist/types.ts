import { z } from "zod"
import { UpdateChecklist } from "./schema"
import { ActionState } from "@/lib"
import { Checklist } from "@prisma/client"

export type InputType = z.infer<typeof UpdateChecklist>
export type ReturnType = ActionState<InputType, Checklist>