'use client'

import React, { memo } from 'react'
import '@/lib/chartSetup'
import { Line } from 'react-chartjs-2'

interface Props {
  data: {
    labels: string[]
    data: number[]
  }
}

const SalesChart: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Sales Over Time',
        data: data.data,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#07557c',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#999',
        },
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#999',
        },
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
      },
    },
  }

  return (
    <div className='w-full h-64'>
      <Line data={chartData} options={options} />
    </div>
  )
}

export default memo(SalesChart)
