'use client'

import React, { memo } from 'react'
import { useAppContext } from '@/contexts/state'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

interface Props {
  data: {
    labels: string[]
    data: number[]
  }
}

const SalesChart: React.FC<Props> = ({ data }) => {
  const { isDark } = useAppContext()

  // Combine labels and data into one array of objects
  const chartData = data.labels.map((label, i) => ({
    day: label,
    sales: data.data[i],
  }))

  const gradientId = 'colorSales'

  return (
    <div className='w-full h-64'>
      <ResponsiveContainer
        width='100%'
        height='100%'
      >
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop
                offset='20%'
                stopColor={isDark ? '#1b94d1' : '#18709b'}
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor={isDark ? '#1b94d1' : '#18709b'}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray='2 2'
            stroke={isDark ? '#ebebeb20' : '#181b1c20'}
          />
          <XAxis
            dataKey='day'
            stroke={isDark ? '#0d72a5' : '#07557c'}
          />
          <YAxis stroke={isDark ? '#0d72a5' : '#07557c'} />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='sales'
            stroke={isDark ? '#1b94d1' : '#18709b'}
            fill={`url(#${gradientId})`}
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default memo(SalesChart)
