import React, { useRef } from "react";
import { MapContainer, TileLayer, WMSTileLayer, LayersControl, ScaleControl } from "react-leaflet";

export default function MapView() {
  const center = [48.8566, 2.3522]; // example (Paris)
  const zoom = 10;
  const geoserverUrl = "https://geoserver.groupstrategy7.com/";

  return (
    <MapContainer center={center} zoom={zoom}  zoomControl={false} style={{height: "100vh", width: "100%"}}>
      {/* Basemap (OpenStreetMap) */}
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* GeoServer WMS Layer */}
      <WMSTileLayer
        url={`${geoserverUrl}/wms`}
        layers="workspace:cadastral_parcels"
        format="image/png"
        transparent={true}
        opacity={0.9}
        attribution="GeoServer"
      />

      <ScaleControl position="bottomleft" />
    </MapContainer>
  );
}
