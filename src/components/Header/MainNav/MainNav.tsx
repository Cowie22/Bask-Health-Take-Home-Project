import React, { memo } from 'react'

import ToggleThemeBtn from '@/components/ToggleThemeBtn/ToggleThemeBtn'

const MainNav = () => {
  return (
    <section className='p-3 bg-[var(--neutral-6)] border-[var(--neutral-4)] border-b'>
      <div className='container w-full mx-auto flex items-center justify-between'>
        <div className='flex items-center'>
          <button className='cta-btn white-btn'>Reset to default</button>
        </div>
        <div className='flex items-center'>
          <ToggleThemeBtn />
        </div>
      </div>
    </section>
  )
}

export default memo(MainNav)
