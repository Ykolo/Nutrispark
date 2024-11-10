import type { Metadata } from 'next'
import { FoodParamsType } from '../../types/Params'

export const generateMetadata = async ({
  params,
}: {
  params: FoodParamsType
}): Promise<Metadata> => {
  const { name } = await params
  return {
    title: `Discover ${name} - Nutrispark`,
    description: `Learn all about the nutritional values of ${name} on NutriTech. Explor nom!`,
  }
}

export default function FoodLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
