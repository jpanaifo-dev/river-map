'use client'
import { FilterLayout, MeteorologicalFilters } from '@/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FilterLayout filters={<MeteorologicalFilters />}>
        {children}
      </FilterLayout>
    </>
  )
}
