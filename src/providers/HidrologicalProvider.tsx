/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useContext, createContext, useEffect, useState, Suspense } from 'react'
import { useHidrological } from '@/hooks'
import { IDataHidro, IDataTable, IStation, IUmbral } from '@/types'
import { useFilterFromUrl } from '@/hooks'

function filterData(data: IStation[], id_estacion: string) {
  if (id_estacion === '') return data
  return data.filter((item) => item.EstId.toString() === id_estacion)
}

function getThresholdStatus(
  current_level: number,
  low_threshold: number,
  high_threshold: number
) {
  if (current_level < low_threshold) return 'Bajo'
  if (current_level > high_threshold) return 'Alto'
  return 'Normal'
}

function getStation(stations: IStation[], id_station: string) {
  return stations.find((item) => item.EstId.toString() === id_station)
}

function getUmbral(umbrals: IUmbral[], id_umbral: string) {
  return umbrals.find((item) => item.EstId.toString() === id_umbral)
}

function converData(data: IDataHidro): IDataTable[] {
  const { Nivel, Estacion, Umbral } = data

  const newList: IDataTable[] = Nivel?.map((item) => {
    const station = getStation(Estacion, item.EstId.toString())
    const umbral = getUmbral(Umbral, item.EstId.toString())
    return {
      station_id: item.EstId.toString(),
      station: station?.EstNombre || 'No registrado',
      station_color: station?.EstColor || 'No registrado',
      river: station?.EstRio || 'No registrado',
      institution: station?.EstInstitucion || 'No registrado',
      date: item?.NivelFecha || 'No registrado',
      past_date: item?.NivelFechaPasado || 'No registrado',
      current_date: item?.NivelFechaActual || 'No registrado',
      normal_level: item?.NivelNormal.toString() || 'No registrado',
      current_level: item?.NivelAHActual?.toString() || 'No registrado',
      past_level: item?.NivelAHPasado?.toString() || 'No registrado',
      period: umbral?.UmbralPeriodo || 'No registrado',
      station_period: station?.Periodo || 'No registrado',
      high_threshold: umbral?.UmbValor.toString() || 'No registrado',
      low_threshold: umbral?.UmbValor2.toString() || 'No registrado',
      threshold_status: getThresholdStatus(
        Number(item?.NivelAHActual) || 0,
        Number(item?.NivelAHActual) || 0,
        Number(item?.NivelAHPasado) || 0
      ),
      color: umbral?.UmbColor || 'No registrado',
    }
  })

  return newList
}

function filterByStation(data: IDataTable[], id_station: string) {
  if (id_station === '') return data
  return data.filter((item) => item.station_id.toString() === id_station)
}

const HidrologicalContext = createContext({
  data: [] as IDataTable[],
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

  const rows: IDataTable[] = data ? converData(data) : []
  const filteredByStation = filterByStation(rows || [], id_station)

  return (
    <HidrologicalContext.Provider
      value={{
        data: filteredByStation,
        dataFiltered,
        loading,
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </HidrologicalContext.Provider>
  )
}

export const useHidrologicalContext = () => useContext(HidrologicalContext)
