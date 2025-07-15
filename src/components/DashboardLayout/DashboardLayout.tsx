'use client'

import React, { useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useAppContext } from '@/contexts/state'
import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import SummaryStats from '../DashboardWidgets/SummaryStats/SummaryStats'
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

const ResponsiveGridLayout = WidthProvider(Responsive)

export default function DashboardLayout() {
  const { initialDashboard, editMode, autoFetch, updateLastUpdated, isDark } = useAppContext()
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

  // Saves the layout in localStorage when it changes, so the user
  // Returns to the same dashboard layout next time they visit
  const onLayoutChange = (newLayout: any[]) => {
    setLayout(newLayout)
    localStorage.setItem('layout', JSON.stringify(newLayout))
  }

  const handleDeleteWidget = (key: string) => {
    setLayout((prev) => prev?.filter((widget) => widget.i !== key) || [])
  }

  if (!layout) return null

  const renderWidget = (widgetKey: string) => {
    const commonStyle = {
      bgColor: 'var(--background)',
      textColor: 'var(--foreground)',
      borderColor: editMode
        ? 'var(--border-color-edit)'
        : 'var(--border-color)',
      borderRadius: '8px',
    }
  
    const commonProps = {
      style: commonStyle,
      onDelete: () => handleDeleteWidget(widgetKey),
    }
  
    switch (widgetKey) {
      case 'summary':
        return (
          <WidgetContainer {...commonProps} title='Summary Stats' childContainerClass="p-0">
            {data && (
              <SummaryStats
                salesData={data.charts.salesOverTime.data}
                locations={data.map.locations}
                products={data.tables.topProducts}
              />
            )}
          </WidgetContainer>
        )
      case 'chart':
        return (
          <WidgetContainer {...commonProps} title='Sales Chart'>
            {data?.charts?.salesOverTime && (
              <SalesChart data={data.charts.salesOverTime} />
            )}
          </WidgetContainer>
        )
      case 'engagement':
        return (
          <WidgetContainer {...commonProps} title='User Engagement'>
            {data?.charts?.userEngagement && (
              <EngagementChart data={data.charts.userEngagement} />
            )}
          </WidgetContainer>
        )
      case 'table':
        return (
          <WidgetContainer {...commonProps} title='Recent Transactions'>
            {data?.tables?.recentTransactions && (
              <RecentTransactions transactions={data.tables.recentTransactions} />
            )}
          </WidgetContainer>
        )
      case 'products':
        return (
          <WidgetContainer {...commonProps} title='Top Products'>
            {data?.tables?.topProducts && (
              <TopProducts products={data.tables.topProducts} />
            )}
          </WidgetContainer>
        )
      case 'map':
        return (
          <WidgetContainer {...commonProps} title='Locations'>
            {data?.map?.locations && (
              <ActivityMap locations={data.map.locations} />
            )}
          </WidgetContainer>
        )
      default:
        return null
    }
  }
  

  return (
    <ResponsiveGridLayout
      className='layout'
      layouts={{ lg: layout }}
      cols={{ lg: 6, md: 3, sm: 1 }}
      breakpoints={{ lg: 1200, md: 996, sm: 768 }}
      rowHeight={330}
      margin={[16, 16]}
      onLayoutChange={editMode ? onLayoutChange : undefined}
      isResizable={editMode}
      isDraggable={editMode}
      draggableHandle='.drag-handle'
      draggableCancel='.leaflet-container'
      compactType='vertical'
      preventCollision
      isBounded
      useCSSTransforms={false}
    >
      {layout.map((widget) => (
        <div key={widget.i}>{renderWidget(widget.i)}</div>
      ))}
    </ResponsiveGridLayout>
  )
}
