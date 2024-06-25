import { Suspense } from 'react'
import { useFilterFromUrl } from '@/hooks'
import { useMeteorologicalContext } from '@/providers'
import { ViewTypes } from '@/components'

interface IOptViews {
  key: string
  name: string
}

const options: IOptViews[] = [
  { key: '', name: 'Ubicación' },
  { key: 'table', name: 'Datos registrados' },
  { key: 'graphic', name: 'Resumen gráfico' },
]

export const EstacionDetails = () => {
  const { getParams } = useFilterFromUrl()
  const { stations } = useMeteorologicalContext()

  const estacion = getParams('estacion', '')

  return (
    <>
      {estacion !== '' && (
        <section className="flex flex-col gap-1 border p-2 rounded-md bg-slate-50">
          <Suspense fallback={<div>Loading...</div>}>
            <section className="flex flex-col gap-2">
              <header className="flex flex-col gap-1 font-medium">
                <h2 className="text-sm font-bold uppercase">
                  Estación: {stations[0]?.EstacionNombre}
                </h2>
                <p className="text-xs text-gray-500">
                  Longitud: {stations[0]?.EstacionLongitud} <br />
                  Latitud: {stations[0]?.EstacionLatitud} <br />
                  Altitud: {stations[0]?.EstacionAltitud}
                </p>
              </header>
              <main className="flex flex-col gap-1">
                <p className="text-sm font-bold">Ver datos</p>
                <ViewTypes options={options} />
              </main>
            </section>
          </Suspense>
        </section>
      )}
    </>
  )
}
