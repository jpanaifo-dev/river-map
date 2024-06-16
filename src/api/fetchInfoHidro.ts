const API_URL = '/api/hidrologicaData.json'

export async function fetchInfoHidro() {
  const response = await fetch(API_URL, {
    method: 'GET',
  })
  return response
}
