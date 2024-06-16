'use client'
import { MeteorogicalMap } from '../../maps'
import { useMeteorologicalContext } from '@/providers/meteorologicalProvider'

export const MapMeteSection = () => {
  const { dataFiltered } = useMeteorologicalContext()

  return (
    <>
      <MeteorogicalMap dataStation={dataFiltered} />
    </>
  )
}
