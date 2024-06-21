'use client'
import ReactECharts from 'echarts-for-react'
interface data {
  name?: string
  type: string
  data: Array<number | string>
  smooth?: boolean
  symbol?: string
}

interface IYAxis {
  name?: string
  min?: number
  max?: number
}

interface IProps {
  series: data[]
  categories?: string[]
  yAxis?: IYAxis
}

export const AreaChart = (props: IProps) => {
  const { series, categories, yAxis } = props

  const options = {
    grid: { right: 8, bottom: 80, left: 56 },
    xAxis: {
      type: 'category',
      data: categories || [],
    },
    yAxis: [
      {
        type: 'value',
        name: yAxis?.name,
        min: yAxis?.min,
        max: yAxis?.max,
      },
    ],
    series: series || [],
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: series.map((item) => item.name),
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
  }

  return (
    <div id="area-chart">
      <ReactECharts
        option={options}
        style={{ height: '470px', width: '100%' }}
      />
    </div>
  )
}
