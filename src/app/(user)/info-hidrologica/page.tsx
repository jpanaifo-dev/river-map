'use client'
import dynamic from 'next/dynamic'
import { HidrologicalTable, UmbralTable } from '@/components'
import { useFilterFromUrl } from '@/hooks'

// Solo desactivar SSR para MapSection
const MapSection = dynamic(
  () => import('@/components').then((mod) => mod.MapSection),
  {
    ssr: false,
  }
)

export default function Page() {
  const { getParams } = useFilterFromUrl()
  const view = getParams('view', '')

  return (
    <main>
      {view === '' && <MapSection />}
      {view === 'table' && <HidrologicalTable />}
      {view === 'umbral' && <UmbralTable />}
    </main>
  )
}
