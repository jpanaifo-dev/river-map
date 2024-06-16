'use client'
import { Suspense } from 'react'
import { HidroLineChart, HidroMap, HidrologicalTable } from '@/components'

import { useFilterFromUrl } from '@/hooks'

export default function Page() {
  const { getParams } = useFilterFromUrl()

  const view = getParams('view', '')

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {view === '' && <HidroMap />}
        {view === 'table' && <HidrologicalTable />}
        {view === 'graphic' && <HidroLineChart />}
      </Suspense>
    </>
  )
}
