'use clien'
import { Button } from '@/components/ui/button'
import { useFilterFromUrl } from '@/hooks'

export const ViewTypes = () => {
  const { getParams, updateFilter } = useFilterFromUrl()

  const pathname = getParams('view', '')

  const handleView = (view: string) => {
    updateFilter('view', view)
  }

  return (
    <section className="flex flex-col gap-1">
      <h1 className="text-sm font-medium">Vizualizar como</h1>
      <div className="flex">
        <Button
          variant={pathname === '' ? 'default' : 'link'}
          onClick={() => handleView('')}
        >
          Visor
        </Button>
        <Button
          variant={pathname === 'table' ? 'default' : 'link'}
          onClick={() => handleView('table')}
        >
          Tabla{' '}
        </Button>
        <Button
          variant={pathname === 'graphic' ? 'default' : 'link'}
          onClick={() => handleView('graphic')}
        >
          Gráfico
        </Button>
      </div>
    </section>
  )
}
