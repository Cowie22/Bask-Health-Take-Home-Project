'use client'

import React, { memo } from 'react'

import DashboardLayout from '@/components/DashboardLayout/DashboardLayout'
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader'

const Dashboard = () => {

  return (
    <section className='container w-full mx-auto'>
      <DashboardHeader />
      <DashboardLayout />
    </section>
  )
}

export default memo(Dashboard)