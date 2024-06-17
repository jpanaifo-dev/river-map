/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useContext, createContext, useEffect, useState, Suspense } from 'react'
import { useMeteorological } from '@/hooks'
import { IDataMet, IDataTableMet, IStation, IStationHM } from '@/types'
import { useFilterFromUrl } from '@/hooks'

function filterData(data: IStation[], id_estacion: string) {
  if (id_estacion === '') return data
  return data.filter((item) => item.EstId.toString() === id_estacion)
}

function getStation(stations: IStationHM[], id_station: string) {
  return stations.find((item) => item.EstacionId.toString() === id_station)
}

function converData(data: IDataMet): IDataTableMet[] {
  const { EstacionHM, AutoValoresHM } = data

  const newList: IDataTableMet[] = AutoValoresHM?.map((item) => {
    const station = getStation(EstacionHM, item.EstacionId.toString())
    return {
      station_id: item.EstacionId.toString(),
      station: station?.EstacionNombre || 'Sin nombre',
      station_type: station?.EstacionTipo.toString() || 'Sin tipo',
      station_lng: station?.EstacionLongitud.toString() || 'No registrado',
      station_lat: station?.EstacionLatitud.toString() || 'No registrado',
      station_alt: station?.EstacionAltitud.toString() || 'No registrado',
      auto_id: item.AutoId.toString(),
      auto_date: item.AutoFechaHora || 'No registrado',
      auto_temp: item.AutoTemp.toString() || 'No registrado',
      auto_hr: item.AutoHR.toString() || 'No registrado',
      auto_precip: item.AutoPP.toString() || 'No registrado',
      auto_radiacion: item.AutoRadiacion.toString() || 'No registrado',
      auto_wind_dir: item.AutoWindDir.toString() || 'No registrado',
      auto_wind_vel: item.AutoWindVel.toString() || 'No registrado',
    }
  })

  return newList
}

function filterByStation(data: IDataTableMet[], id_station: string) {
  if (id_station === '') return data
  return data.filter((item) => item.station_id.toString() === id_station)
}

const MeteorologicalContext = createContext({
  data: [] as IDataTableMet[],
  stations: [] as IStationHM[],
  loading: false,
})

export const MeteorologicalProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [dataStation, setDataSation] = useState<IStationHM[]>([])
  const { data, getMeteoroData, loading } = useMeteorological()
  const { getParams } = useFilterFromUrl()

  const id_station = getParams('estacion', '')

  useEffect(() => {
    getMeteoroData()
  }, [id_station])

  useEffect(() => {
    if (data?.AutoValoresHM) {
      setDataSation(data.EstacionHM)
    } else {
      setDataSation([])
    }
  }, [data])

  const rows: IDataTableMet[] = data ? converData(data) : []
  const filteredByStation = filterByStation(rows || [], id_station)

  return (
    <MeteorologicalContext.Provider
      value={{
        data: filteredByStation,
        stations: dataStation,
        loading,
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </MeteorologicalContext.Provider>
  )
}

export const useMeteorologicalContext = () => useContext(MeteorologicalContext)
