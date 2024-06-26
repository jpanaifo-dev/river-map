/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, Suspense } from 'react'
import { useMeteorological } from '@/hooks'
import { EstacionesData, EstacionDetails } from './sections'
import { HeaderFilters } from '@/components'

export const MeteorologicalFilters = () => {
  const { getMeteoroData, data, loading } = useMeteorological()

  useEffect(() => {
    getMeteoroData()
  }, [])

  return (
    <>
      <main className="flex flex-col gap-3 w-full p-4">
        <HeaderFilters />
        <article className="flex flex-col gap-2">
          <Suspense fallback={<div>Loading...</div>}>
            <EstacionesData
              options={data?.EstacionHM || []}
              loading={loading}
            />
            <EstacionDetails />
          </Suspense>
        </article>
      </main>
    </>
  )
}
