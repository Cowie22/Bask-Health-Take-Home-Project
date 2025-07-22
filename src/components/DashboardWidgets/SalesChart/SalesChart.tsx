'use client'

import React, { useState, useEffect } from 'react'
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
  const [colors, setColors] = useState({
    accent: '#18709b',
    tick: '#07557c',
    grid: '#d8dcde80',
    background: '#fafdff',
    foreground: '#181b1c',
    borderColor: '#181b1c',
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
        background: root.getPropertyValue('--background').trim() || '#fafdff',
        foreground: root.getPropertyValue('--foreground').trim() || '#181b1c',
        borderColor: root.getPropertyValue('--border-color').trim() || '#181b1c',
      })
    }, 50) // small delay to allow CSS to update

    return () => clearTimeout(timeout)
  }, [isDark])

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
                stopColor={colors.accent}
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor={colors.accent}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray='2 2'
            stroke={colors.grid}
          />
          <XAxis
            dataKey='day'
            stroke={colors.tick}
            interval='preserveStartEnd'
            fontSize={11}
          />
          <YAxis
            stroke={colors.tick}
            fontSize={13}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              border: `1px solid ${colors.borderColor}`,
              borderRadius: '8px',
              fontSize: '12px',
              padding: '8px',
            }}
            labelStyle={{
              color: colors.tick,
              fontWeight: 'bold',
            }}
            itemStyle={{
              color: colors.accent,
            }}
          />
          <Area
            type='monotone'
            dataKey='sales'
            stroke={colors.accent}
            fill={`url(#${gradientId})`}
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SalesChart
