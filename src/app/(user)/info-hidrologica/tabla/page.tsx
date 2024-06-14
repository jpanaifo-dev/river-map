'use client'

import { HidrologicalTable } from '@/components'
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <HidrologicalTable />
      </Suspense>
    </>
  )
}
