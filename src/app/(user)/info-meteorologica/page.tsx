import { fetchInfoMeteorological } from '@/api'
import { WeatherChart } from '@/components'
import { IDataMet } from '@/types'
import dynamic from 'next/dynamic'

const MeteorogicalMap = dynamic(
  () => import('@/components').then((mod) => mod.MeteorogicalMap),
  {
    ssr: false,
  }
)

export default async function Page() {
  const res = await fetchInfoMeteorological()

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

  const data: IDataMet = (await res.json()) as IDataMet

  return (
    <>
      <main>
        <WeatherChart data={data?.AutoValoresHM} />
        <MeteorogicalMap dataStation={data?.EstacionHM} />
      </main>
    </>
  )
}
