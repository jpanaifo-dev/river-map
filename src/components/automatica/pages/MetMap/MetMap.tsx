'use client'
import dynamic from 'next/dynamic'
import { useMeteorologicalContext } from '@/providers'

const DataMap = dynamic(
  () => import('@/components/automatica/Chart').then((mod) => mod.MetDataMap),
  { ssr: false }
)

export const MetMap = () => {
  const { stations } = useMeteorologicalContext()

  return (
    <>
      <DataMap dataStation={stations} />
    </>
  )
}
