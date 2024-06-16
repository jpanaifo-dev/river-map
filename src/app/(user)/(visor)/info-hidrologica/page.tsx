'use client'
import { Suspense } from 'react'
import { HidrologicalTable } from '@/components'

import { useFilterFromUrl } from '@/hooks'

export default function Page() {
  const { getParams } = useFilterFromUrl()

  const view = getParams('view', '')

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {view === 'table' && <HidrologicalTable />}
      </Suspense>
    </>
  )
}
