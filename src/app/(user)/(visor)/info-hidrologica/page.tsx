'use client'
import { Suspense } from 'react'
import { HidrologicalTable } from '@/components'

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <HidrologicalTable />
      </Suspense>
    </>
  )
}
