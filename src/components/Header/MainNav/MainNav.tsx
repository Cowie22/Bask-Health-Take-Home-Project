'use client'

import React, { memo } from 'react'
import { useAppContext } from '@/contexts/state'

import ToggleThemeBtn from '@/components/Header/ToggleThemeBtn/ToggleThemeBtn'

const MainNav = () => {
  const { resetDashboard, editMode, toggleEditMode } = useAppContext()

  return (
    <section className='py-3 bg-[var(--neutral-6)] border-[var(--neutral-4)] border-b'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex items-center'>
          <button
            className='cta-btn white-btn mr-4'
            onClick={resetDashboard}
          >
            Reset to default
          </button>
          <div className='flex items-center'>
            <button
              onClick={toggleEditMode}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none ${
                editMode ? 'bg-[var(--blue-2)]' : 'bg-[var(--neutral-4)]'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-[var(--neutral-6)] rounded-full transition-transform duration-500 ${
                  editMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <p className='pl-2'>
              Edit mode
            </p>
          </div>
        </div>

        <div className='flex items-center'>
          <ToggleThemeBtn />
        </div>
      </div>
    </section>
  )
}

export default memo(MainNav)
