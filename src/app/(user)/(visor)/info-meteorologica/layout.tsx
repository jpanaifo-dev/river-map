'use client'
import dynamic from 'next/dynamic'

const FilterLayout = dynamic(
  () => import('@/components').then((mod) => mod.FilterLayout),
  { ssr: false }
)

const MeteorologicalFilters = dynamic(
  () => import('@/components').then((mod) => mod.MeteorologicalFilters),
  { ssr: false }
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FilterLayout filters={<MeteorologicalFilters />}>
        {children}
      </FilterLayout>
    </>
  )
}
