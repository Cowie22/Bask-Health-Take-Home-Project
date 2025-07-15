'use client'

import React, { memo, useState } from 'react'
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

  return (
    <Map
      height={590}
      defaultCenter={[39.8283, -98.5795]}
      defaultZoom={4}
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
          {/* This div ensures pointer events are enabled */}
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
          <div className='bg-[var(--background)] shadow-lg rounded p-2 text-sm border border-[var(--borderColor)] z-50'>
            <p className='font-semibold'>{selected.label}</p>
            <p>Activity: {selected.activity}</p>
          </div>
        </Overlay>
      )}
    </Map>
  )
}

export default memo(ActivityMap)
