'use client'

interface IProps {
  children: React.ReactNode
  filters: React.ReactNode
}

export const FilterLayout = (props: IProps) => {
  const { children, filters } = props
  return (
    <main className="flex flex-col md:flex-row sm:pt-12 w-full">
      <aside className="w-full md:w-64 md:min-w-64 md:max-w-64 sticky top-14 h-screen border-r max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="bg-white">{filters}</div>
      </aside>
      <article className="w-full bg-white p-4 max-w-[calc(100%-256px)] overflow-auto">
        {children}
      </article>
    </main>
  )
}
