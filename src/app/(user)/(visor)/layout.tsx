'use client'
import { HidrologicalProvider } from '@/providers'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HidrologicalProvider>{children}</HidrologicalProvider>
    </>
  )
}
