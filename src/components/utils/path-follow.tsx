import { useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const movingIcon = L.icon({
  iconUrl: '/drone-icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function AnimatedMarker({ path }: { path: [number, number][] }) {
  const [index, setIndex] = useState(0);
  const map = useMap();

  useEffect(() => {
    if (!path.length) return;
    map.setView(path[0]);
    const interval = setInterval(() => {
      setIndex((i) => {
        const next = i + 1;
        if (next >= path.length) {
          clearInterval(interval);
          return i;
        }
        map.panTo(path[next]);
        return next;
      });
    }, 300); // 300ms per step => ~30s for 100 steps
    return () => clearInterval(interval);
  }, [map, path]);

  return path.length > 0 ? <Marker position={path[index]} icon={movingIcon} /> : null;
}

export default AnimatedMarker;
