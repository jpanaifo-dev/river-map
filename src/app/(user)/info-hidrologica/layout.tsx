'use client'
import dynamic from 'next/dynamic'

const FiltersSection = dynamic(
  () => import('@/components').then((mod) => mod.FiltersSection),
  {
    ssr: false,
  }
)

const HidrologicalProvider = dynamic(
  () => import('@/providers').then((mod) => mod.HidrologicalProvider),
  {
    ssr: false,
  }
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HidrologicalProvider>
        <main>
          <section>
            <header className="bg-blue-500 p-4">
              <h1 className="text-white text-2xl">Info Hidrológica</h1>
            </header>
          </section>
          <section className="flex flex-col md:flex-row">
            <aside className="w-full md:w-64 md:min-w-64 md:max-w-64 sticky top-0 h-screen">
              <FiltersSection />
            </aside>
            <article className="w-full bg-white p-4">{children}</article>
          </section>
        </main>
      </HidrologicalProvider>
    </>
  )
}
