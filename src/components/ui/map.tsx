import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

type Location = {
  id: string;
  coordinates: [number, number];
  label: string;
};

type MapProps = {
  locations: Location[];
  center?: [number, number];
};

export default function Map({ locations, center }: MapProps) {
  // If no center is provided, use the first location as center
  const mapCenter = center || (locations[0]?.coordinates || [0, 0]);

  return (
    <div className="h-full w-full">
      <MapContainer center={mapCenter} zoom={13} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render all location markers */}
        {locations.map((location) => (
          <Marker key={location.id} position={location.coordinates}>
            <Popup>{location.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
