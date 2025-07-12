import React, { memo } from 'react'

import MainNav from './MainNav/MainNav'
import MainNavMobile from './MainNavMobile/MainNavMobile'

const Header = () => {
  return (
    <header>
      <div className='hidden lg:block'>
        <MainNav />
      </div>
      <div className='block lg:hidden'>
        <MainNavMobile />
      </div>
    </header>
  )
}

export default memo(Header)
