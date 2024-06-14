'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IStation } from '@/types'

interface IProps {
  options?: IStation[]
  loading: boolean
}

export const EstacionesData = (props: IProps) => {
  const { options, loading } = props

  return (
    <>
      <section className="">
        <label
          htmlFor="estaciones"
          className="text-sm font-medium"
        >
          Estaciones Hidrológicas
        </label>
        <Select>
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
