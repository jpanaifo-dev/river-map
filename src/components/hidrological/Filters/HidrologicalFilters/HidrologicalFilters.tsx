/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { useHidrological } from '@/hooks'
import { EstacionDetails, EstacionesData } from './sections'

export const HidrologicalFilters = () => {
  const { getHidroData, data, loading } = useHidrological()

  useEffect(() => {
    getHidroData()
  }, [])

  return (
    <>
      <main className="flex flex-col gap-3 w-full p-4">
        <header>
          <h1 className="font-bold text-white">Selección de estación</h1>
          <p className="text-xs text-gray-300">
            Para visualizar la información de la estación hidrológica,
            seleccione una estación de la lista.
          </p>
        </header>
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
