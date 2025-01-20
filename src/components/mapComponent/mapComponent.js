import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function MapComponent({ lat, lng, height }) {
  const containerStyle = {
    width: "100%",
    height: height,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={15}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
}

export default MapComponent;
