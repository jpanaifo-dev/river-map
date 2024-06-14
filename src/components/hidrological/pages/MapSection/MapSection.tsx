/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState, useEffect } from 'react'
import { IStation } from '@/types'
import { StationsMap } from '../../maps'
import { useFilterFromUrl } from '@/hooks'
import { useHidrological } from '@/hooks'

function filterData(data: IStation[], id_estacion: string) {
  if (id_estacion === '') return data
  return data.filter((item) => item.EstId.toString() === id_estacion)
}

export const MapSection = () => {
  const { getHidroData, data, loading } = useHidrological()
  const [dataStation, setDataSation] = useState<IStation[]>([])
  const { getParams } = useFilterFromUrl()

  const id_estacion = getParams('estacion', '')
  const dataFilterd = filterData(dataStation || [], id_estacion)
  console.log(dataFilterd, 'data filterd')
  useEffect(() => {
    getHidroData()
  }, [id_estacion])

  useEffect(() => {
    if (data?.Estacion) {
      setDataSation(data.Estacion)
    } else {
      setDataSation([])
    }
  }, [data])

  return (
    <>
      <StationsMap dataStation={dataFilterd} />
    </>
  )
}
