/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { EstacionesData } from './sections'
import { useHidrological } from '@/hooks'

export const FiltersSection = () => {
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
          <EstacionesData
            options={data?.Estacion}
            loading={loading}
          />
        </article>
      </main>
    </>
  )
}
