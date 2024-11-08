import { z } from 'zod'

const ParamsFoodSchema = z.object({
  name: z.string(),
})
export type FoodParamsType = z.infer<typeof ParamsFoodSchema>
