export const FilterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main>
        <aside></aside>
        <section>{children}</section>
      </main>
    </>
  )
}
