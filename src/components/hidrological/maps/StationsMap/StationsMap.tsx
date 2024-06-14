'use client'
import { IStation } from '@/types/hydrological'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
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

export const StationsMap = (props: IProps) => {
  const { dataStation } = props

  //   console.log(dataStation)

  return <></>
}
