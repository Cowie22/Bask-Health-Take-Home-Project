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
      className={`py-3 rounded-md shadow-md`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
        borderRadius: borderRadius,
        transition: '0.5s all'
      }}
    >
      <div className='px-3 mb-3 border-b border-[var(--neutral-4)]'>
        <p className='bold pb-3'>
          {title}
        </p>
      </div>

      <div className='px-3'>
        {children}
      </div>
      
    </div>
  )
}

export default WidgetContainer
