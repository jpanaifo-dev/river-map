'use client'
import { useHidrologicalContext } from '@/providers'
import dynamic from 'next/dynamic'

const AreaChart = dynamic(
  () =>
    import('@/components/hidrological/Chart/AreaChart').then(
      (mod) => mod.AreaChart
    ),
  {
    ssr: false,
  }
)

import {
  convertToChartData,
  convertToMarkArea,
  createCategories,
  getMinMax,
} from './functions'
import { MoreInfo } from './MoreInfo'

export const HidroLineChart = () => {
  const { data, dataUmbral } = useHidrologicalContext()
  const dataMarkArea = convertToMarkArea(dataUmbral)

  const dataChart = convertToChartData(data, dataMarkArea) || []

  const categories = createCategories(dataChart)
  const { minimo, maximo } = getMinMax(dataChart)

  return (
    <main className="w-full flex flex-col gap-4">
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
        />
      )}
      <MoreInfo dataUmbral={dataUmbral} />
    </main>
  )
}
