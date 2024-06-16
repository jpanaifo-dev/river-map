import { FilterLayout } from '@/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FilterLayout>{children}</FilterLayout>
    </>
  )
}
