'use client'

interface IProps {
  children: React.ReactNode
  filters: React.ReactNode
}

export const FilterLayout = (props: IProps) => {
  const { children, filters } = props
  return (
    <>
      <main className="flex flex-col md:flex-row sm:pt-12">
        <aside className="w-full md:w-64 md:min-w-64 md:max-w-64 sticky top-0 h-screen">
          <div className="bg-white">{filters}</div>
        </aside>
        <article className="w-full bg-white p-4">{children}</article>
      </main>
    </>
  )
}
