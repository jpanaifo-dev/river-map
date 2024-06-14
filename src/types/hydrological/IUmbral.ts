import { IColor } from './IColor'
import { EUmbralPeriodo } from './IPeriod'

export interface IUmbral {
  UmbId: number
  EstId: number
  UmbValor: number
  UmbValor2: number
  UmbralPeriodo: EUmbralPeriodo
  UmbColor: IColor
}
