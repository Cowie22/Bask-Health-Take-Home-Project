export type WidgetType = 'chart' | 'table' | 'map'

export type WidgetLayout = {
  id: string
  type: WidgetType
  x: number
  y: number
  w: number
  h: number
}

export interface WidgetStyle {
  bgColor: string
  textColor: string
  borderColor: string
  borderColorEdit: string
  borderRadius: string
  accentColor: string
}

export interface LayoutItem {
  i: string
  w: number
  h: number
  x: number
  y: number
}
