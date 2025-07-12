import React, { memo } from 'react'

import ToggleThemeBtn from '@/components/ToggleThemeBtn/ToggleThemeBtn';

const MainNav = () => {
  return (
    <section className='flex items-center justify-between p-3 bg-[var(--background)]'>
      <div>
        <button className='cta-btn white-btn'>
          Reset to default
        </button>
      </div>
      <div>
        <ToggleThemeBtn />
      </div>
    </section>
  )
}

export default memo(MainNav)