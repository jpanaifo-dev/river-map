'use client'
import { Suspense } from 'react'

import dynamic from 'next/dynamic'
const HidrologicalProvider = dynamic(() =>
  import('@/providers').then((mod) => mod.HidrologicalProvider)
)

const MeteorologicalProvider = dynamic(() =>
  import('@/providers').then((mod) => mod.MeteorologicalProvider)
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <HidrologicalProvider>
          <MeteorologicalProvider>{children}</MeteorologicalProvider>
        </HidrologicalProvider>
      </Suspense>
    </>
  )
}
