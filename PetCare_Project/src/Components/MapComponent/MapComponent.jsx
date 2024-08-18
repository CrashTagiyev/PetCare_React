import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({
  address,
  city,
  country = "Azerbaijan",
}) => {
  const [position, setPosition] = useState(null); // Default to null, no coordinates
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance

    const fetchCoordinates = async () => {
      setLoading(true);
      try {
        const query = encodeURIComponent(`${address}, ${city}, ${country}`);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
          { signal: controller.signal } // Pass the signal to the fetch request
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Geocoding Data:", data);

        if (data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        } else {
          console.warn("No results found for the given address and city.");
          setPosition(null); // No position found
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error fetching geocoding data:", error);
        }
        setPosition(null); // Error in fetching
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();

    return () => {
      controller.abort(); // Cancel fetch request on component unmount or dependencies change
    };
  }, [address, city, country]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching
  }

  if (!position) {
    return <p>No location found for the given address.</p>; // Message when no position is available
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MapUpdater position={position} />
      <Marker position={position}>
        <Popup>
          {address}, {city}, {country}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (map && position) {
      map.setView(position);
    }
  }, [map, position]);
  return null;
};

export default MapComponent;
