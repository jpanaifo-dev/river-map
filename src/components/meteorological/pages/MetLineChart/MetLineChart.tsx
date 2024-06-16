'use client'
import { useMeteorologicalContext } from '@/providers'
import { IDataTableMet } from '@/types'
import { LineChart } from '@tremor/react'

function convertToChartData(data: IDataTableMet[]) {
  return data?.map((item: IDataTableMet) => ({
    date: item?.auto_date,
    'Humedad (%)': item?.auto_hr,
    'Radiación (W/m²)': item?.auto_radiacion,
    'Temperatura (°C)': item?.auto_temp,
    'Velocidad del Viento (m/s)': item?.auto_wind_vel,
    'Dirección del Viento (°)': item?.auto_wind_dir,
  }))
}

interface DataItem {
  'Humedad (%)': string
  'Radiación (W/m²)': string
  'Temperatura (°C)': string
  'Velocidad del Viento (m/s)': string
  'Dirección del Viento (°)': string
  date: string
}

function getMinMax(data: DataItem[]): {
  minimo: number
  maximo: number
} {
  // Extraemos todos los valores numéricos de los niveles
  let valores: number[] = data
    .flatMap((item) => [
      parseFloat(item['Humedad (%)']),
      parseFloat(item['Radiación (W/m²)']),
      parseFloat(item['Temperatura (°C)']),
      parseFloat(item['Velocidad del Viento (m/s)']),
    ])
    .filter((valor) => !isNaN(valor))

  // Calcula el mínimo y máximo de los valores
  let minimo = Math.min(...valores)
  let maximo = Math.max(...valores)

  return { minimo, maximo }
}

export const MetLineChart = () => {
  const { data } = useMeteorologicalContext()
  const dataChart = convertToChartData(data) || []

  const { minimo, maximo } = getMinMax(dataChart)

  return (
    <>
      <header className="pb-2">
        <h1 className="font-bold text-sm uppercase">
          Estación Hidrológica {data[0]?.station || 'No registrado'} - Datos
          Meteorológicos
        </h1>
        <p className="text-xs text-gray-500">
          Información meteorológica de la estación hidrológica seleccionada
        </p>
      </header>
      {dataChart && (
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
            'Humedad (%)',
            'Radiación (W/m²)',
            'Temperatura (°C)',
            'Velocidad del Viento (m/s)',
            'Dirección del Viento (°)',
          ]}
          colors={['indigo', 'green', 'cyan', 'yellow', 'red']}
          onValueChange={(value) => {
            console.log('value', value)
          }}
        />
      )}
    </>
  )
}
