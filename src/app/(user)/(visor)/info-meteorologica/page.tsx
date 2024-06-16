'use client'
import { Suspense } from 'react'
import { MetLineChart, MetTable } from '@/components'

import { useFilterFromUrl } from '@/hooks'

export default function Page() {
  const { getParams } = useFilterFromUrl()

  const view = getParams('view', '')

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {view === 'table' && <MetTable />}
        {view === 'graphic' && <MetLineChart />}
      </Suspense>
    </>
  )
}
