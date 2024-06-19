'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IStationHM } from '@/types'
import { useFilterFromUrl } from '@/hooks'
import { useRouter } from 'next/navigation'

interface IProps {
  options?: IStationHM[]
  loading: boolean
}

export const EstacionesData = (props: IProps) => {
  const { options, loading } = props
  const { getParams, updateFilter } = useFilterFromUrl()
  const router = useRouter()

  const id_station = getParams('estacion', '')

  const addAllOption = (data: IStationHM[]) => {
    return [{ EstacionId: 0, EstacionNombre: 'Todas' }, ...data]
  }

  const optionsData = addAllOption(options || [])

  const handleStation = (value: string) => {
    if (value === '0') {
      router.push('/info-meteorologica')
    } else {
      updateFilter('estacion', value)
    }
  }

  return (
    <>
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
          Estaciones automáticas
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
                key={item.EstacionId.toString()}
                value={item.EstacionId.toString()}
              >
                {item.EstacionNombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>
    </>
  )
}
