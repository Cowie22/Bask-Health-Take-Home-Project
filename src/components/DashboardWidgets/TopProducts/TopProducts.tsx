'use client'

import React, { useState, useEffect } from 'react'
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
  const [colors, setColors] = useState({
    accent: '#18709b',
    tick: '#07557c',
    grid: '#d8dcde80',
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      const root = getComputedStyle(document.documentElement)
      setColors({
        accent: root.getPropertyValue('--accent-color').trim() || '#18709b',
        tick: root.getPropertyValue('--accent-color').trim() + '99' || '#07557c',
        grid:
          root.getPropertyValue('--border-color').trim() + '80' || '#d8dcde80',
      })
    }, 50)

    return () => clearTimeout(timeout)
  }, [isDark])

  const data = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: 'Sales',
        data: products.map((product) => product.sales),
        backgroundColor: colors.accent,
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
          color: colors.tick,
        },
        grid: {
          color: colors.grid,
        },
      },
      x: {
        ticks: {
          color: colors.tick,
        },
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutBounce',
    },
  }

  return (
    <div style={{ height: '260px' }}>
      <Bar
        data={data}
        options={options}
      />
    </div>
  )
}

export default TopProducts
