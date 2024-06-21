'use client'
// components/ApexChartComponent.js
// import dynamic from 'next/dynamic'
// const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

interface data {
  name: string
  data: number[]
}

interface IProps {
  series: data[]
  categories?: string[]
}

export const AreaChart = (props: IProps) => {
  const { series, categories } = props
  const options: ApexOptions = {
    chart: {
      id: 'basic-bar',
      type: 'line',
    },
    xaxis: {
      categories: categories || [],
    },
  }

  const chartData = {
    series: series || [],
  }

  return (
    <div id="area-chart">
      <ReactApexChart
        options={options}
        series={chartData?.series}
        type="line"
        height={350}
      />
    </div>
  )
}
