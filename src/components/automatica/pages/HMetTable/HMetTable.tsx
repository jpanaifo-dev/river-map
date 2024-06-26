'use client'
import { Suspense } from 'react'
import { useHMDataContext, useMeteorologicalContext } from '@/providers'
import { TableCustom } from '@/components'

const tableHeaders = [
  { key: 'station_id', value: 'ID de Estación' },
  { key: 'station', value: 'Estación' },
  { key: 'station_type', value: 'Tipo de Estación' },
  { key: 'station_lng', value: 'Longitud de la Estación' },
  { key: 'station_lat', value: 'Latitud de la Estación' },
  { key: 'station_alt', value: 'Altitud de la Estación' },
  { key: 'date', value: 'Fecha de Registro' },
  { key: 'date_last', value: 'Última Fecha Registrada' },
  { key: 'precipitacion_pluvial', value: 'Precipitación Pluvial (mm)' },
  { key: 'temperatura_max', value: 'Temperatura Máxima (°C)' },
  { key: 'temperatura_min', value: 'Temperatura Mínima (°C)' },
]

export const HMetTable = () => {
  const { data } = useHMDataContext()

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
        <main className="w-full bg-white rounded-lg p-2">
          <TableCustom
            headers={tableHeaders}
            rows={data}
          />
        </main>
      </Suspense>
    </>
  )
}
