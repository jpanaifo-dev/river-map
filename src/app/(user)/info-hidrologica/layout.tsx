'use client'
import { FiltersSection } from '@/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>
        <section>
          <header className="bg-blue-500 p-4">
            <h1 className="text-white text-2xl">Info Hidrológica</h1>
          </header>
        </section>
        <section className="flex flex-col md:flex-row">
          <aside className="w-full md:w-64 md:min-w-64 md:max-w-64">
            <FiltersSection />
          </aside>
          <article className="w-full bg-white p-4">{children}</article>
        </section>
      </main>
    </>
  )
}
