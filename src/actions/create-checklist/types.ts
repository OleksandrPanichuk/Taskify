import { z } from 'zod'
import { CreateChecklist } from './schema'
import { ActionState } from '@/lib'
import { Checklist } from '@prisma/client'

export type InputType = z.infer<typeof CreateChecklist>
export type ReturnType = ActionState<InputType, Checklist>