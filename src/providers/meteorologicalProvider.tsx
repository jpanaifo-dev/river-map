/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useContext, createContext, useEffect, useState } from 'react'
import { useMeteorological } from '@/hooks'
import { IDataMet, IStationHM } from '@/types'

import { useFilterFromUrl } from '@/hooks'

function filterData(data: IStationHM[], id_estacion: string) {
  if (id_estacion === '') return data
  return data.filter((item) => item.EstacionId.toString() === id_estacion)
}

const MeteorologicalContext = createContext({
  data: {} as IDataMet | null,
  dataFiltered: [] as IStationHM[],
  loading: false,
})

export const MeteorologicalProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [dataStation, setDataSation] = useState<IStationHM[]>([])
  const { data, getMetroData, loading } = useMeteorological()
  const { getParams } = useFilterFromUrl()

  const id_station = getParams('estacion', '')
  const dataFiltered = filterData(dataStation || [], id_station)

  useEffect(() => {
    getMetroData()
  }, [id_station])

  useEffect(() => {
    if (data?.EstacionHM) {
      setDataSation(data.EstacionHM)
    } else {
      setDataSation([])
    }
  }, [data])

  return (
    <MeteorologicalContext.Provider
      value={{
        data,
        dataFiltered,
        loading,
      }}
    >
      {children}
    </MeteorologicalContext.Provider>
  )
}

export const useMeteorologicalContext = () => useContext(MeteorologicalContext)
