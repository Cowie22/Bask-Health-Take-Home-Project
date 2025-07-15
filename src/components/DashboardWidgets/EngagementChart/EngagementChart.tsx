'use client'

import React, { useState, useEffect } from 'react'
import { useAppContext } from '@/contexts/state'
import '@/lib/chartSetup'
import { Bar } from 'react-chartjs-2'
import type { ChartOptions } from 'chart.js'

interface EngagementChartProps {
  data: { labels: string[]; data: number[] }
}

const EngagementChart = ({ data }: EngagementChartProps) => {
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
        tick:
          root.getPropertyValue('--accent-color').trim() + '99' || '#07557c',
        grid:
          root.getPropertyValue('--border-color').trim() + '80' || '#d8dcde80',
      })
    }, 50)

    return () => clearTimeout(timeout)
  }, [isDark])

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'User Engagement',
        data: data.data,
        backgroundColor: colors.accent,
        borderRadius: 7,
        barPercentage: 0.7,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `Engagement: ${context.parsed.x}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: colors.tick,
        },
        grid: {
          color: colors.grid,
        },
      },
      y: {
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
      easing: 'easeOutQuart',
    },
  }

  return (
    <div style={{ height: '260px' }}>
      <Bar
        data={chartData}
        options={options}
      />
    </div>
  )
}

export default EngagementChart
