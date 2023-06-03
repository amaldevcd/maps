import "./App.css";
import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'


function App() {
  const coords = [21.505, 78.09]
  const [position, setPosition] = useState(null)
  const [zoom,setZoom] = useState(5);
  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        //setZoom(10);
        map.flyTo(e.latlng,12)
      },
    })
    console.log(position);
    return position === null ? (<Marker position={coords} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}></Marker>) : (
      <Marker position={position} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  return (
    <div id="mapzz">
      <MapContainer
    center={{ lat: coords[0], lng: coords[1] }}
    zoom={zoom}
    scrollWheelZoom={true}
    style={{height: "100vh"}}
    >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <LocationMarker />
  </MapContainer>
    </div>
  );
}

export default App;
