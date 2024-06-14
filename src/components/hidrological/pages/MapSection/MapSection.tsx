'use client'
import dynamic from 'next/dynamic'
import { IStation } from '@/types'

const StationsMap = dynamic(() =>
  import('@/components').then((mod) => mod.StationsMap)
)

interface IProps {
  dataStation?: IStation[]
}

export const MapSection = (props: IProps) => {
  const { dataStation } = props

  return (
    <>
      <StationsMap dataStation={dataStation} />
    </>
  )
}
