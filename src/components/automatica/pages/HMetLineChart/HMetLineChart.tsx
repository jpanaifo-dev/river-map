'use client'
import { useHMDataContext } from '@/providers'
import { IDataChart, IDataTableMH } from '@/types'
import dynamic from 'next/dynamic'

const AreaChartMeteorologic = dynamic(
  () => import('@/components').then((mod) => mod.AreaChartMeteorologic),
  {
    ssr: false,
  }
)

function convertToChartData(data: IDataTableMH[]): IDataChart[] {
  // Utilidad para convertir y filtrar valores válidos
  const filterValidNumbers = (items: string | undefined | null) =>
    items ? Number(items) : NaN // Convertimos a número si es válido, de lo contrario NaN

  return [
    {
      type: 'line',
      name: 'Temperatura máxima',
      symbol: 'none',
      data: data?.map((item) => filterValidNumbers(item?.temperatura_max)),
      smooth: true,
      itemStyle: {
        color: 'rgba(88,160,253,1)',
      },
      areaStyle: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        global: false,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(255,165,0,0.6)',
          },
          {
            offset: 0.5,
            color: 'rgba(255,165,0,0.3)',
          },
          {
            offset: 1,
            color: 'rgba(255,165,0,0)',
          },
        ],
      },
    },
    {
      type: 'line',
      name: 'Temperatura mínima',
      symbol: 'none',
      data: data?.map((item) => filterValidNumbers(item?.temperatura_min)),
      smooth: true,
      itemStyle: {
        color: 'rgba(255,165,0,1)',
      },
      areaStyle: {
        type: 'linear',
        global: false,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(255,165,0,1)',
          },
          {
            offset: 1,
            color: 'rgba(255,165,0,0)',
          },
        ],
      },
    },

    {
      type: 'line',
      name: 'Presipitación ',
      data: data?.map((item) =>
        filterValidNumbers(item?.precipitacion_pluvial)
      ),
      smooth: true,
      itemStyle: {
        color: 'rgba(0,255,0,0.5)',
      },
    },
  ]
}

export const HMetLineChart = () => {
  const { data } = useHMDataContext()
  const dataChart = convertToChartData(data) || []

  return (
    <>
      <header className="pb-2">
        <h1 className="font-bold text-sm uppercase">
          Estación Automática {data[0]?.station || 'No registrado'} - Datos
          Meteorológicos
        </h1>
        <p className="text-xs text-gray-500">
          Información meteorológica de la estación hidrológica seleccionada
        </p>
      </header>
      <main className="w-full bg-white rounded-lg p-2">
        <AreaChartMeteorologic
          series={dataChart}
          categories={data?.map((item) => item?.date) || []}
          // minimo={minimo}
          // maximo={maximo}
        />
      </main>
    </>
  )
}
