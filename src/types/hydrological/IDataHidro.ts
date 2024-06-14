import { ILevel } from './ILevel'
import { IStation } from './IStation'
import { IUmbral } from './IUmbral'

export interface IDataHidro {
  Estacion: IStation[]
  Nivel: ILevel[]
  Umbral: IUmbral[]
  Configuracion: any[]
}
