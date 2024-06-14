'use client'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useHidrologicalContext } from '@/providers/hidrologicalProvider'

const StationsMap = dynamic(
  () => import('@/components').then((mod) => mod.StationsMap),
  {
    ssr: false,
  }
)

export const MapSection = () => {
  const { dataFiltered } = useHidrologicalContext()

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <StationsMap dataStation={dataFiltered} />
      </Suspense>
    </>
  )
}
