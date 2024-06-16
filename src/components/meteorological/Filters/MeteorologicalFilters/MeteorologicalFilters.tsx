/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, Suspense } from 'react'
import { useHidrological } from '@/hooks'
import { EstacionesData } from './sections'

export const MeteorologicalFilters = () => {
  const { getHidroData, data, loading } = useHidrological()

  useEffect(() => {
    getHidroData()
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
          {/* <ViewTypes /> */}
          {/* <Suspense fallback={<div>Loading...</div>}>
            <EstacionesData
              options={data?.Estacion}
              loading={loading}
            />
          </Suspense> */}
          {/* <UmbralData /> */}
        </article>
      </main>
    </>
  )
}
