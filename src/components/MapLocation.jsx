import { useCallback, useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
  useMap,
} from "react-leaflet";
import { useEventHandlers } from "@react-leaflet/core";
import { Link } from "react-router-dom";
import L from "leaflet";

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

const BOUNDS_STYLE = { weight: 1 };

const MinimapBounds = ({ parentMap, zoom }) => {
  const minimap = useMap();

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  const handlers = useMemo(
    () => ({ move: onChange, zoom: onChange }),
    [onChange]
  );
  useEventHandlers({ instance: parentMap }, handlers);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
};

const MinimapControl = ({ position, zoom }) => {
  const parentMap = useMap();
  const mapZoom = zoom || 0;

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    [mapZoom, parentMap]
  );

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
};

const MapRefreshing = (props) => {
  const map = useMap();
  map.setView(props.center, props.zoom);
  return null;
};

const MapLocation = ({
  data: city,
  markerData = [],
  zoom = 9,
  minimap = false,
  popup = false,
  zoomControl = true,
  dragging = true,
}) => {
  const iconPrimary = L.icon({
    iconUrl: "/assets/images/leaflet/marker-quest-red.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -40],
    shadowUrl: "/assets/images/leaflet/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [13, 41],
  });
  const iconSecondary = L.icon({
    iconUrl: "/assets/images/leaflet/marker-quest-blu.svg",
    iconSize: [20, 32.8],
    iconAnchor: [10, 32.8],
    popupAnchor: [0, -32],
    shadowUrl: "/assets/images/leaflet/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [13, 41],
  });

  const markers =
    markerData.length > 1 ? (
      markerData.map((marker, idx) => (
        <Marker
          key={idx}
          position={[marker.lat, marker.lon]}
          icon={idx === 0 ? iconPrimary : iconSecondary}>
          {popup && (
            <Popup>
              <Link
                to={`/${encodeURIComponent(marker.name)}/${marker.country}/${
                  marker.lat
                }/${marker.lon}/now`}>
                {marker.name} <br />
                <span>kliknij aby sprawdzić pogodę</span>
              </Link>
            </Popup>
          )}
        </Marker>
      ))
    ) : (
      <Marker position={[city.lat, city.lon]} icon={iconPrimary}>
        {popup && (
          <Popup>
            <Link
              to={`/${encodeURIComponent(city?.local_names?.pl || city.name)}/${
                city.country
              }/${city.lat}/${city.lon}/now`}>
              {city?.local_names?.pl || city.name} <br />
              <span>kliknij aby sprawdzić pogodę</span>
            </Link>
          </Popup>
        )}
      </Marker>
    );

  return (
    <MapContainer
      center={[city.lat, city.lon]}
      zoom={zoom}
      scrollWheelZoom={false}
      zoomControl={zoomControl}
      dragging={dragging}>
      <MapRefreshing center={[city.lat, city.lon]} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
      {minimap && <MinimapControl position="topright" />}
    </MapContainer>
  );
};

export default MapLocation;
