/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useContext, createContext, useEffect, useState } from 'react'
import { useHidrological } from '@/hooks'
import { IDataHidro, IStation } from '@/types'
import { useFilterFromUrl } from '@/hooks'

function filterData(data: IStation[], id_estacion: string) {
  if (id_estacion === '') return data
  return data.filter((item) => item.EstId.toString() === id_estacion)
}

const HidrologicalContext = createContext({
  data: {} as IDataHidro | null,
  dataFiltered: [] as IStation[],
  loading: false,
})

export const HidrologicalProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [dataStation, setDataSation] = useState<IStation[]>([])
  const { data, getHidroData, loading } = useHidrological()
  const { getParams } = useFilterFromUrl()

  const id_station = getParams('estacion', '')
  const dataFiltered = filterData(dataStation || [], id_station)

  useEffect(() => {
    getHidroData()
  }, [id_station])

  useEffect(() => {
    if (data?.Estacion) {
      setDataSation(data.Estacion)
    } else {
      setDataSation([])
    }
  }, [data])

  return (
    <HidrologicalContext.Provider
      value={{
        data,
        dataFiltered,
        loading,
      }}
    >
      {children}
    </HidrologicalContext.Provider>
  )
}

export const useHidrologicalContext = () => useContext(HidrologicalContext)
