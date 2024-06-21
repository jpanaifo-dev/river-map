'use client'
import ReactECharts from 'echarts-for-react'
interface data {
  name: string
  data: number[]
}

interface IProps {
  series: data[]
  categories?: string[]
}

const options = {
  grid: { top: 8, right: 8, bottom: 24, left: 36 },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ],
  tooltip: {
    trigger: 'axis',
  },
}

export const AreaChart = (props: IProps) => {
  return <div id="area-chart">
    <ReactECharts option={options} />
  </div>
}
