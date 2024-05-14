import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MapPinImg from '../../assets/images/map_pin.png';

const icon = L.icon({
  iconUrl: MapPinImg,
  iconSize: [38, 38]
});

const centerPosition = [-7.7761951, 110.3762101];

function ResetCenterView({ selectPosition }) {
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(L.latLng(selectPosition?.lat, selectPosition?.lon), map.getZoom(), {
        animate: true
      });
    }
  }, [selectPosition, map]);

  return null;
}

export default function Maps({ selectPosition, setSelectPosition }) {
  const locationSelection = selectPosition ? [selectPosition.lat, selectPosition.lon] : centerPosition;

  const handleMarkerDragEnd = (event) => {
    const marker = event.target;
    const newPosition = marker.getLatLng();
    setSelectPosition({
      lat: newPosition.lat,
      lon: newPosition.lng
    });
  };

  return (
    <MapContainer center={centerPosition} zoom={13} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=fpDlF5YXcAYQ19hRzNed"
      />

      {selectPosition && (
        <Marker
          position={locationSelection}
          icon={icon}
          draggable={true}
          eventHandlers={{
            dragend: handleMarkerDragEnd
          }}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}

      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}
