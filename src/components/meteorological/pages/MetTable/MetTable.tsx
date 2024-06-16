'use client'
import { Suspense } from 'react'
import { useMeteorologicalContext } from '@/providers'
import { TableCustom } from '@/components'

const tableHeadersMet = [
  { key: 'station_id', value: 'ID de Estación' },
  { key: 'station', value: 'Estación' },
  { key: 'station_type', value: 'Tipo de Estación' },
  { key: 'station_lat', value: 'Latitud de la Estación' },
  { key: 'station_lng', value: 'Longitud de la Estación' },
  { key: 'station_alt', value: 'Altitud de la Estación' },
  { key: 'auto_date', value: 'Fecha Automática' },
  { key: 'auto_temp', value: 'Temperatura Automática (°C)' },
  { key: 'auto_hr', value: 'Humedad Relativa Automática (%)' },
  { key: 'auto_radiacion', value: 'Radiación Automática (W/m²)' },
  { key: 'auto_wind_dir', value: 'Dirección del Viento Automática (°)' },
  { key: 'auto_wind_vel', value: 'Velocidad del Viento Automática (m/s)' },
  { key: 'auto_precip', value: 'Precipitación Automática (mm)' },
]

export const MetTable = () => {
  const { data } = useMeteorologicalContext()

  return (
    <>
      <header className="pb-2">
        <h1 className="font-bold text-sm uppercase">
          Estación Hidrológica {data[0]?.station || 'No registrado'} - Datos
          Meteorológicos
        </h1>
        <p className="text-xs text-gray-500">
          Información meteorológica de la estación hidrológica seleccionada
        </p>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <TableCustom
          headers={tableHeadersMet}
          rows={data}
        />
      </Suspense>
    </>
  )
}
