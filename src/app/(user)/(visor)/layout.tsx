'use client'
import { Suspense } from 'react'
// import { HidrologicalProvider } from '@/providers'

import dynamic from 'next/dynamic'
const HidrologicalProvider = dynamic(() =>
  import('@/providers').then((mod) => mod.HidrologicalProvider)
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <HidrologicalProvider>{children}</HidrologicalProvider>
      </Suspense>
    </>
  )
}
