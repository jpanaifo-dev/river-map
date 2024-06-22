import { IDataTable, IUmbral, IDataChart, IDataMarkArea } from '@/types'

export function convertToChartData(
  data: IDataTable[],
  markArea: Array<IDataMarkArea[]>
): IDataChart[] {
  // Utilidad para convertir y filtrar valores válidos
  const filterValidNumbers = (items: string | undefined | null) =>
    items ? Number(items) : NaN // Convertimos a número si es válido, de lo contrario NaN

  return [
    {
      type: 'line',
      name: 'Nivel actual',
      symbol: 'none',
      data: data?.map((item) => filterValidNumbers(item?.current_level)),
      smooth: true,
      itemStyle: {
        color: 'rgb(0, 0, 255)',
      },
    },
    {
      type: 'line',
      name: 'Nivel normal',
      symbol: 'none',
      data: data?.map((item) => filterValidNumbers(item?.normal_level)),
      // .filter(isValidNumber),
      smooth: true,
      itemStyle: {
        color: 'rgb(0, 255, 0)',
      },
    },
    {
      type: 'line',
      name: 'Nivel pasado',
      symbol: 'none',
      data: data?.map((item) => filterValidNumbers(item?.past_level)),
      smooth: true,
      itemStyle: {
        color: 'rgb(128, 128, 128)',
      },
    },
    {
      type: 'line',
      name: 'Off Umbral',
      symbol: 'none',
      data: [],
      markArea: {
        data: markArea,
      },
    },
  ]
}

export function getColorUmbral(value: string): string {
  switch (value) {
    case 'AMARILLO':
      return 'rgb(255, 255, 0, 0.4)'
    case 'NARANJA':
      return 'rgb(255, 165, 0, 0.4)'
    case 'ROJO':
      return 'rgb(255, 0, 0, 0.4)'
    default:
      return 'rgb(255, 255, 255, 0.4)'
  }
}

export function convertToMarkArea(data: IUmbral[]): Array<IDataMarkArea[]> {
  return data.map((item) => {
    return [
      {
        yAxis: Number(item?.UmbValor),
        itemStyle: {
          color: getColorUmbral(item?.UmbColor),
        },
      },
      {
        yAxis: Number(item?.UmbValor2),
      },
    ]
  })
}

export function createCategories(data: IDataTable[]): string[] {
  const uniqueCategories = new Set<string>()

  data.forEach((item) => {
    uniqueCategories.add(item.current_date)
  })

  return Array.from(uniqueCategories)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((item) => item.split('T')[0])
}

export function getMinMax(data: IDataChart[]): {
  minimo: number
  maximo: number
} {
  const values = data?.map((item) => item.data).flat()

  // Excluir valores NaN y convertir a número
  const validValues = values.filter((item) => !isNaN(Number(item))) as number[]

  return {
    minimo: Math.min(...validValues),
    maximo: Math.max(...validValues),
  }
}
