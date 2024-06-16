/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, Suspense } from 'react'
import { useMeteorological } from '@/hooks'
import { EstacionesData, ViewTypes } from './sections'

export const MeteorologicalFilters = () => {
  const { getMeteoroData, data, loading } = useMeteorological()

  useEffect(() => {
    getMeteoroData()
  }, [])

  return (
    <>
      <main className="flex flex-col gap-3 w-full p-4">
        <header>
          <h1 className="font-bold">Facilíta tu búsqueda</h1>
          <p className="text-xs text-gray-500">
            Filtra la información específica que deseas obtener de las
            estaciones hidrológicas
          </p>
        </header>
        <article className="flex flex-col gap-2">
          <Suspense fallback={<div>Loading...</div>}>
            <EstacionesData
              options={data?.EstacionHM || []}
              loading={loading}
            />
            <ViewTypes />
          </Suspense>

          {/* <UmbralData /> */}
        </article>
      </main>
    </>
  )
}
