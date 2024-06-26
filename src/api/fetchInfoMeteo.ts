const API_URL = '/api/datosHM.json'
const API_URL_HM = '/api/datosMeteo.json'

export async function fetchInfoMeteorological() {
  const response = await fetch(API_URL, {
    method: 'GET',
  })

  return response
}

export async function fetchInfoHM() {
  const response = await fetch(API_URL_HM, {
    method: 'GET',
  })

  return response
}
