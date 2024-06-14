'use client'
import { IStation } from '@/types'

function filterData(data: IStation[], id_estacion: string) {
  if (id_estacion === '') return data
  return data.filter((item) => item.EstId.toString() === id_estacion)
}

export const HidrologicalTable = () => {
  return <></>
}
