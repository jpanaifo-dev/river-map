'use client'
// components/ApexChartComponent.js
// import dynamic from 'next/dynamic'
// const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface data {
  name: string
  data: number[]
}

interface IProps {
  series: data[]
  categories?: string[]
}

export const AreaChart = (props: IProps) => {
  return <div id="area-chart"></div>
}
