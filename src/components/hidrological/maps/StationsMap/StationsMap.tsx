'use client'

import dynamic from 'next/dynamic'
import { IStation } from '@/types/hydrological'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Importa `MapContainer`, `Marker`, `Popup`, y `TileLayer` dinámicamente sin SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
})
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

interface IProps {
  dataStation: IStation[]
}

const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png', // URL del ícono
  iconSize: [28, 41], // tamaño del ícono
  iconAnchor: [12, 41], // punto del ícono que se anclará en la posición de latitud/longitud
  popupAnchor: [1, -34], // punto donde se abrirá el popup
  shadowSize: [41, 41], // tamaño de la sombra
})

export const StationsMap = ({ dataStation }: IProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Indica que estamos en el cliente
    setIsClient(true)
  }, [])

  if (typeof window === 'undefined' || !isClient) {
    // Retorna un loading o null si aún no estamos en el cliente
    return null
  }

  return (
    <>
      <MapContainer
        style={{ width: '100%', height: 'calc(100vh - 6rem)' }}
        center={[-3.7437, -73.2516]}
        zoom={7}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {dataStation &&
          dataStation.map((station) => (
            <Marker
              key={station.EstId}
              position={[station.EstLatitud, station.EstLongitud]}
              icon={customIcon}
            >
              <Popup>
                <b>{station.EstNombre}</b>
                <br />
                Río: {station.EstRio}
                <br />
                Institución: {station.EstInstitucion}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </>
  )
}
