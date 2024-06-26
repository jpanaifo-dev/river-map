'use client'
import { useState } from 'react'
import { fetchInfoMeteorological, fetchInfoHM } from '@/api'
import { IDataMet, IMeteorological } from '@/types'

export const useMeteorological = () => {
  const [data, setData] = useState<IDataMet | null>(null)
  const [dataHM, setDataHM] = useState<IMeteorological | null>(null)
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

  const getMeteorologicalData = async () => {
    setLoading(true)
    const res = await fetchInfoHM()
    if (res) {
      const data: IMeteorological = (await res.json()) as IMeteorological
      setDataHM(data)
    } else {
      setData(null)
    }
    setLoading(false)
  }

  return {
    data,
    dataHM,
    loading,
    getMeteoroData,
    getMeteorologicalData,
  }
}
