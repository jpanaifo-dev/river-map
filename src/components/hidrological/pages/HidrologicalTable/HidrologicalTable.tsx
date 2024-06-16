'use client'
import { Suspense } from 'react'
import { IDataHidro, IDataTable, IStation, IUmbral } from '@/types'
import { useFilterFromUrl } from '@/hooks'
import { useHidrologicalContext } from '@/providers'
import { TableCustom } from '@/components'

const tableHeaders = [
  { key: 'station_id', value: 'ID de Estación' },
  { key: 'station', value: 'Estación' },
  { key: 'station_color', value: 'Color de Estación' },
  { key: 'station_period', value: 'Periodo de Estación' },
  { key: 'river', value: 'Río' },
  { key: 'institution', value: 'Institución' },
  { key: 'date', value: 'Fecha' },
  { key: 'past_date', value: 'Fecha Pasada' },
  { key: 'current_date', value: 'Fecha Actual' },
  { key: 'normal_level', value: 'Nivel Normal' },
  { key: 'current_level', value: 'Nivel Actual' },
  { key: 'past_level', value: 'Nivel Pasado' },
  { key: 'period', value: 'Periodo' },
  { key: 'low_threshold', value: 'Umbral Bajo' },
  { key: 'high_threshold', value: 'Umbral Alto' },
  { key: 'threshold_status', value: 'Estado de Umbral' },
  { key: 'color', value: 'Color' },
]

function filterByStation(data: IDataTable[], id_station: string) {
  if (id_station === '') return data
  return data.filter((item) => item.station_id.toString() === id_station)
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

export const HidrologicalTable = () => {
  const { data } = useHidrologicalContext()
  const { getParams } = useFilterFromUrl()

  const id_station = getParams('estacion', '')
  const rows: IDataTable[] = data ? converData(data) : []
  const dataFiltered = filterByStation(rows || [], id_station)

  return (
    <>
      <header className="pb-2">
        <h1 className="font-bold text-sm uppercase">
          Estación Hidrológica {dataFiltered[0]?.station || 'No registrado'} -
          Niveles de Agua
        </h1>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <TableCustom
          headers={tableHeaders}
          rows={dataFiltered}
        />
      </Suspense>
    </>
  )
}
