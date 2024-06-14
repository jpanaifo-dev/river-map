import { IColor } from './IColor'
import { EPeriodo } from './IPeriod'

export interface IStation {
  EstId: number
  EstNombre: string
  EstLatitud: number
  EstLongitud: number
  EstRio: string
  EstInstitucion: string
  EstColor: IColor
  PeriodoId: number
  Periodo: EPeriodo
}
