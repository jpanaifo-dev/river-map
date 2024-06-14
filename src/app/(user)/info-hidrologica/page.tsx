import { fetchInfoHidro } from '@/api'
import { GetServerSideProps } from 'next'

export default async function Page() {
  const data = await fetchInfoHidro()
  if (!data) {
    return {
      notFound: true,
    }
  }

  return (
    <>
      <main></main>
    </>
  )
}
