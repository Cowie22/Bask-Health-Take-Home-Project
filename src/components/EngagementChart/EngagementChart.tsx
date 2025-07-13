'use client'

import React, { memo } from 'react'
import '@/lib/chartSetup'
import { Bar } from 'react-chartjs-2'

const EngagementChart = ({
  data,
}: {
  data: { labels: string[]; data: number[] }
}) => {
  return (
    <Bar
      data={{
        labels: data.labels,
        datasets: [
          {
            label: 'User Engagement',
            data: data.data,
            backgroundColor: '#10b981',
          },
        ],
      }}
    />
  )
}

export default memo(EngagementChart)
