'use client'
import { useHidrologicalContext } from '@/providers/hidrologicalProvider'
import { StationsMap } from '../../maps'
import { Suspense } from 'react'

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
