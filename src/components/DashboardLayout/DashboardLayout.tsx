'use client'

import React, { useEffect, useState } from 'react'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import WidgetContainer from '../WidgetContainer/WidgetContainer'
import SalesChart from '../SalesChart/SalesChart'
import EngagementChart from '../EngagementChart/EngagementChart'
import RecentTransactions from '../RecentTransactions/RecentTransactions'
import TopProducts from '../TopProducts/TopProducts'
import ActivityMap from '../ActivityMap/ActivityMap'

import { fetchLiveData } from '@/lib/fetchData'

const defaultStyle = {
  bgColor: 'var(--neutral-6)',
  textColor: 'var(--neutral-1)',
  borderColor: 'var(--neutral-4)',
  borderRadius: '8px',
}

const defaultLayouts = [
  { i: 'chart', x: 0, y: 0, w: 1, h: 2 },
  { i: 'engagement', x: 1, y: 0, w: 1, h: 2 },
  { i: 'table', x: 2, y: 0, w: 1, h: 1 },
  { i: 'products', x: 0, y: 2, w: 1, h: 1 },
  { i: 'map', x: 1, y: 2, w: 2, h: 2 },
]

export default function DashboardLayout() {
  const [data, setData] = useState<any>(null)
  const [layout, setLayout] = useState<any[] | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchLiveData()
        setData(result)
      } catch (err) {
        console.error('❌ Failed to fetch live data', err)
      }
    }

    load()
    const interval = setInterval(load, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('layout')
    if (saved) {
      setLayout(JSON.parse(saved))
    } else {
      setLayout(defaultLayouts)
    }
  }, [])

  const onLayoutChange = (newLayout: any[]) => {
    setLayout(newLayout)
    localStorage.setItem('layout', JSON.stringify(newLayout))
  }

  if (!layout) return null

  return (
    <GridLayout
      className='layout'
      layout={layout}
      cols={3}
      rowHeight={160}
      width={1200}
      margin={[16, 16]}
      onLayoutChange={onLayoutChange}
      isResizable={true}
      isDraggable={true}
      compactType='vertical'
      draggableCancel='.leaflet-container'
    >
      <div key='chart'>
        <WidgetContainer
          title='Sales Chart'
          style={defaultStyle}
        >
          {data?.charts?.salesOverTime && (
            <SalesChart data={data.charts.salesOverTime} />
          )}
        </WidgetContainer>
      </div>

      <div key='engagement'>
        <WidgetContainer
          title='User Engagement'
          style={defaultStyle}
        >
          {data?.charts?.userEngagement && (
            <EngagementChart data={data.charts.userEngagement} />
          )}
        </WidgetContainer>
      </div>

      <div key='table'>
        <WidgetContainer
          title='Recent Transactions'
          style={defaultStyle}
        >
          {data?.tables?.recentTransactions && (
            <RecentTransactions transactions={data.tables.recentTransactions} />
          )}
        </WidgetContainer>
      </div>

      <div key='products'>
        <WidgetContainer
          title='Top Products'
          style={defaultStyle}
        >
          {data?.tables?.topProducts && (
            <TopProducts products={data.tables.topProducts} />
          )}
        </WidgetContainer>
      </div>

      <div key='map'>
        <WidgetContainer
          title='Activity Map'
          style={defaultStyle}
        >
          {data?.map?.locations && (
            <ActivityMap locations={data.map.locations} />
          )}
        </WidgetContainer>
      </div>
    </GridLayout>
  )
}
