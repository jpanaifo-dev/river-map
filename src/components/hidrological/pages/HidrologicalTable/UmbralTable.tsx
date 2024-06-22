'use client'
import { useHidrologicalContext } from '@/providers'
import { TableCustom } from '@/components'

const umbralHeader = [
  { key: 'UmbColor', value: 'Color de Umbral' },
  { key: 'UmbralPeriodo', value: 'Periodo de Umbral' },
  { key: 'UmbValor', value: 'Valor mínimo de Umbral' },
  { key: 'UmbValor2', value: 'Valor máximo de Umbral' },
]

export const UmbralTable = () => {
  const { data, dataUmbral } = useHidrologicalContext()
  return (
    <>
      <header className="pb-2">
        <h1 className="font-bold text-sm uppercase">
          Estación Hidrológica {data[0]?.station || 'No registrado'} - Umbrales
          registrados - Río {data[0]?.river || 'No registrado'}
        </h1>
        <p className="text-xs text-gray-500">
          Umbrales registrados en la estación hidrológica en el río
        </p>
      </header>
      <section className="w-full max-w-[650px] bg-white p-4 rounded-lg">
        <TableCustom
          headers={umbralHeader}
          rows={dataUmbral}
          hiddenFooter
        />
      </section>
    </>
  )
}
