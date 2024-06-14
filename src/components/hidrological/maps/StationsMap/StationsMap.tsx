'use client'
import { IStation } from '@/types/hydrological'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
interface IProps {
  dataStation?: IStation[]
}

const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png', // URL del ícono
  iconSize: [28, 41], // tamaño del ícono
  iconAnchor: [12, 41], // punto del ícono que se anclará en la posición de latitud/longitud
  popupAnchor: [1, -34], // punto donde se abrirá el popup
  shadowSize: [41, 41], // tamaño de la sombra
})

export const StationsMap = (props: IProps) => {
  const { dataStation } = props

  //   console.log(dataStation)

  return (
    <>
      <MapContainer
        style={{ width: '100%', height: 'calc(100vh - 6rem)' }}
        center={[-3.7437, -73.2516]}
        zoom={7}
        scrollWheelZoom={false}
        // markerZoomAnimation={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png"
          //   url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />

        {/* {geoJsonData && (
          <GeoJSON
            data={geoJsonData}
            style={style}
            onEachFeature={onEachFeature}

            // markersInheritOptions={true}
          />
        )} */}
        {dataStation &&
          dataStation?.map((station) => (
            <Marker
              key={station.EstId}
              position={[station.EstLatitud, station.EstLongitud]}
              icon={customIcon} // usa customIcon si es necesario
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
