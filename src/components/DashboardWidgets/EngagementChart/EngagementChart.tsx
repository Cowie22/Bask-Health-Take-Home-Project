'use client'

import React, { memo } from 'react'
import { useAppContext } from '@/contexts/state'
import '@/lib/chartSetup'
import { Bar } from 'react-chartjs-2'
import type { ChartOptions } from 'chart.js'

interface EngagementChartProps {
  data: { labels: string[]; data: number[] }
}

const EngagementChart = ({ data }: EngagementChartProps) => {
  const { isDark } = useAppContext()

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'User Engagement',
        data: data.data,
        backgroundColor: isDark ? '#1b94d1' : '#18709b',
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
          color: isDark ? '#0d72a5' : '#07557c',
        },
        grid: {
          color: isDark ? '#6b6f7140' : '#d8dcde40',
        },
      },
      y: {
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

export default memo(EngagementChart)
