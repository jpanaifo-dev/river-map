/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useContext, createContext, useEffect, useState, Suspense } from 'react'
import { IMeteorological, IStationHM, IDataTableMH } from '@/types'
import { useFilterFromUrl, useMeteorological } from '@/hooks'

function getStation(stations: IStationHM[], id_station: string) {
  return stations.find((item) => item.EstacionId.toString() === id_station)
}

function converData(data: IMeteorological): IDataTableMH[] {
  const { EstacionHM, VariablesMeteorologicasMeteo } = data

  const newList: IDataTableMH[] = VariablesMeteorologicasMeteo?.map((item) => {
    const station = getStation(EstacionHM, item.EstacionId.toString())
    return {
      station_id: item.EstacionId.toString(),
      station: station?.EstacionNombre || 'Sin nombre',
      station_type: station?.EstacionTipo.toString() || 'Sin tipo',
      station_lng: station?.EstacionLongitud.toString() || 'No registrado',
      station_lat: station?.EstacionLatitud.toString() || 'No registrado',
      station_alt: station?.EstacionAltitud.toString() || 'No registrado',
    }
  })

  return newList
}

function filterByStation(data: IDataTableMH[], id_station: string) {
  if (id_station === '') return data
  return data.filter((item) => item.station_id.toString() === id_station)
}

const HMDataContext = createContext({
  data: [] as IDataTableMH[],
  stations: [] as IStationHM[],
  loading: false,
})

export const HMDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataStation, setDataSation] = useState<IStationHM[]>([])
  const { dataHM, getMeteorologicalData, loading } = useMeteorological()
  const { getParams } = useFilterFromUrl()

  const id_station = getParams('estacion', '')

  useEffect(() => {
    getMeteorologicalData()
  }, [id_station])

  useEffect(() => {
    if (dataHM?.VariablesMeteorologicasMeteo) {
      setDataSation(dataHM.EstacionHM)
    } else {
      setDataSation([])
    }
  }, [dataHM])

  const rows: IDataTableMH[] = dataHM ? converData(dataHM) : []
  const filteredByStation = filterByStation(rows || [], id_station)

  return (
    <HMDataContext.Provider
      value={{
        data: filteredByStation,
        stations: dataStation,
        loading,
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </HMDataContext.Provider>
  )
}

export const useHMDataContext = () => useContext(HMDataContext)
