'use client'
import { useState, useEffect } from 'react'
import { IDataHidro, IStation } from '@/types'
import { fetchInfoHidro } from '@/api'
import { StationsMap } from '../../maps'
import { useFilterFromUrl } from '@/hooks'

function filterData(data: IStation[], id_estacion: string) {
  return data.filter((item) => item.EstId === Number(id_estacion))
}

export const MapSection = () => {
  const [data, setData] = useState<IDataHidro | null>(null)
  // const [dataFilter, setDataFilter] = useState<IStation[]>([])

  const { getParams } = useFilterFromUrl()

  const id_estacion = getParams('estacion', '')
  const dataFilterd = filterData(data?.Estacion || [], id_estacion)

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
      <StationsMap dataStation={dataFilterd} />
    </>
  )
}
