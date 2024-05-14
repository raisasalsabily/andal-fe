import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, ZoomControl, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MapPinImg from '../../assets/images/map_pin.png';

const icon = L.icon({
  iconUrl: MapPinImg,
  iconSize: [50, 50]
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

  const [markerPosition, setMarkerPosition] = useState(centerPosition);

  const MapEvents = () => {
    const map = useMap();

    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);
        setSelectPosition({ lat, lon: lng });
        map.flyTo([lat, lng], map.getZoom(), {
          duration: 500
        });
      }
    });
    return null;
  };

  const handleMarkerDragEnd = (event) => {
    const marker = event.target;
    const newPosition = marker.getLatLng();
    setSelectPosition({
      lat: newPosition.lat,
      lon: newPosition.lng
    });
  };

  return (
    <MapContainer
      center={centerPosition}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=fpDlF5YXcAYQ19hRzNed"
      />

      <ZoomControl position="bottomright" />

      {/* {selectPosition && (
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
      )} */}

      <Marker
        position={selectPosition ? locationSelection : markerPosition}
        icon={icon}
        draggable={true}
        eventHandlers={{
          dragend: handleMarkerDragEnd
        }}
      >
        <Popup>
          Marker added here! <br /> Lat: {markerPosition[0].toFixed(6)}, Lon: {markerPosition[1].toFixed(6)}
        </Popup>
      </Marker>

      <MapEvents />

      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}
