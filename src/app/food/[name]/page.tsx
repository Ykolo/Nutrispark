'use client'

import { Undo2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { FoodParamsType } from '../../types/Params'
import { FoodType, MacronutrimentDataType } from '../../types/food'

const FoodPage = ({ params }: { params: FoodParamsType }) => {
  const router = useRouter()

  const [food, setFood] = useState<FoodType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [macronutriments, setMacronutrmients] = useState<
    MacronutrimentDataType[]
  >([])
  const [error, setError] = useState<string | null>(null)

  const fetchFood = async () => {
    try {
      const APIQueryURL = `../api/foods/${params.name}`
      const response = await fetch(APIQueryURL)
      const data = await response.json()
      if (data) {
        const macronutrimentsData: MacronutrimentDataType[] = [
          { name: 'carbohydrates', value: data.carbohydrates },
          { name: 'protein', value: data.protein },
          { name: 'fat', value: data.fat },
        ]
        setMacronutrmients(macronutrimentsData)
        setFood(data)
      }
    } catch (error: Error | any) {
      setError(error.message)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  const COLORS = ['#F28907', '#5079F2', '#F2220F']
  useEffect(() => {
    params.name && fetchFood()
  }, [params.name])
  return (
    <div className="h-screen bg-slate-950">
      {!loading && food && macronutriments ? (
        <div className="p-8 text-white">
          <Undo2
            className="mb-5 cursor-pointer text-white"
            onClick={() => router.back()}
          />
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            {food.name}
          </h1>
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <div className="lg mb-8 w-full md:mb-0 md:w-1/2 lg:w-1/3">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={macronutriments}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {macronutriments.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <span className="mr-2 inline-block h-3 w-3 bg-[#F28907]"></span>
                Carbohydrates
                <span className="ml-4 inline-block h-3 w-3 bg-[#5079F2]"></span>
                Protein
                <span className="ml-4 inline-block h-3 w-3 bg-[#F2220F]"></span>
                Fat
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/3">
              <div className="mb-4 text-lg font-semibold">
                Nutritional Information per 100 grams:
              </div>
              <div className="mb-4 rounded-lg bg-gray-800 p-4 text-white shadow-inner">
                <div className="mb-2 flex items-center">
                  <div className="mr-3 h-5 w-5 border border-gray-700 bg-[#F28907]"></div>
                  <div>
                    Carbohydrates:{' '}
                    <span className="font-medium"> {food.carbohydrates} </span>
                  </div>
                </div>
                <div className="mb-2 flex items-center">
                  <div className="mr-3 h-5 w-5 border border-gray-700 bg-[#5079F2]"></div>
                  <div>
                    Protein:
                    <span className="font-medium"> {food.protein} </span>
                  </div>
                </div>
                <div className="mb-2 flex items-center">
                  <div className="mr-3 h-5 w-5 border border-gray-700 bg-[#F2220F]"></div>
                  <div>
                    Fat: <span className="font-medium"> {food.fat} </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-2 flex items-center">
                  <Image
                    src="/vitamins.png"
                    width={30}
                    height={30}
                    alt="Vitamins"
                  />
                  <div className="ml-3">
                    <span className="font-semibold">Vitamins: </span>
                    {food.vitamins?.join(', ')}
                  </div>
                </div>
                <div className="mb-2 flex items-center">
                  <Image
                    src="/minerals.png"
                    width={30}
                    height={30}
                    alt="Minerals"
                  />
                  <div className="ml-3">
                    <span className="font-semibold">Minerals: </span>
                    {food.minerals?.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <p className="text-4xl text-white">Loading...</p>
        </div>
      )}
    </div>
  )
}

export default FoodPage
