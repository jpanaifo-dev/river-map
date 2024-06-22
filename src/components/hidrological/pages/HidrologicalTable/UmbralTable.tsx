'use client'
import { useHidrologicalContext } from '@/providers'
import { TableCustom } from '@/components'

const umbralHeader = [
  { key: 'UmbColor', value: 'Color de Umbral' },
  { key: 'UmbralPeriodo', value: 'Periodo de Umbral' },
  { key: 'UmbValor', value: 'Umbral min.' },
  { key: 'UmbValor2', value: 'Umbral max' },
]

const periodoData = [
  {
    title: 'CRECIENTE',
    description:
      'Indica condiciones del río con tendencia ascendente en su nivel.',
  },
  {
    title: 'ESTIAJE',
    description:
      'Indica condiciones del río con tendencia descendente en su nivel.',
  },
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
      <main className="grid grid-cols-2 gap-5">
        <section className="w-full  bg-white p-4 rounded-lg">
          <TableCustom
            headers={umbralHeader}
            rows={dataUmbral}
            hiddenFooter
          />
        </section>
        <section className="flex flex-col gap-3 bg-white rounded-lg p-4">
          <header>
            <h2 className="font-bold text-sm uppercase">Detalles</h2>
            <p className="text-xs text-gray-500">
              Los umbrales son valores límites que indican condiciones
              específicas en el nivel del río.
            </p>
          </header>
          <main className="border rounded-lg">
            <table>
              <tbody className="text-xs">
                <tr className="rounded-t-lg">
                  <td className="text-white font-bold bg-red-500 text-center p-2">
                    ROJO
                  </td>
                  <td className="p-3">
                    Indica condiciones donde se esperan limitaciones en el
                    transporte fluvial ocasionado por el avistamiento de rocas y
                    obstáculos debido a un mayor descenso en el nivel del río,
                    que puede generar daños y el encallamiento de naves
                    fluviales.
                  </td>
                </tr>
                <tr className="border">
                  <td className="text-white font-bold bg-orange-500 text-center p-2">
                    NARANJA
                  </td>
                  <td className="p-3">
                    Indica condiciones del río con tendencia descendente en su
                    nivel.
                  </td>
                </tr>
                <tr className="">
                  <td className="text-orange-950 font-bold bg-yellow-300 text-center p-2">
                    AMARILLO
                  </td>
                  <td className="p-3">
                    Indica condiciones normales del río con la posibilidad de
                    descenso en su nivel.
                  </td>
                </tr>
              </tbody>
            </table>
          </main>
          <hr className="my-2" />
          <section>
            {periodoData.map((item, index) => (
              <section key={index}>
                <p className="text-sm font-bold">{item.title}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </section>
            ))}
          </section>
        </section>
      </main>
    </>
  )
}
