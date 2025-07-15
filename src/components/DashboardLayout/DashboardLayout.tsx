'use client'

import React, { useEffect, useState, useCallback } from 'react'
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
import { LayoutItem } from '@/types'

const ResponsiveGridLayout = WidthProvider(Responsive)

export default function DashboardLayout() {
  const {
    layout,
    activeWidgets,
    setLayout,
    editMode,
    autoFetch,
    updateLastUpdated,
    removeWidget,
    lastUpdated,
  } = useAppContext()

  const [data, setData] = useState<any>(null)

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
      if (interval) clearInterval(interval)
    }
  }, [autoFetch, updateLastUpdated])

  // Filter layout to only active widgets
  const filteredLayout = layout.filter((widget) =>
    activeWidgets.includes(widget.i)
  )

  // Save layout changes on drag/resize
  const onLayoutChange = (newLayout: LayoutItem[]) => {
    setLayout(newLayout)
  }

  const handleDeleteWidget = (key: string) => {
    removeWidget(key)
  }

  const renderWidget = useCallback(
    (widgetKey: string) => {
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
            <WidgetContainer
              {...commonProps}
              title='Summary Stats'
              childContainerClass='p-0'
            >
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
            <WidgetContainer
              {...commonProps}
              title='Sales Chart'
            >
              {data?.charts?.salesOverTime && (
                <SalesChart data={data.charts.salesOverTime} />
              )}
            </WidgetContainer>
          )
        case 'engagement':
          return (
            <WidgetContainer
              {...commonProps}
              title='User Engagement'
            >
              {data?.charts?.userEngagement && (
                <EngagementChart data={data.charts.userEngagement} />
              )}
            </WidgetContainer>
          )
        case 'table':
          return (
            <WidgetContainer
              {...commonProps}
              title='Recent Transactions'
            >
              {data?.tables?.recentTransactions && (
                <RecentTransactions
                  transactions={data.tables.recentTransactions}
                />
              )}
            </WidgetContainer>
          )
        case 'products':
          return (
            <WidgetContainer
              {...commonProps}
              title='Top Products'
            >
              {data?.tables?.topProducts && (
                <TopProducts products={data.tables.topProducts} />
              )}
            </WidgetContainer>
          )
        case 'map':
          return (
            <WidgetContainer
              {...commonProps}
              title='Locations'
            >
              {data?.map?.locations ? (
                <ActivityMap locations={data.map.locations} />
              ) : (
                <p>Loading map data...</p>
              )}
            </WidgetContainer>
          )
        default:
          return null
      }
    },
    [data, editMode, lastUpdated]
  )

  if (!layout) return null

  return (
    <ResponsiveGridLayout
      className='layout'
      layouts={{
        lg: filteredLayout,
        md: filteredLayout,
        sm: filteredLayout,
      }}
      cols={{ lg: 6, md: 6, sm: 2 }}
      breakpoints={{ lg: 1024, md: 768, sm: 525 }}
      rowHeight={330}
      margin={[16, 16]}
      onLayoutChange={editMode ? onLayoutChange : undefined}
      isResizable={editMode}
      isDraggable={editMode}
      draggableHandle='.drag-handle'
      compactType='vertical'
      preventCollision={false}
      isBounded
      useCSSTransforms={false}
    >
      {filteredLayout.map((widget) => (
        <div key={widget.i}>{renderWidget(widget.i)}</div>
      ))}
    </ResponsiveGridLayout>
  )
}