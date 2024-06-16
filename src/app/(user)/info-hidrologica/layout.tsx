import { FilterLayout, HidrologicalFilters } from '@/components'
import { HidrologicalProvider } from '@/providers'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HidrologicalProvider>
        <FilterLayout filters={<HidrologicalFilters />}>
          {children}
        </FilterLayout>
      </HidrologicalProvider>
    </>
  )
}
