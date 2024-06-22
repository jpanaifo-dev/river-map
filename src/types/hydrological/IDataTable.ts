export interface IDataTable {
  station_id: string
  station: string
  station_color: string
  station_period: string
  river: string
  institution: string
  date: string
  past_date: string
  current_date: string
  normal_level: string
  current_level: string
  past_level: string
}

// id_estacion -> station_id
// estacion -> station
// color_estacion -> station_color
// periodo_estacion -> station_period
// rio -> river
// institucion -> institution
// fecha -> date
// fecha_pasado -> past_date
// fecha_actual -> current_date
// nivel_normal -> normal_level
// nivel_actual -> current_level
// nivel_pasado -> past_level
// periodo -> period
// umbral_bajo -> low_threshold
// umbral_alto -> high_threshold
// estado_umbral -> threshold_status
// color -> color
