export type WidgetType = 'chart' | 'table' | 'map'

export type WidgetLayout = {
  id: string
  type: WidgetType
  x: number
  y: number
  w: number
  h: number
}

export type WidgetStyle = {
  bgColor: string
  textColor: string
  borderColor: string
  borderRadius: string
}
