'use client'

import { LineChart } from '@tremor/react'

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString()

interface MainLineChartProps {
  subtitle?: string
  data: any[]
  categories: string[]
  colors: string[]
  valueFormatter?: (number: number) => string
}

export const MainLineChart = ({
  subtitle,
  data,
  categories,
  colors,
  valueFormatter = dataFormatter,
}: MainLineChartProps) => {
  return (
    <div className="w-full flex flex-col">
      {subtitle && (
        <h3 className="text-tremor-content-emphasis text-md">{subtitle}</h3>
      )}
      <div>
        <LineChart
          className="w-full h-[400px] rounded-tremor-default shadow-tremor-default bg-tremor-background text-tremor-brand-emphasis"
          data={data}
          index={'date'}
          categories={categories}
          colors={colors}
          valueFormatter={valueFormatter}
          lang="es"
          showXAxis={true}
          tickGap={5}
        />
      </div>
    </div>
  )
}
