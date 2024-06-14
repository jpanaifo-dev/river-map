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
// import { ScrollArea } from '@/components/ui/scroll-area'

import { useHidrologicalContext } from '@/providers/hidrologicalProvider'
import { IUmbral } from '@/types'
import { useFilterFromUrl } from '@/hooks'

const tableHeaders = ['#', 'Estación', 'Valor', 'Valor 2', 'Periodo', 'Color']

function filterByStation(data: IUmbral[], id_station: string) {
  if (id_station === '') return data
  return data.filter((item) => item.EstId.toString() === id_station)
}

export const UmbralTable = () => {
  const { data } = useHidrologicalContext()
  const { getParams } = useFilterFromUrl()

  const id_station = getParams('estacion', '')
  const dataFiltered = filterByStation(data?.Umbral || [], id_station)

  return (
    <>
      {/* <ScrollArea className="h-full w-full rounded-md border p-4">
      
      </ScrollArea> */}
      <Table
        className="h-screen
      max-h-[calc(100vh-18rem)] overflow-y-auto w-full
      "
      >
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
            <TableRow key={invoice.UmbId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{invoice.EstId}</TableCell>
              <TableCell>{invoice.UmbValor}</TableCell>
              <TableCell>{invoice.UmbValor2}</TableCell>
              <TableCell>{invoice.UmbralPeriodo}</TableCell>
              <TableCell>{invoice.UmbColor}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={tableHeaders.length - 1}>Total</TableCell>
            <TableCell className="text-right">{dataFiltered.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
