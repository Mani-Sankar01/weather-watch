import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

interface MapSectionProps {
  latitude: number;
  longitude: number;
  handleLocationChange: (lat: number, lon: number) => void;
}

export const MapComponent: React.FC<MapSectionProps> = ({
  latitude,
  longitude,
  handleLocationChange,
}) => {
  const LocationMarker = () => {
    useMapEvents({
      click(e: any) {
        const { lat, lng } = e.latlng;
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);
        handleLocationChange(lat, lng);
      },
    });

    return <Marker position={[latitude, longitude]} />;
  };

  return (
    <div className="w-full border-2 p-4 rounded-2xl">
      <MapContainer
        center={[latitude, longitude]}
        zoom={14}
        style={{ height: "500px", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};
