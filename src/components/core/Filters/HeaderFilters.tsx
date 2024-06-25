interface IProps {
  title?: string
  description?: string
}
export const HeaderFilters = (props: IProps) => {
  const { title, description } = props

  return (
    <>
      <header>
        <h1 className="font-bold text-white">Selección de estación</h1>
        <p className="text-xs text-gray-300">
          Para visualizar la información de la estación hidrológica, seleccione
          una estación de la lista.
        </p>
      </header>
    </>
  )
}
