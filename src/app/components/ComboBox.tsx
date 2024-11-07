'use client'
import { useEffect, useState } from 'react'
import { FoodReducedType, FoodType } from '../types/food'

const ComboBox = () => {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [foods, setFoods] = useState<FoodReducedType[]>([])
  const [idLoading, setIsLoading] = useState(true)

  const fetchFoods = async () => {
    try {
      const response = await fetch('/api/foods/all')
      const data = await response.json()
      const foodsReduced: FoodReducedType[] = data.map((food: FoodType) => {
        value: food.name.toLowerCase().replace(/ /g, '-')
        label: food.name
      })
      setFoods(foodsReduced)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const initialize = async () => {
      await fetchFoods()
      setIsLoading(false)
    }
    initialize()
  }, [])
  return (
    <div>
      <h1></h1>
    </div>
  )
}

export default ComboBox
