'use client'
import { useHidrologicalContext } from '@/providers/hidrologicalProvider'
import { StationsMap } from '../../maps'

export const MapSection = () => {
  const { dataFiltered } = useHidrologicalContext()

  return (
    <>
      <StationsMap dataStation={dataFiltered} />
    </>
  )
}
