'use client'

import React from 'react'
import { useAppContext } from '@/contexts/state'

import { WidgetStyle } from '@/types'
import { DragHandleIcon, XIcon } from '@shopify/polaris-icons'

type WidgetContainerStyle = Pick<
  WidgetStyle,
  'bgColor' | 'textColor' | 'borderColor' | 'borderRadius'
>

type Props = {
  title: string
  children: React.ReactNode
  style: WidgetContainerStyle
  onDelete?: () => void
  childContainerClass?: string
}

const WidgetContainer = ({
  title,
  children,
  style,
  childContainerClass,
  onDelete,
}: Props) => {
  const { editMode } = useAppContext()
  const { bgColor, textColor, borderColor, borderRadius } = style

  return (
    <div
      className={`pb-2 rounded-md shadow-md h-full`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
        borderRadius: borderRadius,
        transition: '0.5s all',
      }}
    >
      <div className='py-2 px-3 mb-3 border-b border-[var(--neutral-4)] flex items-center justify-between'>
        <div className='flex items-center justify-between'>
          {editMode && (
            <button className='drag-handle cta-btn white-btn no-svg-margin less-padding mr-2'>
              <DragHandleIcon className='w-5 h-5' />
            </button>
          )}
          <p className='bold py-2'>{title}</p>
        </div>

        <div>
          {editMode && (
            <button
              className='cta-btn white-btn no-svg-margin less-padding'
              onClick={onDelete}
            >
              <XIcon className='w-5 h-5' />
            </button>
          )}
        </div>
      </div>

      <div className={childContainerClass ? childContainerClass : 'px-3'}>
        {children}
      </div>
    </div>
  )
}

export default WidgetContainer
