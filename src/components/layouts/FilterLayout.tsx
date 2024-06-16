'use client'
import { usePathname } from 'next/navigation'

export const FilterLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const isInfoHidrologica = pathname === '/info-hidrologica'
  const isInfoMeteorologica = pathname === '/info-meteorologica'

  return (
    <>
      <main>
        <section>
          <header className="bg-blue-500 p-4">
            {isInfoHidrologica && (
              <h1 className="text-white text-2xl">Info Hidrológica</h1>
            )}
            {isInfoMeteorologica && (
              <h1 className="text-white text-2xl">Información Meteorológica</h1>
            )}
          </header>
        </section>
        <section className="flex flex-col md:flex-row">
          <aside className="w-full md:w-64 md:min-w-64 md:max-w-64 sticky top-0 h-screen">
            {/* <FiltersSection /> */}
          </aside>
          <article className="w-full bg-white p-4">{children}</article>
        </section>
      </main>
    </>
  )
}
