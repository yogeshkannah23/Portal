import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, WMSTileLayer, ScaleControl } from "react-leaflet";


const DEFAULT_CENTER = [9.432767514552197, -5.5897507837827805];
const DEFAULT_ZOOM = 20;

const MapView = React.memo(() => {
  const ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL;
  const GEO_SERVER_URL = import.meta.env.VITE_GEO_SERVER_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

  const [layers, setLayers] = useState([]);


  useEffect(() => {
    const controller = new AbortController();

    const loadLayers = async () => {
      try {
        const res = await fetch(
          `${ENDPOINT_URL}method/strategy_custom_app.strategy_custom_app.api.geoserver_layers.get_thematic_layer_map_name_and_url`,
          {
            method: "POST",
            headers: {
              "Authorization": `token ${API_KEY}:${SECRET_KEY}`,
              "Content-Type": "application/json",
              "Cache-Control": "max-age=86400", 
            },
            signal: controller.signal,
          }
        );

        const data = await res.json();
        if (!data.message) return;
        

        const merged = (data.message.layers || []).map((layer, i) => ({
          full: layer,
          style: data.message.style?.[i] || "",
        }));

        setLayers(merged);
      } catch (err) {
        if (err.name !== "AbortError")
          console.error("Layer loading failed:", err);
      }
    };

    loadLayers();
    return () => controller.abort();
  }, []);


  const dynamicLayers = useMemo(
    () =>
      layers.map((item, index) => {
        const [namespace, layerName] = item.full.split(":");

        return (
          <WMSTileLayer
            key={`${layerName}-${index}`}
            url={`${GEO_SERVER_URL}/geoserver/${namespace}/wms`}
            layers={`${namespace}:${layerName}`}
            styles={item.style}
            format="image/png"
            transparent={true}
            opacity={0.8}
            tiled={true}          
            maxZoom={60}
            updateWhenIdle={false}  
            updateWhenZooming={false}
            keepBuffer={1}
          />
        );
      }),
    [layers, GEO_SERVER_URL]
  );


  const baseMap = useMemo(
    () => (
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={60}
        updateWhenIdle={false}
        updateWhenZooming={false}
        keepBuffer={1}
      />
    ),
    []
  );


  const staticCadastralLayer = useMemo(
    () => (
      <WMSTileLayer
        url={`${GEO_SERVER_URL}/geoserver/workspace/wms`}
        layers="workspace:cadastral_parcels"
        format="image/png"
        tiled={true}              
        transparent
        opacity={0.9}
        maxZoom={60}
        updateWhenIdle={false}
        keepBuffer={1}
      />
    ),
    [GEO_SERVER_URL]
  );

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      zoomControl={true}
      minZoom={3}
      maxZoom={60}
      scrollWheelZoom={true}
      doubleClickZoom={true}
      style={{ height: "100vh", width: "100%" }}
      preferCanvas={true}
      updateWhenIdle={false}
      updateWhenZooming={false}
      keepBuffer={1}  
    >
      {baseMap}
      {staticCadastralLayer}
      {dynamicLayers}
      <ScaleControl position="bottomleft" />
    </MapContainer>
  );
});

MapView.displayName = "MapView";
export default MapView;
