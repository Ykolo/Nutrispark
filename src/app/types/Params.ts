import { z } from "zod";

const ParamsFoodSchema = z.object({
  name: z.string(),
});
try {
  ParamsFoodSchema.parse({ name: "apple" });
  console.log("Valid food params");
} catch (err) {
  console.log("Invalid food params", err);
}
export type FoodParamsType = z.infer<typeof ParamsFoodSchema>;
