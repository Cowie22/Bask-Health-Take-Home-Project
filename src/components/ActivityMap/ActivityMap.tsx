'use client'

import React, { memo } from 'react'

interface Location {
  latitude: number
  longitude: number
  label: string
  activity: number
}

const ActivityMap = ({ locations }: { locations: Location[] }) => {
  return (
    <div className='space-y-2'>
      {locations.map((loc, index) => (
        <div
          key={index}
          className='flex justify-between'
        >
          <span>{loc.label}</span>
          <span>{loc.activity}</span>
        </div>
      ))}
    </div>
  )
}

export default memo(ActivityMap)
