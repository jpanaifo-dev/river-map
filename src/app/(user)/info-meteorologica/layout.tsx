export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>
        <section>
          <header className="bg-blue-500 p-4">
            <h1 className="text-white text-2xl">Info Meteorologica</h1>
          </header>
        </section>
        <section className="flex flex-col md:flex-row">
          <aside className="w-full md:w-1/4"></aside>
          <article className="w-full md:w-3/4 bg-white p-4">{children}</article>
        </section>
      </main>
    </>
  )
}
