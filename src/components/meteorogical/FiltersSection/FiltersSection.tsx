/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { ViewTypes } from './sections'
import { EstacionesMeteData } from './sections/EstacionesData'
import { useMeteorological } from '@/hooks/useMeteorological'

export const FiltersMeteSection = () => {
  const { getMetroData, data, loading } = useMeteorological()

  useEffect(() => {
    getMetroData()
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
          <ViewTypes />
          <EstacionesMeteData
            options={data?.EstacionHM}
            loading={loading}
          />
        </article>
      </main>
    </>
  )
}
