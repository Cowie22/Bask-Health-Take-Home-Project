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
  const totalSales = salesData.reduce((a, b) => a + b, 0)
  const avgDailySales = Math.round(totalSales / salesData.length)
  const totalProfit = Math.round(totalSales * 0.2)

  const topCity =
    locations.slice().sort((a, b) => b.activity - a.activity)[0]?.label || 'N/A'

  const topProduct =
    products.slice().sort((a, b) => b.sales - a.sales)[0]?.name || 'N/A'

  return (
    <div className='space-y-2'>
      <div>Total Sales: ${totalSales}</div>
      <div>Average Daily Sales: ${avgDailySales}</div>
      <div>Total Profit (20% margin): ${totalProfit}</div>
      <div>Top City: {topCity}</div>
      <div>Top Product: {topProduct}</div>
    </div>
  )
}

export default memo(SummaryStats)
