'use client'
import { usePathname } from 'next/navigation'

export const FilterLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <>
      <main className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64 md:min-w-64 md:max-w-64 sticky top-0 h-screen">
          {/* <FiltersSection /> */}
        </aside>
        <article className="w-full bg-white p-4">{children}</article>
      </main>
    </>
  )
}
