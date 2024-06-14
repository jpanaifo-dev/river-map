import { fetchInfoHidro } from '@/api'
import { GetServerSideProps } from 'next'

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

  const data = await res.json()

  return (
    <>
      <main></main>
    </>
  )
}
