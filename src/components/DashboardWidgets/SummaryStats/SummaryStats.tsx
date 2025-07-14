'use client'

import React, { memo } from 'react'

interface SummaryStatsProps {
  salesData: number[]
  locations: { label: string; activity: number }[]
  products: { name: string; sales: number }[]
}

const SummaryStats = ({
  salesData,
  locations,
  products,
}: SummaryStatsProps) => {
  const totalSales = salesData.reduce((a, b) => a + b, 0).toFixed(2)
  const avgDailySales = (Number(totalSales) / salesData.length).toFixed(2)
  const totalProfit = (Number(totalSales) * 0.2).toFixed(2)

  const topCity =
    locations.slice().sort((a, b) => b.activity - a.activity)[0]?.label || 'N/A'

  const topProduct =
    products.slice().sort((a, b) => b.sales - a.sales)[0]?.name || 'N/A'

  return (
    <div className='overflow-scroll h-[270px]'>
      <div className='pt-1 pb-4 px-3 border-b border-[var(--neutral-4)]'>
        <p className='h5 neutral-2 mb-2'>
          Total Sales
        </p>
        <p className='h4'>
          ${totalSales} <span className='neutral-2 body-copy'>USD</span>
        </p>
      </div>

      <div className='py-4 px-3 border-b border-[var(--neutral-4)]'>
        <p className='h5 neutral-2 mb-2'>
          Average Daily Sales
        </p>
        <p className='h4'>
          ${avgDailySales} <span className='neutral-2 body-copy'>USD</span>
        </p>
      </div>

      <div className='py-4 px-3 border-b border-[var(--neutral-4)]'>
        <p className='h5 neutral-2 mb-2'>
          Total Profit (20% margin)
        </p>
        <p className='h4'>
          ${totalProfit} <span className='neutral-2 body-copy'>USD</span>
        </p>
      </div>

      <div className='py-4 px-3 border-b border-[var(--neutral-4)]'>
        <p className='h5 neutral-2 mb-2'>
          Top City
        </p>
        <p className='h4'>
          {topCity}
        </p>
      </div>

      <div className='py-4 px-3'>
        <p className='h5 neutral-2 mb-2'>
          Top Product
        </p>
        <p className='h4'>
          {topProduct}
        </p>
      </div>

    </div>
  )
}

export default memo(SummaryStats)
