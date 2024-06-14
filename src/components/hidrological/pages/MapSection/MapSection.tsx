'use client'
import { useState, useEffect } from 'react'
import { IDataHidro } from '@/types'
import { fetchInfoHidro } from '@/api'
import { StationsMap } from '../../maps'

export const MapSection = () => {
  const [data, setData] = useState<IDataHidro | null>(null)
  const getHidroData = async () => {
    const res = await fetchInfoHidro()
    if (res) {
      const data: IDataHidro = (await res.json()) as IDataHidro
      setData(data)
    } else {
      setData(null)
    }
  }

  useEffect(() => {
    getHidroData()
  }, [data])

  return (
    <>
      <StationsMap dataStation={data?.Estacion} />
    </>
  )
}
