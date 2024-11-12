import type { Metadata } from "next";
import { FoodParamsType } from "../../types/Params";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<FoodParamsType>;
}): Promise<Metadata> => {
  const resolvedParams = await params;
  const { name } = resolvedParams;
  return {
    title: `Discover ${name} - Nutrispark`,
    description: `Learn all about the nutritional values of ${name} on NutriTech. Explor nom!`,
  };
};

export default function FoodLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
