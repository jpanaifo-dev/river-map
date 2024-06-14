import { EstacionesData } from './sections'

export const FiltersSection = () => {
  return (
    <>
      <main className="w-full p-4">
        <header>
          <h1 className="font-bold">Facilíta tu búsqueda</h1>
          <p className="text-xs text-gray-500">
            Filtra la información específica que deseas obtener de las
            estaciones hidrológicas
          </p>
        </header>
        <article className="flex flex-col gap-2">
          <EstacionesData />
        </article>
      </main>
    </>
  )
}
