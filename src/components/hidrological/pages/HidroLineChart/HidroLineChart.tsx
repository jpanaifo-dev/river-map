'use client'
import { useHidrologicalContext } from '@/providers'
import { IDataTable } from '@/types'
import { LineChart } from '@tremor/react'

function convertToChartData(data: IDataTable[]) {
  return data?.map((item: IDataTable) => ({
    date: item?.past_date,
    'Nivel actual': item?.current_level,
    'Nivel normal': item?.normal_level,
    'Nivel pasado': item?.past_level,
  }))
}

interface DataItem {
  'Nivel actual': string
  'Nivel normal': string
  'Nivel pasado': string
  date: string
}

function getMinMax(data: DataItem[]): {
  minimo: number
  maximo: number
} {
  console.log('data', data)
  // Extraemos todos los valores numéricos de los niveles
  let valores: number[] = data
    .flatMap((item) => [
      parseFloat(item['Nivel actual']),
      parseFloat(item['Nivel normal']),
      parseFloat(item['Nivel pasado']),
    ])
    .filter((valor) => !isNaN(valor))

  console.log('valores', valores)

  // Calcula el mínimo y máximo de los valores
  let minimo = Math.min(...valores)
  let maximo = Math.max(...valores)

  return { minimo, maximo }
}

export const HidroLineChart = () => {
  const { data } = useHidrologicalContext()

  const dataChart = convertToChartData(data) || []

  const { minimo, maximo } = getMinMax(dataChart)

  return (
    <>
      <header className="pb-2">
        <h1 className="font-bold text-sm uppercase">
          Estación Hidrológica {data[0]?.station || 'No registrado'} - Niveles
          de Agua - Río {data[0]?.river || 'No registrado'}
        </h1>
      </header>
      {dataChart && (
        <LineChart
          // className="mt-4 h-72"
          data={dataChart}
          index="date"
          minValue={minimo}
          maxValue={maximo}
          xAxisLabel="Tiempo (día)/(mes)/(año)"
          yAxisLabel="Nivel de agua (m)"
          yAxisWidth={65}
          categories={['Nivel actual', 'Nivel normal', 'Nivel pasado']}
          colors={['indigo', 'cyan', 'red']}
        />
      )}
    </>
  )
}
