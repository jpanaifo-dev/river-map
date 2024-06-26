'use client'
import { useHMDataContext } from '@/providers'
import { IDataChart, IDataTableMH, IYAxis } from '@/types'
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
      data: data?.map((item) => filterValidNumbers(item?.temperatura_max)),
      smooth: true,
      itemStyle: {
        color: 'rgba(255, 0, 0, 1)',
      },
    },
    {
      type: 'line',
      name: 'Temperatura mínima',
      data: data?.map((item) => filterValidNumbers(item?.temperatura_min)),
      smooth: true,
      itemStyle: {
        color: 'rgba(255,165,0,1)',
      },
    },

    {
      type: 'bar',
      name: 'Precipitación ',
      data: data?.map((item) =>
        filterValidNumbers(item?.precipitacion_pluvial)
      ),
      smooth: true,
      itemStyle: {
        //Coloca un celeste oceano en rgb
        color: 'rgba(0, 191, 255, 0.4)',
      },
    },
  ]
}

const yAxis: IYAxis[] = [
  {
    type: 'value',
    name: 'Evaporation',
    position: 'right',
    alignTicks: true,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#5470C6',
      },
    },
    axisLabel: {
      formatter: '{value} ml',
    },
  },
  {
    type: 'value',
    name: 'Precipitation',
    position: 'right',
    alignTicks: true,
    offset: 80,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#91CC75',
      },
    },
    axisLabel: {
      formatter: '{value} ml',
    },
  },
  {
    type: 'value',
    name: '温度',
    position: 'left',
    alignTicks: true,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#EE6666',
      },
    },
    axisLabel: {
      formatter: '{value} °C',
    },
  },
]

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
          yAxis={yAxis}
          grid={{
            right: '10%',
            left: 0,
          }}
        />
      </main>
    </>
  )
}
