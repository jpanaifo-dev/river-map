'use client'
import { Suspense } from 'react'
import { IStation } from '@/types/hydrological'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { useFilterFromUrl } from '@/hooks'

const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png', // URL del ícono
  iconSize: [34, 36], // tamaño del ícono
  iconAnchor: [12, 41], // punto del ícono que se anclará en la posición de latitud/longitud
  popupAnchor: [1, -34], // punto donde se abrirá el popup
  shadowSize: [41, 41], // tamaño de la sombra
})

interface IProps {
  dataStation: IStation[]
}

export const DataMap = (props: IProps) => {
  const { dataStation } = props
  const { getParams, updateFilter } = useFilterFromUrl()

  const handleMarkerClick = (station: IStation) => {
    // Puedes realizar cualquier otra acción aquí, como actualizar el estado o navegar a otra página
    updateFilter('estacion', station.EstId.toString())
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MapContainer
          style={{ width: '100%', height: 'calc(100vh - 6rem)' }}
          center={[-3.7437, -73.2516]}
          zoom={7}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            //mapa de ríos
            // url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {dataStation &&
            dataStation.map((station) => (
              <Marker
                key={station.EstId}
                position={[station.EstLatitud, station.EstLongitud]}
                icon={customIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(station),
                }}
              ></Marker>
            ))}
        </MapContainer>
      </Suspense>
    </>
  )
}
