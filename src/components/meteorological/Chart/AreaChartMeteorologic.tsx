'use client'
import ReactECharts from 'echarts-for-react'
import { IDataChart, IYAxis } from '@/types'

interface IProps {
  series: IDataChart[]
  categories?: string[]
  yAxis?: IYAxis
}

export const AreaChartMeteorologic = (props: IProps) => {
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
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    legend: {
      data: series?.map((item) => item.name) || [],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
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
    <div
      id="area-chart"
      className="bg-white rounded-lg p-4"
    >
      <ReactECharts
        option={options}
        style={{ height: '470px', width: '100%' }}
      />
    </div>
  )
}
