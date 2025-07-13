'use client'

import React from 'react'
import { WidgetStyle } from '@/types'

type Props = {
  title: string
  children: React.ReactNode
  style: WidgetStyle
}

const WidgetContainer = ({ title, children, style }: Props) => {
  const { bgColor, textColor, borderColor, borderRadius } = style

  return (
    <div
      className={`p-4 rounded-md shadow-md`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
        borderRadius: borderRadius,
      }}
    >
      <div className='font-bold mb-2'>{title}</div>
      {children}
    </div>
  )
}

export default WidgetContainer
