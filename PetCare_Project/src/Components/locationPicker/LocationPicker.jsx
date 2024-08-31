import React, { useState } from 'react';
import { GoogleMap, Marker,useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function LocationPicker() {
  const [position, setPosition] = useState(center);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBHJ7FF7CkNRkeMppLP0cQnpxcViDCyPM4' // Replace with your API key
  });

  const handleMapClick = (event) => {
    setPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={10}
      onClick={handleMapClick}
    >
      <Marker position={position} />
    </GoogleMap>
  ) : <></>;
}

export default LocationPicker;
