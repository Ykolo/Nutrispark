import { z } from "zod";
import { foods } from "../../data/data";

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
});
try {
  FoodSchema.parse(foods);
  console.log("Valid food data");
} catch (err) {
  console.log("Invalid food data", err);
}
export type FoodType = z.infer<typeof FoodSchema>;

const FoodReducedSchema = z.object({
  value: z.string(),
  label: z.string(),
});
try {
  FoodReducedSchema.parse(
    foods.map((food) => ({
      value: food.name.toLowerCase().replace(/ /g, "-"),
      label: food.name,
    })),
  );
  console.log("Valid food data");
} catch (err) {
  console.log("Invalid food data", err);
}
export type FoodReducedType = z.infer<typeof FoodReducedSchema>;

const MacronutrimentDataSchema = z.object({
  name: z.enum(["carbohydrates", "protein", "fat"]),
  value: z.number().nonnegative(),
});
try {
  MacronutrimentDataSchema.parse([
    { name: "carbohydrates", value: 10 },
    { name: "protein", value: 10 },
    { name: "fat", value: 10 },
  ]);
  console.log("Valid macronutrient data");
} catch (err) {
  console.log("Invalid macronutrient data", err);
}
export type MacronutrimentDataType = z.infer<typeof MacronutrimentDataSchema>;

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
