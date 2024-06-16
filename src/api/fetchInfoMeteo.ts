const API_URL =
  'http://etechgroup-001-site2.dtempurl.com/estacionhm/listardatoshm'

export async function fetchInfoMeteorological() {
  const response = await fetch(API_URL, {
    method: 'GET',
  })

  return response
}
