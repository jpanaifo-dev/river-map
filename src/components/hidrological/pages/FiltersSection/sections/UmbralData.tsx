'use client'
import { Button } from '@/components/ui/button'
import { useFilterFromUrl } from '@/hooks'

export const UmbralData = () => {
  const { getParams, updateFilter } = useFilterFromUrl()

  const pathname = getParams('view', '')

  const handleView = (view: string) => {
    updateFilter('view', view)
  }

  return (
    <>
      <section>
        <Button
          variant={pathname === 'umbral' ? 'default' : 'link'}
          onClick={() => handleView('umbral')}
        >
          Ver Umbrales de estaciones
        </Button>
      </section>
    </>
  )
}
