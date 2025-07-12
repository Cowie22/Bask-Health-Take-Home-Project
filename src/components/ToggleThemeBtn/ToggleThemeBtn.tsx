'use client'

import React, { memo } from 'react'
import { useAppContext } from '@/contexts/state'
import { SunIcon, MoonIcon } from '@shopify/polaris-icons'

const ToggleThemeBtn = () => {
  const { isDark, toggleTheme } = useAppContext()

  return (
    <button
      onClick={toggleTheme}
      className='cursor-pointer'
    >
      {isDark ? (
        <MoonIcon className='w-5 h-5' fill='white' />
      ) : (
        <SunIcon className='w-5 h-5' />
      )}
    </button>
  )
}

export default memo(ToggleThemeBtn)
