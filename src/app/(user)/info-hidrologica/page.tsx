import { fetchInfoHidro } from '@/api'
import { MapSection } from '@/components'
import { IDataHidro } from '@/types'

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
        <MapSection dataStation={data.Estacion} />
      </main>
    </>
  )
}
