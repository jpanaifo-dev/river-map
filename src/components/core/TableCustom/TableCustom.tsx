'use client'
import React, { useState } from 'react'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table' // Adjust imports based on your actual file structure
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableFoot,
  // TablerFooterCell,
} from '@tremor/react'
import { Button } from '@/components/ui/button'

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
  const itemsPerPage = 15
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination boundaries
  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const currentRows = rows.slice(firstIndex, lastIndex)

  // Handle pagination click
  const handlePaginationClick = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <main className="">
      <Table className="max-h-[calc(100vh-12rem)] overflow-y-auto">
        <TableHead className="bg-white border-b border-gray-200 sticky top-0">
          <TableRow>
            {headers.map((header) => (
              <TableHeaderCell
                key={header.key}
                className="text-xs font-bold w-full text-left"
              >
                <h2 className="max-w-sm">{header.value}</h2>
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="bg-white divide-y divide-gray-200">
          {currentRows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className="hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
            >
              {headers.map((header) => (
                <TableCell
                  key={`${rowIndex}-${header.key}`}
                  className="text-left text-xs"
                >
                  {row[header.key as keyof T]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <footer className="w-full flex justify-between items-center px-4 my-4 bg-white border-t border-gray-200">
        <section className="flex justify-between items-center px-4 py-2 bg-white ">
          <h1 className="text-sm font-bold">
            Total de registros: {rows.length}
          </h1>
        </section>
        <section className="flex items-center gap-3 pt-2">
          <div className="w-full">
            <h1 className="text-sm font-bold w-full">
              Página {currentPage} de {Math.ceil(rows.length / itemsPerPage)}
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              onClick={() => handlePaginationClick(currentPage - 1)}
              disabled={currentPage === 1}
              size="sm"
            >
              Previous
            </Button>
            <Button
              onClick={() => handlePaginationClick(currentPage + 1)}
              disabled={currentPage === Math.ceil(rows.length / itemsPerPage)}
              size="sm"
            >
              Next
            </Button>
          </div>
        </section>
      </footer>
    </main>
  )
}
