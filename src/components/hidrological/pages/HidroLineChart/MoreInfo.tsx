'use client'

import { IUmbral } from '@/types'
import { UmbralTable } from './UmbralTable'

interface IProps {
  dataUmbral: IUmbral[]
}

export const MoreInfo = (props: IProps) => {
  const { dataUmbral } = props
  return (
    <>
      <article className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
        <section className="flex flex-col gap-3">
          <header>
            <h2 className="font-bold text-sm uppercase">Sobre los umbrales</h2>
          </header>
          <main>
            <UmbralTable dataUmbral={dataUmbral} />
          </main>
        </section>
        <section className="flex flex-col gap-3">
          <header>
            <h2 className="font-bold text-sm uppercase">Detalles</h2>
          </header>
          <main>
            <table>
              <tbody className="text-xs">
                <tr className="border">
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
                <tr className="border">
                  <td className="text-white font-bold bg-yellow-300 text-center p-2">
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
        </section>
      </article>
    </>
  )
}
