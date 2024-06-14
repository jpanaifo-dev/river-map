const API_URL =
  'https://www.siam.imida.es/servicios/rest/api/v1/estacion/estacion_1'

export async function fetchInfoHidro() {
  const response = await fetch(API_URL)
  const data = await response.json()
  return data
}
