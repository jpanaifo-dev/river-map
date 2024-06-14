'use client'
import { MapContainer, TileLayer } from 'react-leaflet'

export const StationsMap = () => {
  return (
    <>
      <MapContainer
        style={{ width: '60%', height: '400px' }}
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
      </MapContainer>
    </>
  )
}
