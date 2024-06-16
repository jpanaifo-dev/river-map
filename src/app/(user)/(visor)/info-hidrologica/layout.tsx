'use client'
import dynamic from 'next/dynamic'

const FilterLayout = dynamic(
  () => import('@/components').then((mod) => mod.FilterLayout),
  { ssr: false }
)

const HidrologicalFilters = dynamic(
  () => import('@/components').then((mod) => mod.HidrologicalFilters),
  { ssr: false }
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FilterLayout filters={<HidrologicalFilters />}>{children}</FilterLayout>
    </>
  )
}
