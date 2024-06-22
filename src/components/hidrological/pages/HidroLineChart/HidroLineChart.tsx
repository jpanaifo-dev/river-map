'use client'
import { useHidrologicalContext } from '@/providers'
import dynamic from 'next/dynamic'

import { IDataTable, IUmbral } from '@/types'

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
  name?: string
  data: Array<number | string>
  smooth?: boolean
  symbol?: string
}

interface IMarkArea {
  yAxis: number
}

function convertToChartData(data: IDataTable[]): IData[] {
  // Utilidad para convertir y filtrar valores válidos
  const filterValidNumbers = (items: string | undefined | null) =>
    items ? Number(items) : NaN // Convertimos a número si es válido, de lo contrario NaN

  const isValidNumber = (num: number) => !isNaN(num) // Verificamos si el número es válido (no NaN)

  return [
    {
      type: 'line',
      name: 'Nivel actual',
      symbol: 'none',
      data: data
        ?.map((item) => filterValidNumbers(item?.current_level))
        .filter(isValidNumber),
      smooth: true,
    },
    {
      type: 'line',
      name: 'Nivel normal',
      symbol: 'none',
      data: data
        ?.map((item) => filterValidNumbers(item?.normal_level))
        .filter(isValidNumber),
      smooth: true,
    },
    {
      type: 'line',
      name: 'Nivel pasado',
      symbol: 'none',
      data: data
        ?.map((item) => filterValidNumbers(item?.past_level))
        .filter(isValidNumber),
      smooth: true,
    },
  ]
}

function convertToMarkArea(data: IUmbral[]): Array<IMarkArea[]> {
  return data.map((item) => {
    return [
      {
        yAxis: Number(item?.UmbValor),
      },
      {
        yAxis: Number(item?.UmbValor2),
      },
    ]
  })
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

function getMinMax(data: IUmbral[]): { minimo: number; maximo: number } {
  const values = data.map((item) => [
    Number(item?.UmbValor),
    Number(item?.UmbValor2),
  ])

  const minimo = Math.min(...values.flat())
  const maximo = Math.max(...values.flat())

  return { minimo, maximo }
}

export const HidroLineChart = () => {
  const { data, dataUmbral } = useHidrologicalContext()

  const dataChart = convertToChartData(data) || []

  const categories = createCategories(dataChart)
  const { minimo, maximo } = getMinMax(dataUmbral)

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

      {dataChart && (
        <AreaChart
          series={dataChart}
          categories={categories}
          yAxis={{
            name: 'Nivel de agua (m)',
            max: maximo,
            min: minimo,
          }}
          markArea={convertToMarkArea(dataUmbral)}
        />
      )}
    </>
  )
}
