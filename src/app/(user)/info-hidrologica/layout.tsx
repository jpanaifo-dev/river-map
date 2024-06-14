export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>
        <section></section>
        <section className="flex flex-col md:flex-row">
          <aside className="w-full md:w-1/4"></aside>
          <article className="w-full md:w-3/4 bg-white p-4">{children}</article>
        </section>
      </main>
    </>
  )
}
