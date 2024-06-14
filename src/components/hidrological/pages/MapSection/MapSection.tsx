'use client'
import { StationsMap } from '../../maps'
import { useHidrologicalContext } from '@/providers/hidrologicalProvider'

export const MapSection = () => {
  const { dataFiltered } = useHidrologicalContext()

  return (
    <>
      <StationsMap dataStation={dataFiltered} />
    </>
  )
}
