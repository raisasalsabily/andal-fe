import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, Circle } from '@react-google-maps/api';
import ChildMarkerImg from '../../assets/images/child_marker.png';
// import './GoogleMapsComponent.css';

const centerPositionDefault = { lat: -7.7761951, lng: 110.3762101 };

const containerStyle = {
  width: '100%',
  height: '100%'
};

export default function GoogleMapsComponent({
  childMarkerPosition,
  setChildMarkerPosition,
  geofMarkerPosition,
  setGeofMarkerPosition,
  showChildMarker,
  showGeofMarker,
  isMarkerDraggable,
  circleRadius
}) {
  const [childPosition, setChildPosition] = useState(centerPositionDefault);
  const [geofPosition, setGeofPosition] = useState(centerPositionDefault);
  const [centerPosition, setCenterPosition] = useState(centerPositionDefault);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

  useEffect(() => {
    if (childMarkerPosition) {
      setChildPosition({ lat: childMarkerPosition.lat, lng: childMarkerPosition.lon });
    }
  }, [childMarkerPosition]);

  useEffect(() => {
    if (geofMarkerPosition) {
      setGeofPosition({ lat: geofMarkerPosition.lat, lng: geofMarkerPosition.lon });
    }
  }, [geofMarkerPosition]);

  useEffect(() => {
    if (geofMarkerPosition) {
      setCenterPosition({ lat: geofMarkerPosition.lat, lng: geofMarkerPosition.lon });
    } else if (childMarkerPosition && !geofMarkerPosition) {
      setCenterPosition({ lat: childMarkerPosition.lat, lng: childMarkerPosition.lon });
    }
  }, [geofMarkerPosition, childMarkerPosition]);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 600;
      setIsSmallScreen(isSmall);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    if (showChildMarker) {
      setChildPosition({ lat, lng });
      setChildMarkerPosition({ lat, lon: lng });
    }

    if (showGeofMarker) {
      setGeofPosition({ lat, lng });
      setGeofMarkerPosition({ lat, lon: lng });
    }
  };

  const handleChildMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setChildMarkerPosition({ lat, lon: lng });
  };

  const handleGeofMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setGeofMarkerPosition({ lat, lon: lng });
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={centerPosition ? centerPosition : centerPositionDefault}
      zoom={13}
      onClick={handleMapClick}
      options={{
        mapTypeControl: !isSmallScreen,
        streetViewControl: true,
        zoomControl: true,

        mapTypeControlOptions: {
          position: isSmallScreen ? null : window.google.maps.ControlPosition.TOP_RIGHT
        },
        streetViewControlOptions: {
          position: isSmallScreen && window.google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControlOptions: {
          position: isSmallScreen && window.google.maps.ControlPosition.TOP_RIGHT
        }
      }}
    >
      {/* marker */}
      {showChildMarker && (
        <Marker
          position={childPosition}
          draggable={isMarkerDraggable}
          onDragEnd={handleChildMarkerDragEnd}
          icon={ChildMarkerImg}
        />
      )}
      {showGeofMarker && (
        <Marker position={geofPosition} draggable={isMarkerDraggable} onDragEnd={handleGeofMarkerDragEnd} />
      )}
      {/* circle for geofMarker */}
      {showGeofMarker && (
        <Circle
          center={geofPosition}
          radius={circleRadius}
          options={{
            strokeColor: '#C4B5FD',
            strokeWeight: 2,
            fillColor: '#C4B5FD'
          }}
        />
      )}
    </GoogleMap>
  );
}
