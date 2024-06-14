import { fetchInfoHidro } from '@/api'
import { IDataHidro, IStation } from '@/types'
import dynamic from 'next/dynamic'

const StationsMap = dynamic(
  () => import('@/components').then((mod) => mod.StationsMap),
  {
    ssr: false,
  }
)

export default async function Page() {
  const res = await fetchInfoHidro()

  if (!res.ok) {
    return (
      <>
        <main>
          <h1>
            Error: {res.status} - {res.statusText}
          </h1>
        </main>
      </>
    )
  }

  const data: IDataHidro = (await res.json()) as IDataHidro

  return (
    <>
      <main>
        <StationsMap dataStation={data?.Estacion} />
      </main>
    </>
  )
}
