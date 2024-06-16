'use client'
import { FilterLayout, HidrologicalFilters } from '@/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FilterLayout filters={<HidrologicalFilters />}>{children}</FilterLayout>
    </>
  )
}
