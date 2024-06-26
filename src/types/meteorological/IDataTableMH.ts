export interface IDataTableMH {
  //Estacion data
  station_id: string
  station: string
  station_type: string
  station_lat: string
  station_lng: string
  station_alt: string
  //Temperatura
  date: string
  date_last: string | null
  temperatura_max: string
  temperatura_min: string
  precipitacion_pluvial: string
}
