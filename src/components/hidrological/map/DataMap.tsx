'use client'
import { Suspense, useState } from 'react'
import { IStation } from '@/types/hydrological'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { useFilterFromUrl } from '@/hooks'

const colorPin = [
  {
    key: 'AMARILLO',
    color: '#FFD700',
  },
  {
    key: 'VERDE',
    color: '#008000',
  },
  {
    key: 'ROJO',
    color: '#FF0000',
  },
  {
    key: 'AZUL',
    color: '#0000FF',
  },
  {
    key: 'NARANJA',
    color: '#FFA500',
  },
  {
    key: 'MORADO',
    color: '#800080',
  },
  {
    key: 'CELESTE',
    color: '#00FFFF',
  },
  {
    key: 'BLANCO',
    color: '#FFFFFF',
  },
]

// const customIcon = new L.Icon({
//   iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png', // URL del ícono
//   iconSize: [34, 36], // tamaño del ícono
//   iconAnchor: [12, 41], // punto del ícono que se anclará en la posición de latitud/longitud
//   popupAnchor: [1, -34], // punto donde se abrirá el popup
//   shadowSize: [41, 41], // tamaño de la sombra
// })

const getColorMarkerIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon', // Clase CSS para el div del ícono
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [20, 20], // Tamaño del ícono
    iconAnchor: [10, 10], // Punto del ícono que se anclará en la posición de latitud/longitud
    popupAnchor: [0, -10], // Punto donde se abrirá el popup
  })
}

interface IProps {
  dataStation: IStation[]
}

export const DataMap = (props: IProps) => {
  const [activeStation, setActiveStation] = useState<IStation | null>(null)
  const { dataStation } = props
  const { getParams, updateFilter } = useFilterFromUrl()

  const estacion = getParams('estacion', '')

  const handleMarkerClick = (station: IStation) => {
    // Puedes realizar cualquier otra acción aquí, como actualizar el estado o navegar a otra página
    setActiveStation(station)
    updateFilter('estacion', station.EstId.toString())
  }

  const center: [number, number] = activeStation
    ? [activeStation.EstLatitud, activeStation.EstLongitud]
    : [-3.7437, -73.2516]

  const zoom = estacion !== '' ? 9 : 7

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MapContainer
          style={{ width: '100%', height: 'calc(100vh - 6rem)' }}
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            //mapa de ríos
            // url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {dataStation &&
            dataStation.map((station) => {
              // Encuentra el color correspondiente para la estación
              const colorConfig = colorPin.find(
                (pin) => pin.key === station.EstColor
              )
              const markerColor = colorConfig ? colorConfig.color : '#000' // Default color if not found

              return (
                <Marker
                  key={station.EstId}
                  position={[station.EstLatitud, station.EstLongitud]}
                  icon={getColorMarkerIcon(markerColor)}
                  eventHandlers={{
                    click: () => handleMarkerClick(station),
                  }}
                ></Marker>
              )
            })}
        </MapContainer>
      </Suspense>
    </>
  )
}
