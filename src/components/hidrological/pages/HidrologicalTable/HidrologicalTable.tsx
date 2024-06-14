'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'

import { useHidrologicalContext } from '@/providers/hidrologicalProvider'
import { ILevel } from '@/types'
import { useFilterFromUrl } from '@/hooks'

const tableHeaders = [
  '#',
  'Nivel Actual',
  'Nivel Pasado',
  'Fecha',
  'Fecha Actual',
  'Fecha Pasado',
  'Id',
  'Normal',
]
function filterByStation(data: ILevel[], id_station: string) {
  if (id_station === '') return data
  return data.filter((item) => item.EstId.toString() === id_station)
}

export const HidrologicalTable = () => {
  const { data } = useHidrologicalContext()
  const { getParams } = useFilterFromUrl()

  const id_station = getParams('estacion', '')
  const dataFiltered = filterByStation(data?.Nivel || [], id_station)

  return (
    <>
      <ScrollArea className="h-full w-full rounded-md border p-4">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader className="sticky top-0">
            <TableRow>
              {tableHeaders.map((header) => (
                <TableHead
                  key={header}
                  className="font-medium"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white divide-y divide-gray-200">
            {dataFiltered.map((invoice, index) => (
              <TableRow key={invoice.EstId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {invoice.NivelAHActual}
                </TableCell>
                <TableCell>{invoice.NivelAHPasado}</TableCell>
                <TableCell>{invoice.NivelFecha}</TableCell>
                <TableCell className="text-right">
                  {invoice.NivelFechaActual}
                </TableCell>
                <TableCell className="text-right">
                  {invoice.NivelFechaPasado}
                </TableCell>
                <TableCell className="text-right">{invoice.NivelId}</TableCell>
                <TableCell className="text-right">
                  {invoice.NivelNormal}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            {/* <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow> */}
          </TableFooter>
        </Table>
      </ScrollArea>
    </>
  )
}
