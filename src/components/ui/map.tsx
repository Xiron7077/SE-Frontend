import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon paths (if needed)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

type MapProps = {
  lat: number;
  lng: number;
};

export default function Map({ lat, lng }: MapProps) {
  return (
    <div className="h-96 w-full">
      <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>  
          <Popup>
            Location: {lat.toFixed(4)}, {lng.toFixed(4)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
