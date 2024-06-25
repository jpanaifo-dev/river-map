'use client'
import { FilterLayout, MetFilters } from '@/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FilterLayout filters={<MetFilters />}>{children}</FilterLayout>
    </>
  )
}
