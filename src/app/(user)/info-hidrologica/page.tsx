import { fetchInfoHidro } from '@/api'
import { IDataHidro } from '@/types'
import dynamic from 'next/dynamic'
const StationsMap = dynamic(() =>
  import('@/components').then((mod) => mod.StationsMap)
)

export default async function Page() {
  const res = await fetchInfoHidro()
  if (!res.ok)
    return (
      <>
        <h1>Error</h1>
        <p>Something went wrong</p>
      </>
    )

  const data: IDataHidro = (await res.json()) as IDataHidro

  return (
    <>
      <main>
        <StationsMap dataStation={data?.Estacion} />
      </main>
    </>
  )
}
