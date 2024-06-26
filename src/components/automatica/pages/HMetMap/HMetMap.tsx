'use client'
import dynamic from 'next/dynamic'
import { useMeteorologicalContext } from '@/providers'

const DataMap = dynamic(
  () =>
    import('@/components/automatica/Map/HMetDataMap').then(
      (mod) => mod.HMetDataMap
    ),
  { ssr: false }
)

export const HMetMap = () => {
  const { stations } = useMeteorologicalContext()

  return (
    <>
      <DataMap dataStation={stations} />
    </>
  )
}
