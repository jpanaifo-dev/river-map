'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IStation } from '@/types'
import { useFilterFromUrl } from '@/hooks'

interface IProps {
  options?: IStation[]
  loading: boolean
}

export const EstacionesData = (props: IProps) => {
  const { options, loading } = props
  const { getParams, updateFilter } = useFilterFromUrl()

  const id_station = getParams('estacion', '')

  const handleStation = (value: string) => {
    updateFilter('estacion', value)
  }

  return (
    <>
      <section className="">
        <label
          htmlFor="estaciones"
          className="text-sm font-medium"
        >
          Estaciones Hidrológicas
        </label>
        <Select
          value={id_station}
          onValueChange={handleStation}
        >
          <SelectTrigger className="w-full">
            {loading && (
              <SelectValue
                className="animate-pulse"
                placeholder="Cargando.."
              />
            )}

            {!loading && <SelectValue placeholder="Estaciones" />}
          </SelectTrigger>
          <SelectContent>
            {options?.map((item) => (
              <SelectItem
                key={item.EstId}
                value={item.EstId.toString()}
              >
                {item.EstNombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>
      <section></section>
    </>
  )
}
