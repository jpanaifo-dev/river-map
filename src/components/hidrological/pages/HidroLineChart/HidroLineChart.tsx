'use client'
import { useHidrologicalContext } from '@/providers'
import dynamic from 'next/dynamic'

import { IDataTable } from '@/types'
// import { LineChart } from '@tremor/react'

const AreaChart = dynamic(
  () =>
    import('@/components/hidrological/Chart/AreaChart').then(
      (mod) => mod.AreaChart
    ),
  {
    ssr: false,
  }
)

interface IData {
  type: string
  data: Array<number | string>
  smooth?: boolean
}

// import { AreaChart } from '../../Chart'

function convertToChartData(data: IDataTable[]): IData[] {
  // Utilidad para convertir y filtrar valores válidos
  const filterValidNumbers = (items: string | undefined | null) =>
    items ? Number(items) : NaN // Convertimos a número si es válido, de lo contrario NaN

  const isValidNumber = (num: number) => !isNaN(num) // Verificamos si el número es válido (no NaN)

  return [
    {
      type: 'line',
      data: data
        ?.map((item) => filterValidNumbers(item?.current_level))
        .filter(isValidNumber),
      smooth: true,
    },
    {
      type: 'line',
      data: data
        ?.map((item) => filterValidNumbers(item?.normal_level))
        .filter(isValidNumber),
      smooth: true,
    },
    {
      type: 'line',
      data: data
        ?.map((item) => filterValidNumbers(item?.past_level))
        .filter(isValidNumber),
      smooth: true,
    },
    // {
    //   name: 'Umbral bajo',
    //   data: data
    //     ?.map((item) => filterValidNumbers(item?.low_threshold))
    //     .filter(isValidNumber),
    // },
    // {
    //   name: 'Umbral alto',
    //   data: data
    //     ?.map((item) => filterValidNumbers(item?.high_threshold))
    //     .filter(isValidNumber),
    // },
  ]
}

function createCategories(data: IData[]): string[] {
  const uniqueCategories = new Set<string>()

  data.forEach((item) => {
    item.data.forEach((_, index) => {
      const date = new Date()
      date.setDate(date.getDate() + index)
      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`
      uniqueCategories.add(formattedDate)
    })
  })

  return Array.from(uniqueCategories)
}

// function convertToChartData(data: IDataTable[]) {
//   return data?.map((item: IDataTable) => ({
//     date: item?.past_date,
//     'Nivel actual': item?.current_level,
//     'Nivel normal': item?.normal_level,
//     'Nivel pasado': item?.past_level,
//     'Umbral bajo': item?.low_threshold,
//     'Umbral alto': item?.high_threshold,
//   }))
// }

// interface DataItem {
//   'Nivel actual': string
//   'Nivel normal': string
//   'Nivel pasado': string
//   'Umbral bajo': string
//   'Umbral alto': string
//   date: string
// }

function getMinMax(data: IData[]): { minimo: number; maximo: number } {
  const values = data
    .map((item) => item.data)
    .reduce((acc, item) => acc.concat(item), [])
    .map((value) => Number(value))

  return {
    minimo: Math.min(...values),
    maximo: Math.max(...values),
  }
}

export const HidroLineChart = () => {
  const { data } = useHidrologicalContext()
  const dataChart = convertToChartData(data) || []

  const categories = createCategories(dataChart)

  const { minimo, maximo } = getMinMax(dataChart)

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
      {/* {dataChart && (
        <LineChart
          className="h-full max-h-[450px] w-full"
          data={dataChart}
          index="date"
          minValue={minimo}
          maxValue={maximo}
          xAxisLabel="Tiempo (día)/(mes)/(año)"
          yAxisLabel="Nivel de agua (m)"
          yAxisWidth={65}
          categories={[
            'Nivel actual',
            'Nivel normal',
            'Nivel pasado',
            'Umbral bajo',
            'Umbral alto',
          ]}
          colors={['indigo', 'green', 'cyan', 'yellow', 'red']}
          onValueChange={(value) => {
            console.log('value', value)
          }}
        />
      )} */}
      {dataChart && (
        <AreaChart
          series={dataChart}
          categories={categories}
          yAxis={{
            max: maximo,
            min: minimo,
          }}
        />
      )}
    </>
  )
}
