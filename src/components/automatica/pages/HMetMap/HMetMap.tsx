'use client'
import dynamic from 'next/dynamic'
import { useHMDataContext } from '@/providers'

const HDataMap = dynamic(
  () =>
    import('@/components/automatica/Map/HMetDataMap').then(
      (mod) => mod.HMetDataMap
    ),
  { ssr: false }
)

export const HMetMap = () => {
  const { stations } = useHMDataContext()

  return (
    <>
      <HDataMap dataStation={stations} />
    </>
  )
}
