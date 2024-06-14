'use client'
import { HidrologicalTable, UmbralTable, MapSection } from '@/components'
import { useFilterFromUrl } from '@/hooks'

export default function Page() {
  const { getParams } = useFilterFromUrl()

  const view = getParams('view', 'table')

  return (
    <>
      <main>
        {view === '' && <MapSection />}
        {view === 'table' && <HidrologicalTable />}
        {view === 'umbral' && <UmbralTable />}
      </main>
    </>
  )
}
