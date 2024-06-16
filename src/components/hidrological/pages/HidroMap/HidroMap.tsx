'use client'
import dynamic from 'next/dynamic'
import { useHidrologicalContext } from '@/providers'

const DataMap = dynamic(
  () => import('../../map/DataMap').then((mod) => mod.DataMap),
  { ssr: false }
)

export const HidroMap = () => {
  const { dataFiltered } = useHidrologicalContext()

  return (
    <>
      <DataMap dataStation={dataFiltered} />
    </>
  )
}
