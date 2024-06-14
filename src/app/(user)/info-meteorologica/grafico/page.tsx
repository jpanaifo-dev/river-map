import { fetchInfoMeteorological } from "@/api";
import { WeatherChart } from "@/components";
import { IDataMet } from "@/types";

export default async function page() {
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
    <div>
        <WeatherChart data={data?.AutoValoresHM} />
    </div>
  )
}
