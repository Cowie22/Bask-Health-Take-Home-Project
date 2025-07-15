'use client'

import React, { memo } from 'react'
import { useAppContext } from '@/contexts/state'
import '@/lib/chartSetup'
import { Bar } from 'react-chartjs-2'
import type { ChartOptions } from 'chart.js'

interface Product {
  id: string
  name: string
  sales: number
}

const TopProducts = ({ products }: { products: Product[] }) => {
  const { isDark } = useAppContext()

  const data = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: 'Sales',
        data: products.map((product) => product.sales),
        backgroundColor: isDark ? '#1b94d1' : '#18709b',
        borderRadius: 4,
        barPercentage: 0.5,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (context: any) => `Sales: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // autoSkip: false,
          stepSize: 50,
          color: isDark ? '#0d72a5' : '#07557c',
        },
        grid: {
          color: isDark ? '#6b6f7180' : '#d8dcde80',
        },
      },
      x: {
        ticks: {
          color: isDark ? '#0d72a5' : '#07557c',
        },
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutBounce'
    }
  }

  return (
    <div style={{ height: '260px' }}>
      <Bar data={data} options={options} />
    </div>
  )
}

export default memo(TopProducts)