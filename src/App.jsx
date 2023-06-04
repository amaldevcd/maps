import "./App.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { Form, InputGroup } from "react-bootstrap";
import axios from 'axios'
import L from 'leaflet'

function App() {
  const coords = [21.505, 78.09];
  const [position, setPosition] = useState([76.708382,11.412055]);
  const [search,setSearch] = useState('')

  const handleFind = () =>
  {
    axios.get(`https://api.openrouteservice.org/geocode/autocomplete?api_key=${import.meta.env.VITE_API_URL}&text=${search}`)
    .then((res)=>setPosition([res.data.features[0].geometry.coordinates[1],res.data.features[0].geometry.coordinates[0]]))
    .catch((err)=>console.log(err))
    console.log(position+" hipos");
  }
  //const mapRef =useRef(null)

  useEffect(()=>
  {
  },[position]);

  

  const markerIcon = L.icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  });

  return (
    <div id="mapzz">
      <div className="search">
        <InputGroup>
          <Form.Control size="lg" type="text" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)} />
          <InputGroup.Text
            id="basic-addon2 search-button"
            className="search-button"
            onClick={handleFind}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </InputGroup.Text>
        </InputGroup>
      </div>
      <div className="map-section">
        <MapContainer
          center={{ lat: coords[0], lng: coords[1] }}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: "100vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <LocationMarker /> */}
          {position && (
            <Marker position={position} icon={markerIcon}>
              <Popup>
                A marker is placed at lat: {position[0]}, lng: {position[1]}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      <div className="live-loc">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="red"
          className="bi bi-geo-fill"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
          />
        </svg>
      </div>
    </div>
  );
}

export default App;
