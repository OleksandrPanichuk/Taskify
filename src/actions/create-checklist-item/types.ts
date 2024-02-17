import { ActionState } from '@/lib'
import { ChecklistItem } from '@prisma/client'
import { z } from 'zod'
import { CreateChecklistItem } from './schema'

export type InputType = z.infer<typeof CreateChecklistItem>
export type ReturnType = ActionState<InputType, ChecklistItem>
