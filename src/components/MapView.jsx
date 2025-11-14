import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, WMSTileLayer, ScaleControl } from "react-leaflet";

const MapView = React.memo(() => {
  const center = [9.432767514552197, -5.5897507837827805];
  const zoom = 20;

  const ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL;
  const GEO_SERVER_URL = import.meta.env.VITE_GEO_SERVER_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

  const [layers, setLayers] = useState([]);
  const [styles, setStyles] = useState([]);

  // 🎯 Load layers from your API
  useEffect(() => {
    const loadCadastralLayers = async () => {
      try {
        const res = await fetch(
          `${ENDPOINT_URL}method/strategy_custom_app.strategy_custom_app.api.geoserver_layers.get_thematic_layer_map_name_and_url`,{
            method: "POST",
            headers: {
              "Authorization": `token ${API_KEY}:${SECRET_KEY}`,
              "Content-Type": "application/json"
            },
          }

        );

        const data = await res.json();
        if (!data.message) return;

        setLayers(data.message.layers || []);
        setStyles(data.message.style || []);
      } catch (err) {
        console.error("Error loading layers:", err);
      }
    };

    loadCadastralLayers();
  }, [ENDPOINT_URL, API_KEY, SECRET_KEY]);

  // Memoize dynamic layers to prevent re-rendering
  const dynamicLayers = useMemo(() => {
    return layers.map((layer, index) => {
      const [namespace, layerName] = layer.split(":");
      const style = styles[index] || "";

      // Create a stable key using layer name
      const layerKey = `${namespace}-${layerName}-${index}`;

      return (
        <WMSTileLayer
          key={layerKey}
          url={`${GEO_SERVER_URL}/geoserver/${namespace}/wms`}
          layers={`${namespace}:${layerName}`}
          styles={style}
          format="image/png"
          transparent
          opacity={0.7}
          maxZoom={60}
          updateWhenIdle={true}
          updateWhenZooming={false}
          keepBuffer={2}
        />
      );
    });
  }, [layers, styles, GEO_SERVER_URL]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={true}
      minZoom={3}
      maxZoom={60}
      scrollWheelZoom={true}
      doubleClickZoom={true}
      style={{ height: "100vh", width: "100%" }}
      preferCanvas={true}
      updateWhenIdle={true}
      updateWhenZooming={false}
      keepBuffer={2}
    >

      {/* Base Map */}
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={60}
        updateWhenIdle={true}
        updateWhenZooming={false}
        keepBuffer={2}
      />

      {/* 🟢 Static example: your existing cadastral layer */}
      <WMSTileLayer
        url={`${GEO_SERVER_URL}/geoserver/workspace/wms`}
        layers="workspace:cadastral_parcels"
        format="image/png"
        opacity={0.9}
        maxZoom={60}
        transparent={true}
        updateWhenIdle={true}
        updateWhenZooming={false}
        keepBuffer={2}
      />

      {/* 🟡 Dynamic layers from API */}
      {dynamicLayers}

      <ScaleControl position="bottomleft" />
    </MapContainer>
  );
});

MapView.displayName = 'MapView';

export default MapView;
