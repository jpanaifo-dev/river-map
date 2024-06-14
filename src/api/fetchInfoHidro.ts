const API_URL = 'https://www.siam.imida.es/servicios/rest/api/v1/estacion'

export async function fetchInfoHidro() {
  const response = await fetch(API_URL)
  const data = await response.json()
  return data
}
