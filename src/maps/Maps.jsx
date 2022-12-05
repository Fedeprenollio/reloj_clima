

import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import {GoLocation} from "react-icons/go"
import 'leaflet/dist/leaflet.css'


export const Maps = ({latitude, longitude}) => {
    return (
        <MapContainer style={{"height":"400px"}} center={[latitude, longitude]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker   position={[latitude, longitude]}>
          <Popup>
           Tu ubicación es ésta.
          </Popup>
        </Marker>
      </MapContainer>
    )
}
