export interface IDataChart {
  name?: string
  type: string
  data: Array<number | string>
  smooth?: boolean
  symbol?: string
  itemStyle?: IItemStyle
  markArea?: {
    data: Array<IDataMarkArea[]>
  }
  areaStyle?: IColorArea
}

export interface IDataMarkArea {
  name?: string
  yAxis: number
  itemStyle?: IItemStyle
}

export interface IYAxis {
  name?: string
  min?: number
  max?: number
}

export interface IItemStyle {
  color: string
}

export interface IColorArea {
  type?: string
  x?: number
  y?: number
  x2?: number
  y2?: number
  global?: boolean
  colorStops?: IColorsStop[]
  color?: any
}

export interface IColorsStop {
  offset: number
  color: string
}
