'use client'
import { Suspense } from 'react'
import { useHidrologicalContext } from '@/providers/hidrologicalProvider'
import { StationsMap } from '../../maps'

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
