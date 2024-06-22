/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { useHidrological } from '@/hooks'
import { EstacionDetails, EstacionesData } from './sections'
import { HeaderFilters } from '@/components'

export const HidrologicalFilters = () => {
  const { getHidroData, data, loading } = useHidrological()

  useEffect(() => {
    getHidroData()
  }, [])

  return (
    <>
      <main className="flex flex-col gap-3 w-full p-4">
        <HeaderFilters />
        <article className="flex flex-col gap-2">
          <EstacionesData
            options={data?.Estacion}
            loading={loading}
          />
          <EstacionDetails />
        </article>
      </main>
    </>
  )
}
