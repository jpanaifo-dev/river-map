'use client'
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
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col gap-1">
          <Button
            variant={view === '' ? 'default' : 'link'}
            onClick={() => handleView('')}
            size="sm"
            className="border"
          >
            Visor
          </Button>
          <Button
            variant={view === 'table' ? 'default' : 'link'}
            onClick={() => handleView('table')}
            size="sm"
            className="border"
          >
            Ver tabla
          </Button>
          <Button
            variant={view === 'graphic' ? 'default' : 'link'}
            onClick={() => handleView('graphic')}
            size="sm"
            className="border"
          >
            Ver gráfico
          </Button>
        </div>
      </Suspense>
    </>
  )
}
