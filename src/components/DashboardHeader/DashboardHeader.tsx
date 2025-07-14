import React, { useState, useEffect } from 'react'
import { useAppContext } from '@/contexts/state'
import { PlayIcon, PauseCircleIcon, ReplayIcon } from '@shopify/polaris-icons'

const DashboardHeader = () => {
  const { lastUpdated, toggleAutoFetch, autoFetch, updateLastUpdated } =
    useAppContext()
  const [elapsed, setElapsed] = useState('')

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

  return (
    <section className='py-3'>
      <div className='container mx-auto flex items-center justify-between'>
        <h1 className='h3'>Dashboard</h1>
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
