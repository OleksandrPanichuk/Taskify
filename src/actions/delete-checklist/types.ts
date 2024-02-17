import { z } from "zod"
import { DeleteChecklist } from "./schema"
import { Checklist } from "@prisma/client"
import { ActionState } from "@/lib"

export type InputType = z.infer<typeof DeleteChecklist>


export type ReturnType = ActionState<InputType, Checklist>
