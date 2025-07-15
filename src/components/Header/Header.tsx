import React, { memo } from 'react'

import MainNav from './MainNav/MainNav'

const Header = () => {
  return (
    <header>
      <div>
        <MainNav />
      </div>
    </header>
  )
}

export default memo(Header)
