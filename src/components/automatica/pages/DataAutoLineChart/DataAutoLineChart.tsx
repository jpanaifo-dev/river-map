'use client'
import { useMeteorologicalContext } from '@/providers'
import { IDataTableMet, IDataChart } from '@/types'
import dynamic from 'next/dynamic'

const AreaChartMeteorologic = dynamic(
  () => import('@/components').then((mod) => mod.AreaChartMeteorologic),
  {
    ssr: false,
  }
)

function convertToChartData(data: IDataTableMet[]): IDataChart[] {
  // Utilidad para convertir y filtrar valores válidos
  const filterValidNumbers = (items: string | undefined | null) =>
    items ? Number(items) : NaN // Convertimos a número si es válido, de lo contrario NaN

  return [
    {
      type: 'line',
      name: 'Humedad (%)',
      symbol: 'none',
      data: data?.map((item) => filterValidNumbers(item?.auto_hr)),
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
      name: 'Radiación (W/m²)',
      symbol: 'none',
      data: data?.map((item) => filterValidNumbers(item?.auto_radiacion)),
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
      name: 'Temperatura (°C)',
      data: data?.map((item) => filterValidNumbers(item?.auto_temp)),
      smooth: true,
      itemStyle: {
        color: 'rgb(0,0,0)',
      },
    },
    {
      type: 'line',
      name: 'Velocidad del Viento (m/s)',
      symbol: 'none',
      data: data?.map((item) => filterValidNumbers(item?.auto_wind_vel)),
      smooth: true,
      itemStyle: {
        color: 'rgb(128, 128, 128)',
      },
    },
    {
      type: 'line',
      name: 'Dirección del Viento (°)',
      data: data?.map((item) => filterValidNumbers(item?.auto_wind_dir)),
      smooth: true,
      itemStyle: {
        color: 'rgba(0,255,0,0.5)',
      },
    },
  ]
}

// function getMinMax(data: DataItem[]): {
//   minimo: number
//   maximo: number
// } {
//   // Extraemos todos los valores numéricos de los niveles
//   let valores: number[] = data
//     .flatMap((item) => [
//       parseFloat(item['Humedad (%)']),
//       parseFloat(item['Radiación (W/m²)']),
//       parseFloat(item['Temperatura (°C)']),
//       parseFloat(item['Velocidad del Viento (m/s)']),
//     ])
//     .filter((valor) => !isNaN(valor))

//   // Calcula el mínimo y máximo de los valores
//   let minimo = Math.min(...valores)
//   let maximo = Math.max(...valores)

//   return { minimo, maximo }
// }

export const DataAutoLineChart = () => {
  const { data } = useMeteorologicalContext()
  const dataChart = convertToChartData(data) || []

  // const { minimo, maximo } = getMinMax(dataChart)

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
          categories={data?.map((item) => item?.auto_date) || []}
          // minimo={minimo}
          // maximo={maximo}
        />
      </main>
    </>
  )
}
