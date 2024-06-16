'use client'
import { Suspense } from 'react'
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

export const MetTable = () => {
  const { data } = useHidrologicalContext()

  return (
    <>
      <header className="pb-2">
        <h1 className="font-bold text-sm uppercase">
          Estación Hidrológica {data[0]?.station || 'No registrado'} - Niveles
          de Agua - Río {data[0]?.river || 'No registrado'}
        </h1>
        <p className="text-xs text-gray-500">
          Niveles de agua de la estación hidrológica en el río
        </p>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <TableCustom
          headers={tableHeaders}
          rows={data}
        />
      </Suspense>
    </>
  )
}
