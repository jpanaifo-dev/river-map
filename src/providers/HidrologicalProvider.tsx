/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useContext, createContext, useEffect, useState, Suspense } from 'react'
import { IDataHidro, IDataTable, IStation, IUmbral } from '@/types'
import { useFilterFromUrl,useHidrological  } from '@/hooks'

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

const convertDate = (dateStr: string) => {
  if (dateStr === '') return 'No registrado'
  const months = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ]

  // Divide la cadena de fecha en componentes día, mes y año
  const [day, month, year] = dateStr.split('/')

  // Convierte el número de mes en el nombre del mes correspondiente
  const monthName = months[parseInt(month, 10) - 1]

  // Forma la nueva cadena de fecha
  return `${parseInt(day, 10)} de ${monthName} ${year}`
}

function converData(data: IDataHidro): IDataTable[] {
  const { Nivel, Estacion } = data

  const newList: IDataTable[] = Nivel?.map((item) => {
    const station = getStation(Estacion, item.EstId.toString())
    return {
      //Estacion data
      station_id: item.EstId.toString(),
      station: station?.EstNombre || 'No registrado',
      station_color: station?.EstColor || 'No registrado',
      river: station?.EstRio || 'No registrado',
      institution: station?.EstInstitucion || 'No registrado',
      station_period: station?.Periodo || 'No registrado',
      threshold_status: getThresholdStatus(
        Number(item?.NivelAHActual) || 0,
        Number(item?.NivelAHActual) || 0,
        Number(item?.NivelAHPasado) || 0
      ),
      //Nivel values
      date: item?.NivelFecha || 'No registrado',
      past_date: convertDate(item?.NivelFechaPasado || ''),
      current_date: convertDate(item?.NivelFechaActual || ''),
      current_level: item?.NivelAHActual?.toString() || 'No registrado',
      normal_level: item?.NivelNormal.toString() || 'No registrado',
      past_level: item?.NivelAHPasado?.toString() || 'No registrado',
    }
  })

  return newList
}

function filterByStation(data: IDataTable[], id_station: string) {
  if (id_station === '') return data
  return data.filter((item) => item.station_id.toString() === id_station)
}

function filterUmbralByEstacion(data: IUmbral[], id_estacion: string) {
  return data.filter((item) => item.EstId.toString() === id_estacion)
}

const HidrologicalContext = createContext({
  data: [] as IDataTable[],
  dataFiltered: [] as IStation[],
  dataUmbral: [] as IUmbral[],
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
  const filteredUmbral = filterUmbralByEstacion(data?.Umbral || [], id_station)

  return (
    <HidrologicalContext.Provider
      value={{
        data: filteredByStation,
        dataUmbral: filteredUmbral,
        dataFiltered,
        loading,
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </HidrologicalContext.Provider>
  )
}

export const useHidrologicalContext = () => useContext(HidrologicalContext)
