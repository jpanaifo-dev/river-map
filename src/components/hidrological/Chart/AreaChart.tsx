'use client'
import ReactECharts from 'echarts-for-react'
interface data {
  name?: string
  type: string
  data: Array<number | string>
  smooth?: boolean
}

interface IYAxis {
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
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: categories || [],
    },
    yAxis: {
      type: 'value',
      min: yAxis?.min,
      max: yAxis?.max,
    },
    series: series || [],
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: series.map((item) => item.name),
    },
  }

  return (
    <div id="area-chart">
      <ReactECharts option={options} />
    </div>
  )
}
