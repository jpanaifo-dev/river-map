const API_URL =
  'https://etechgroup-001-site2.dtempurl.com/estacion/listardatos/estacion'

export async function fetchInfoHidro() {
  const response = await fetch(API_URL, {
    method: 'GET',
  })
  return response
}
