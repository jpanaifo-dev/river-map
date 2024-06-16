import { FilterLayout } from '@/components'
import { HidrologicalProvider } from '@/providers'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HidrologicalProvider>
        <FilterLayout>{children}</FilterLayout>
      </HidrologicalProvider>
    </>
  )
}
