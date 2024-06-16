'use client'
import { useState } from 'react'
import { fetchInfoMeteorological } from '@/api'
import { IDataMet } from '@/types'

export const useMeteorological = () => {
  const [data, setData] = useState<IDataMet | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const getMeteoroData = async () => {
    setLoading(true)
    const res = await fetchInfoMeteorological()
    if (res) {
      const data: IDataMet = (await res.json()) as IDataMet
      setData(data)
    } else {
      setData(null)
    }
    setLoading(false)
  }

  return {
    data,
    getMeteoroData,
    loading,
  }
}
