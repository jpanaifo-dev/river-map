'use clien'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { useFilterFromUrl } from '@/hooks'

export const ViewTypes = () => {
  const { getParams, updateFilter } = useFilterFromUrl()

  const view = getParams('view', '')
  const isStation = getParams('estacion', '') !== ''

  const handleView = (view: string) => {
    updateFilter('view', view)
  }

  return (
    <>
      {isStation && (
        <section className="flex flex-col gap-1">
          <h1 className="text-sm font-medium">Detalles de datos</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="flex">
              <Button
                variant={view === 'table' ? 'default' : 'link'}
                onClick={() => handleView('table')}
                size="sm"
              >
                Ver tabla
              </Button>
              <Button
                variant={view === 'graphic' ? 'default' : 'link'}
                onClick={() => handleView('graphic')}
                size="sm"
              >
                Ver gráfico
              </Button>
            </div>
          </Suspense>
        </section>
      )}
    </>
  )
}
