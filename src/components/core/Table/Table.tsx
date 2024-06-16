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

interface IProps {
  headers: string[]
  rows: Array<string[] | number[] | JSX.Element[]>
}

export const HidrologicalTable = (props: IProps) => {
  const { headers, rows } = props

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
          {rows.map((invoice, index) => (
            <TableRow key={index}>
              {invoice.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
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
