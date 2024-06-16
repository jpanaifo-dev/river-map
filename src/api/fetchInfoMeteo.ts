const API_URL = '/api/datosHM.json'

export async function fetchInfoMeteorological() {
  const response = await fetch(API_URL, {
    method: 'GET',
  })

  return response
}
