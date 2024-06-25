import { IUmbral } from '@/types'
import React from 'react'

interface IProps {
  dataUmbral: IUmbral[]
}

export const UmbralTable = (props: IProps) => {
  const { dataUmbral } = props

  // Agrupar por UmbralPeriodo y UmbColor
  const groupedData = dataUmbral.reduce((acc, item) => {
    if (!acc[item.UmbralPeriodo]) {
      acc[item.UmbralPeriodo] = { AMARILLO: [], NARANJA: [], ROJO: [] }
    }
    acc[item.UmbralPeriodo][item.UmbColor].push(item)
    return acc
  }, {} as { [key: string]: { [key: string]: IUmbral[] } })

  const periods = Object.keys(groupedData)
  const colors = ['AMARILLO', 'NARANJA', 'ROJO']

  return (
    <div>
      <table className="table-auto border-collapse border rounded-lg border-gray-400 w-full text-xs">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">UMBRALES</th>
            {periods.map((period, index) => (
              <th
                key={index}
                className="border border-gray-300 p-2"
              >
                {period}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {colors.map((color) => (
            <tr key={color}>
              <td className="border border-gray-300 p-2">{color}</td>
              {periods.map((period) => (
                <td
                  key={period}
                  className="border border-gray-300 p-2"
                >
                  {groupedData[period][color].map((item, index) => (
                    <div key={index}>
                      {item.UmbValor} - {item.UmbValor2} m
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
