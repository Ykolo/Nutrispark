import { z } from 'zod'

const FoodSchema = z.object({
  name: z.string(),
  calories: z.number().positive(),
  carbohydrates: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  fat: z.number().nonnegative(),
  fiber: z.number().nonnegative().optional(),
  sugar: z.number().nonnegative().optional(),
  vitamins: z.array(z.string()).optional(),
  minerals: z.array(z.string()).optional(),
})
export type FoodType = z.infer<typeof FoodSchema>

const FoodReducedSchema = z.object({
  value: z.string(),
  label: z.string(),
})
export type FoodReducedType = z.infer<typeof FoodReducedSchema>

const MacronutrientDataSchema = z.object({
  name: z.enum(['carbohydrates', 'protein', 'fat']),
  value: z.number().nonnegative(),
})
export type MacronutrientDataType = z.infer<typeof MacronutrientDataSchema>

// export interface IFood {
//   name: string
//   calories: number
//   carbohydrates: number // in grams
//   protein: number // in grams
//   fat: number // in grams
//   fiber?: number // in grams, optional
//   sugar?: number // in grams, optional
//   vitamins?: string[] // array of vitamins, optional
//   minerals?: string[] // array of minerals, optional
// }

// export interface IFoodReduced {
//   value: string
//   label: string
// }

// export interface IMacronutrientData {
//   name: 'carbohydrates' | 'protein' | 'fat'
//   value: number
// }
