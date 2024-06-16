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

interface IProps<T extends Record<string, any>> {
  headers: {
    key: string
    value: string
  }[]
  rows: T[]
}

export const TableCustom = <T extends Record<string, any>>(
  props: IProps<T>
) => {
  const { headers, rows } = props

  console.log('TableCustom', headers, rows)

  return (
    <>
      <Table
        className="h-screen
      max-h-[calc(100vh-18rem)] overflow-y-auto w-full
      "
      >
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="sticky top-0">
          <TableRow>
            {headers.map((header) => (
              <TableCell
                key={header.key}
                className="text-xs font-medium"
              >
                {header.value}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white divide-y divide-gray-200">
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header) => (
                <TableCell
                  key={`${rowIndex}-${header}`}
                  className="text-left text-xs"
                >
                  {row[header.key as keyof T]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={headers.length - 1}>Total</TableCell>
            <TableCell className="text-right">{rows.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
