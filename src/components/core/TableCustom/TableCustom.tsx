'use client'
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table' // Adjust imports based on your actual file structure
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
    <>
      <main className="w-full h-full max-h-[calc(100vh-11rem)] overflow-y-auto overflow-x-auto max-w-[calc(100vw-18rem)]">
        <Table className="">
          <TableHeader className="top-12 w-full bg-white z-10 border-b border-gray-200">
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header.key}
                  className="text-xs font-bold w-full text-left min-w-full"
                >
                  <h2 className="max-w-sm">{header.value}</h2>
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200 max-h-[calc(100vh-18rem)] overflow-y-auto">
            {currentRows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out w-[100px]"
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
      </main>
      <footer className="w-full flex justify-between items-center px-4 py-2 bg-white border-t border-gray-200">
        <section className="flex justify-between items-center px-4 py-2 bg-white border-t border-gray-200">
          <h1 className="text-sm font-bold">
            {' '}
            Total de registros: {rows.length}
          </h1>
        </section>
        <section className="flex items-center gap-3">
          <div className="w-full">
            <h1 className="text-sm font-bold w-full">
              Página {currentPage} de {Math.ceil(rows.length / itemsPerPage)}
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              onClick={() => handlePaginationClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() => handlePaginationClick(currentPage + 1)}
              disabled={currentPage === Math.ceil(rows.length / itemsPerPage)}
            >
              Next
            </Button>
          </div>
        </section>
      </footer>
    </>
  )
}
