'use client'

interface IProps {
  children: React.ReactNode
  filters: React.ReactNode
}

export const FilterLayout = (props: IProps) => {
  const { children, filters } = props
  return (
    <main className="flex flex-col md:flex-row w-full sm:pt-12">
      <aside className="w-full md:w-72 md:min-w-72 md:max-w-72 sticky top-12 h-screen max-h-[calc(100vh-48px)] border-r  overflow-y-auto bg-slate-900">
        <div className="">{filters}</div>
      </aside>
      <article className="w-full bg-slate-100 p-6 max-w-[calc(100%-256px)]">
        {children}
      </article>
    </main>
  )
}
