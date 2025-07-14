'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useAppContext } from '@/contexts/state'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import WidgetContainer from '../DashboardWidgets/WidgetContainer/WidgetContainer'
import SalesChart from '../DashboardWidgets/SalesChart/SalesChart'
import EngagementChart from '../DashboardWidgets/EngagementChart/EngagementChart'
import RecentTransactions from '../DashboardWidgets/RecentTransactions/RecentTransactions'
import TopProducts from '../DashboardWidgets/TopProducts/TopProducts'
const ActivityMap = dynamic(
  () => import('../DashboardWidgets/ActivityMap/ActivityMap'),
  { ssr: false, loading: () => <p>Loading map...</p> }
)

import { fetchLiveData } from '@/lib/fetchData'

const defaultStyle = {
  bgColor: 'var(--neutral-6)',
  textColor: 'var(--neutral-1)',
  borderColor: 'var(--neutral-4)',
  borderColorEdit: 'var(--blue-1)',
  borderRadius: '8px',
}

export default function DashboardLayout() {
  const { initialDashboard, editMode, autoFetch, updateLastUpdated } =
    useAppContext()
  const [data, setData] = useState<any>(null)
  const [layout, setLayout] = useState<any[] | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout

    const load = async () => {
      try {
        const result = await fetchLiveData()
        updateLastUpdated()
        setData(result)
      } catch (err) {
        console.error('❌ Failed to fetch live data', err)
      }
    }

    load()

    if (autoFetch) {
      interval = setInterval(load, 5000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [autoFetch, updateLastUpdated])

  useEffect(() => {
    const saved = localStorage.getItem('layout')
    if (saved) {
      setLayout(JSON.parse(saved))
    } else {
      setLayout(initialDashboard)
    }
  }, [initialDashboard])

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
      onLayoutChange={editMode ? onLayoutChange : undefined}
      isResizable={editMode}
      isDraggable={editMode}
      compactType='vertical'
      draggableCancel='.leaflet-container'
    >
      <div key='chart'>
        <WidgetContainer
          title='Sales Chart'
          style={{
            ...defaultStyle,
            borderColor: editMode ? 'var(--blue-3)' : defaultStyle.borderColor,
          }}
        >
          {data?.charts?.salesOverTime && (
            <SalesChart data={data.charts.salesOverTime} />
          )}
        </WidgetContainer>
      </div>

      <div key='engagement'>
        <WidgetContainer
          title='User Engagement'
          style={{
            ...defaultStyle,
            borderColor: editMode ? 'var(--blue-3)' : defaultStyle.borderColor,
          }}
        >
          {data?.charts?.userEngagement && (
            <EngagementChart data={data.charts.userEngagement} />
          )}
        </WidgetContainer>
      </div>

      <div key='table'>
        <WidgetContainer
          title='Recent Transactions'
          style={{
            ...defaultStyle,
            borderColor: editMode ? 'var(--blue-3)' : defaultStyle.borderColor,
          }}
        >
          {data?.tables?.recentTransactions && (
            <RecentTransactions transactions={data.tables.recentTransactions} />
          )}
        </WidgetContainer>
      </div>

      <div key='products'>
        <WidgetContainer
          title='Top Products'
          style={{
            ...defaultStyle,
            borderColor: editMode ? 'var(--blue-3)' : defaultStyle.borderColor,
          }}
        >
          {data?.tables?.topProducts && (
            <TopProducts products={data.tables.topProducts} />
          )}
        </WidgetContainer>
      </div>

      <div key='map'>
        <WidgetContainer
          title='Locations'
          style={{
            ...defaultStyle,
            borderColor: editMode ? 'var(--blue-3)' : defaultStyle.borderColor,
          }}
        >
          {data?.map?.locations && (
            <ActivityMap locations={data.map.locations} />
          )}
        </WidgetContainer>
      </div>
    </GridLayout>
  )
}
