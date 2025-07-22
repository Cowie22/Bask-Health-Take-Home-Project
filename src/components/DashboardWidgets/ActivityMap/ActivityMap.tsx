'use client'

import React, { memo, useState, useEffect } from 'react'
import { Map, Marker, Overlay } from 'pigeon-maps'
import { LocationIcon } from '@shopify/polaris-icons'

interface Location {
  latitude: number
  longitude: number
  label: string
  activity: number
}

const ActivityMap = ({ locations }: { locations: Location[] }) => {
  const [selected, setSelected] = useState<Location | null>(null)
  const [zoom, setZoom] = useState<number>(4)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768
      setZoom(isMobile ? 3 : 4)
    }
  }, [])

  return (
    <Map
      height={590}
      defaultCenter={[39.8283, -98.5795]}
      zoom={zoom}
      onClick={() => setSelected(null)}
    >
      {locations.map((loc, idx) => (
        <Marker
          key={idx}
          width={40}
          anchor={[loc.latitude, loc.longitude]}
          onClick={() => {
            setSelected(loc)
          }}
        >
          <div
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
            className='flex items-center justify-center'
          >
            <LocationIcon className='w-10 h-10' />
          </div>
        </Marker>
      ))}

      {selected && (
        <Overlay
          anchor={[selected.latitude, selected.longitude]}
          offset={[0, 40]}
        >
          <div className='bg-[var(--background)] shadow-lg rounded p-2 text-sm border border-[var(--border-color)] z-50'>
            <p className='font-semibold'>{selected.label}</p>
            <p>Activity: {selected.activity}</p>
          </div>
        </Overlay>
      )}
    </Map>
  )
}

export default memo(ActivityMap)
