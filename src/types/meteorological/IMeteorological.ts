import { IStationHM } from '../automatica'
import { IVarMeteorological } from './IVarMeteorological'

export interface IMeteorological {
  EstacionHM: IStationHM[]
  VariablesMeteorologicasMeteo: IVarMeteorological[]
}
