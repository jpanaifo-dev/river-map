'use client'
import { Suspense, useState } from 'react'
import { IStation } from '@/types/hydrological'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
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

const getColorMarkerIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  })
}

interface IProps {
  dataStation: IStation[]
}

export const DataMap = (props: IProps) => {
  const [activeStation, setActiveStation] = useState<IStation | null>(null)
  const [hoveredStationId, setHoveredStationId] = useState<number | null>(null)
  const { dataStation } = props
  const { getParams, updateFilter } = useFilterFromUrl()

  const estacion = getParams('estacion', '')

  const handleMarkerClick = (station: IStation) => {
    setActiveStation(station)
    updateFilter('estacion', station.EstId.toString())
  }

  const handleMouseOver = (stationId: number) => {
    setHoveredStationId(stationId)
  }

  const handleMouseOut = () => {
    setTimeout(() => {
      setHoveredStationId(null)
    }, 500)
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
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {dataStation &&
            dataStation.map((station) => {
              const colorConfig = colorPin.find(
                (pin) => pin.key === station.EstColor
              )
              const markerColor = colorConfig ? colorConfig.color : '#000'

              return (
                <Marker
                  key={station.EstId}
                  position={[station.EstLatitud, station.EstLongitud]}
                  icon={getColorMarkerIcon(markerColor)}
                  eventHandlers={{
                    click: () => handleMarkerClick(station),
                    mouseover: () => handleMouseOver(station.EstId),
                    mouseout: handleMouseOut,
                  }}
                >
                  {hoveredStationId === station.EstId && (
                    <Tooltip
                      permanent
                      className="rounded-md"
                    >
                      <div className="p-2">
                        <h1 className="text-lg font-bold">
                          Nombre: {station.EstNombre}
                        </h1>
                        <div>
                          <strong>Lat:</strong> {station.EstLatitud}
                        </div>
                        <div>
                          <strong>Lon:</strong> {station.EstLongitud}
                        </div>
                      </div>
                    </Tooltip>
                  )}
                </Marker>
              )
            })}
        </MapContainer>
      </Suspense>
    </>
  )
}
