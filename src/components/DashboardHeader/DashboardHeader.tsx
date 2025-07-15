import React, { useState, useEffect } from 'react'
import { useAppContext } from '@/contexts/state'
import {
  PlayIcon,
  PauseCircleIcon,
  ReplayIcon,
  CaretDownIcon,
} from '@shopify/polaris-icons'

const allWidgetKeys = [
  'summary',
  'products',
  'engagement',
  'chart',
  'table',
  'map',
]

const DashboardHeader = () => {
  const {
    lastUpdated,
    toggleAutoFetch,
    autoFetch,
    activeWidgets,
    restoreWidget,
    editMode,
  } = useAppContext()
  const [elapsed, setElapsed] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdated) {
        const diffMs = Date.now() - lastUpdated
        const minutes = Math.floor(diffMs / 60000)
        const seconds = Math.floor((diffMs % 60000) / 1000)
        setElapsed(`${minutes}m ${seconds}s ago`)
      } else {
        setElapsed('Never')
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [lastUpdated])

  const removedWidgets = allWidgetKeys.filter(
    (key) => !activeWidgets.includes(key)
  )

  const formatWidgetName = (key: string) => {
    const map: Record<string, string> = {
      summary: 'Summary Stats',
      chart: 'Sales Chart',
      engagement: 'User Engagement',
      table: 'Recent Transactions',
      products: 'Top Products',
      map: 'Activity Map',
    }
    return map[key] || key
  }

  return (
    <section className='py-3'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex items-center justify-between'>
          <h1 className='h3'>Dashboard</h1>

          {editMode && (
            <div className='relative z-10 ml-4'>
              <button
                className='cta-btn white-btn reverse-svg flex items-center'
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                Add Widget{' '}
                <CaretDownIcon
                  className={`w-4 h-4 transition-transform duration-500 ${
                    dropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              {dropdownOpen && (
                <ul className='absolute min-w-[250px] bg-[var(--background)] shadow-md rounded-md mt-2 p-2 border border-gray-300 text-sm'>
                  {removedWidgets.length === 0 ? (
                    <li className='text-[var(--foreground)] px-3 py-2'>
                      All widgets are active
                    </li>
                  ) : (
                    removedWidgets.map((key) => (
                      <li
                        key={key}
                        className='border-b last:border-b-0 border-gray-200'
                      >
                        <button
                          className='hover:bg-[var(--accent-color)] px-3 py-2 w-full text-left cursor-pointer transition-all duration-300 whitespace-nowrap'
                          onClick={() => {
                            restoreWidget(key)
                            setDropdownOpen(false)
                          }}
                        >
                          Add {formatWidgetName(key)}
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className='flex items-center justify-between'>
          <p className='h5 mr-2'>Last updated {elapsed}</p>
          <button
            className='cta-btn white-btn mr-2'
            onClick={toggleAutoFetch}
          >
            {autoFetch ? (
              <>
                <PauseCircleIcon className='w-4 h-4' />
                Pause auto-fetch
              </>
            ) : (
              <>
                <PlayIcon className='w-4 h-4' />
                Resume auto-fetch
              </>
            )}
          </button>
          <button
            className='cta-btn white-btn no-svg-margin less-padding'
            onClick={() => window.location.reload()}
          >
            <ReplayIcon className='w-5 h-5' />
          </button>
        </div>
      </div>
    </section>
  )
}

export default DashboardHeader
