import { NextResponse } from 'next/server'
import { foods } from '../../../data/data'

export const GET = async () => {
  return NextResponse.json(foods)
}
