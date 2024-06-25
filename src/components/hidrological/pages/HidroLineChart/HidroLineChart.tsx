'use client'
import { useHidrologicalContext } from '@/providers'
import dynamic from 'next/dynamic'

const AreaChart = dynamic(
  () =>
    import('@/components/hidrological/Chart/AreaChart').then(
      (mod) => mod.AreaChart
    ),
  { ssr: false }
)

import { IDataTable } from '@/types'
import { LineChart } from '@tremor/react'

interface IData {
  name: string
  data: number[]
}

// import { AreaChart } from '../../Chart'

function convertToChartData(data: IDataTable[]): IData[] {
  // Utilidad para convertir y filtrar valores válidos
  const filterValidNumbers = (items: string | undefined | null) =>
    items ? Number(items) : NaN // Convertimos a número si es válido, de lo contrario NaN

  const isValidNumber = (num: number) => !isNaN(num) // Verificamos si el número es válido (no NaN)

  return [
    {
      name: 'Nivel actual',
      data: data
        ?.map((item) => filterValidNumbers(item?.current_level))
        .filter(isValidNumber),
    },
    {
      name: 'Nivel normal',
      data: data
        ?.map((item) => filterValidNumbers(item?.normal_level))
        .filter(isValidNumber),
    },
    {
      name: 'Nivel pasado',
      data: data
        ?.map((item) => filterValidNumbers(item?.past_level))
        .filter(isValidNumber),
    },
  ]
}

// function createCategories(data: IData[]): string[] {
//   const uniqueCategories = new Set<string>();

//   data.forEach((item) => {
//     item.data.forEach((_, index) => {
//       const date = new Date();
//       date.setDate(date.getDate() + index);
//       const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
//       uniqueCategories.add(formattedDate);
//     });
//   });

//   return Array.from(uniqueCategories);
// }

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

// function getMinMax(data: DataItem[]): {
//   minimo: number
//   maximo: number
// } {
//   // Extraemos todos los valores numéricos de los niveles
//   let valores: number[] = data
//     .flatMap((item) => [
//       parseFloat(item['Nivel actual']),
//       parseFloat(item['Nivel normal']),
//       parseFloat(item['Nivel pasado']),
//     ])
//     .filter((valor) => !isNaN(valor))

//   // Calcula el mínimo y máximo de los valores
//   let minimo = Math.min(...valores)
//   let maximo = Math.max(...valores)

//   return { minimo, maximo }
// }

export const HidroLineChart = () => {
  const { data } = useHidrologicalContext()
  const dataChart = convertToChartData(data) || []

  // const categories = createCategories(dataChart)

  // const { minimo, maximo } = getMinMax(dataChart)

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
      <AreaChart
        series={dataChart}
        // categories={categories}
      />
    </>
  )
}
