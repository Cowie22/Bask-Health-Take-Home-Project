'use client'

import React, { memo } from 'react'
import { useAppContext } from '@/contexts/state'
import { SunIcon, MoonIcon } from '@shopify/polaris-icons'

const ToggleThemeBtn = () => {
  const { isDark, toggleTheme } = useAppContext()

  return (
    <button
      onClick={toggleTheme}
      className='cursor-pointer transition-colors duration-300 text-[var(--foreground)] hover:text-[var(--accent-color)]'
      aria-label='Toggle theme'
    >
      {isDark ? (
        <MoonIcon
          className='w-5 h-5'
          fill='currentColor'
        />
      ) : (
        <SunIcon
          className='w-5 h-5'
          fill='currentColor'
        />
      )}
    </button>
  )
}

export default memo(ToggleThemeBtn)
