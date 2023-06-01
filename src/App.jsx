import "./App.css";
import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";


function App() {
  const coords = [21.505, 78.09]
  const [position, setPosition] = useState(null)
  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
    console.log(position);
    return position === null ? (<Marker position={coords}></Marker>) : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  return (
    <div id="mapzz">
      <MapContainer
    center={{ lat: coords[0], lng: coords[1] }}
    zoom={5}
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