import { HidrologicalTable, MapSection, UmbralTable } from '@/components'

interface IProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page(props: IProps) {
  const { view } = props.searchParams

  return (
    <>
      <main>
        {view === undefined && <MapSection />}
        {view === 'table' && <HidrologicalTable />}
        {view === 'umbral' && <UmbralTable />}
      </main>
    </>
  )
}
