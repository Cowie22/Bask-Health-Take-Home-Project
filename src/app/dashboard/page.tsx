'use client'

import React, { memo } from 'react'

import DashboardLayout from '@/components/DashboardLayout/DashboardLayout'


const Dashboard = () => {

  return (
    <section className='container w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4'>
      <DashboardLayout />
    </section>
  )
}

export default memo(Dashboard)