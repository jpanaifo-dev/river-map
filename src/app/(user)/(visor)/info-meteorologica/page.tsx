'use client'
import { Suspense } from 'react'
import { HMetMap, HMetTable, HMetLineChart } from '@/components'

import { useFilterFromUrl } from '@/hooks'

export default function Page() {
  const { getParams } = useFilterFromUrl()

  const view = getParams('view', '')

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {view === '' && <HMetMap />}
        {view === 'table' && <HMetTable />}
        {view === 'graphic' && <HMetLineChart />}
      </Suspense>
    </>
  )
}
