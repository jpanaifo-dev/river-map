'use client'
import { HidrologicalTable, UmbralTable, MapSection } from '@/components'

interface IProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page(props: IProps) {
  const { view } = props.searchParams

  return (
    <>
      <main>
        {!view && <MapSection />}
        {view === 'table' && <HidrologicalTable />}
        {view === 'umbral' && <UmbralTable />}
      </main>
    </>
  )
}
