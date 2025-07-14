import React, { memo } from 'react'

import ToggleThemeBtn from '@/components/Header/ToggleThemeBtn/ToggleThemeBtn'

const MainNavMobile = () => {
  return (
    <section className='flex items-center justify-between p-3 bg-[#FAFDFF] dark:bg-[#181B1C]'>
      <div>
        <button className='cta-btn white-btn'>Reset to default</button>
      </div>
      <div>
        <ToggleThemeBtn />
      </div>
    </section>
  )
}

export default memo(MainNavMobile)
