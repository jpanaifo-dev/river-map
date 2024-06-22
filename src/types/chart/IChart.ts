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
