import { NextResponse } from 'next/server'
import { foods } from '../../../../data/data'
import { FoodParamsType } from '../../../types/Params'

export const GET = async (
  request: Request,
  { params }: { params: FoodParamsType }
) => {
  const foodName = params.name.toLowerCase().replace(/ /g, '-')
  const index = foods.findIndex(
    (food) => food.name.toLowerCase().replace(/ /g, '-') === foodName
  )

  return index !== -1
    ? new NextResponse(JSON.stringify(foods[index]), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      })
    : new NextResponse(JSON.stringify({ error: 'Food not found' }), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 404,
      })
}
