import { Suspense } from 'react'
import { useFilterFromUrl } from '@/hooks'
import { useHidrologicalContext } from '@/providers'
import { ViewTypes } from '.'

export const EstacionDetails = () => {
  const { getParams } = useFilterFromUrl()
  const { dataFiltered } = useHidrologicalContext()

  const estacion = getParams('estacion', '')

  return (
    <>
      {estacion !== '' && (
        <section className="flex flex-col gap-1 border p-2 rounded-md">
          <Suspense fallback={<div>Loading...</div>}>
            <section className="flex flex-col gap-1">
              <header className="flex flex-col gap-1 font-medium">
                <h2 className="text-sm font-bold uppercase">
                  Estación: {dataFiltered[0]?.EstNombre}
                </h2>
                <p className="text-sm text-gray-500 font-bold">
                  Río: {dataFiltered[0]?.EstRio}
                </p>
                <p className="text-xs text-gray-500">
                  Longitud: {dataFiltered[0]?.EstLongitud} <br />
                  Latitud: {dataFiltered[0]?.EstLatitud}
                </p>
              </header>
              <main className="flex flex-col gap-2 ">
                <p className="text-xs text-gray-500 font-medium">
                  Institución: {dataFiltered[0]?.EstInstitucion}
                </p>
                <section className="flex flex-col gap-2">
                  <p className="text-sm font-bold">Ver datos</p>
                  <ViewTypes />
                </section>
              </main>
            </section>
          </Suspense>
        </section>
      )}
    </>
  )
}
