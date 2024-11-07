import { foods } from '../../../../data/data'

export const GET = async () => {
  return Response.json(foods)
}
