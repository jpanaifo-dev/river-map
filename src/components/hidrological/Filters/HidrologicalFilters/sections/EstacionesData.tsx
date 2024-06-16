'use client'
import { Suspense } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IStation } from '@/types'
import { useFilterFromUrl } from '@/hooks'
import { useRouter } from 'next/navigation'

interface IProps {
  options?: IStation[]
  loading: boolean
}

export const EstacionesData = (props: IProps) => {
  const { options, loading } = props
  const { getParams, updateFilter } = useFilterFromUrl()
  const router = useRouter()

  const id_station = getParams('estacion', '')

  const addAllOption = (data: IStation[]) => {
    return [{ EstId: 0, EstNombre: 'Todas' }, ...data]
  }

  const optionsData = addAllOption(options || [])

  const handleStation = (value: string) => {
    if (value === '0') {
      router.push('/info-hidrologica')
    } else {
      updateFilter('estacion', value)
    }
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {!id_station && (
          <section className="bg-yellow-100 p-2 rounded-md animate-pulse">
            <h1 className="text-xs font-bold text-yellow-700">
              Selecciona una estación para comenzar
            </h1>
          </section>
        )}
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
              {optionsData?.map((item) => (
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
      </Suspense>
    </>
  )
}
