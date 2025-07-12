'use client'

import React, { useEffect, useState } from 'react'
import WidgetContainer  from '@/components/WidgetContainer/WidgetContainer'
import { fetchLiveData } from '@/lib/fetchData'

const defaultStyle = {
  bgColor: '#f9fafb',
  textColor: '#111827',
  borderColor: '#d1d5db',
  borderRadius: '8px',
}

export default function DashboardPage() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const load = async () => {
      const result = await fetchLiveData()
      setData(result)
    }

    load()
    const interval = setInterval(load, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
      <WidgetContainer
        title='Live Chart'
        style={defaultStyle}
      >
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </WidgetContainer>

      <WidgetContainer
        title='Live Table'
        style={defaultStyle}
      >
        {/* Replace this with a real table component */}
        <p>Table placeholder</p>
      </WidgetContainer>

      <WidgetContainer
        title='Map'
        style={defaultStyle}
      >
        {/* Replace with Map component */}
        <p>Map placeholder</p>
      </WidgetContainer>
    </main>
  )
}
