'use client'

import React, { memo, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon, LatLngTuple } from 'leaflet'

interface Location {
  latitude: number
  longitude: number
  label: string
  activity: number
}

const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const ActivityMap = ({ locations }: { locations: Location[] }) => {
  const center: LatLngTuple = [39.8283, -98.5795]

  const MapAutoResize = () => {
    const map = useMap()

    useEffect(() => {
      map.invalidateSize()
    }, [map])

    return null
  }

  return (
    <MapContainer
      center={center}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: '500px', width: '100%', borderRadius: '8px' }}
    >
      <MapAutoResize />
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      {locations.map((location, i) => {
        const { latitude, longitude, label, activity } = location
        return (
          <Marker
            key={i}
            position={[latitude, longitude]}
            icon={markerIcon}
          >
            <Popup>
              <strong>{label}</strong>
              <br />
              Activity: {activity}
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

export default memo(ActivityMap)
