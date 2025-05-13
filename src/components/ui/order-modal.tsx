"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { fetchAvailableDrones } from '@/components/lib/drone-helper';
import { uploadMission } from '@/components/lib/drone-helper';
import { CommandDto } from '@/components/lib/drone-helper';

// Fix for default marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

type Location = [number, number] | null;

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orderData: OrderData) => void;
}

interface OrderData {
  source: Location;
  destination: Location;
}

function LocationMarker({ position, onClick }: { position: Location; onClick: () => void }) {
  const map = useMapEvents({
    click: (e) => {
      onClick();
    },
  });

  return position ? <Marker position={position} /> : null;
}

function MapWithClickHandler({ onMapClick }: { onMapClick: (e: L.LeafletMouseEvent) => void }) {
  useMapEvents({
    click: (e) => {
      e.originalEvent.stopPropagation();
      onMapClick(e);
    },
  });
  return null;
}

export default function OrderModal({ isOpen, onClose, onSubmit }: OrderModalProps) {
  const [source, setSource] = useState<Location>(null);
  const [destination, setDestination] = useState<Location>(null);
  const [weight, setWeight] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [selectingLocation, setSelectingLocation] = useState<'source' | 'destination' | null>(null);

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    if (selectingLocation === 'source') {
      setSource([e.latlng.lat, e.latlng.lng]);
      setSelectingLocation(null);
    } else if (selectingLocation === 'destination') {
      setDestination([e.latlng.lat, e.latlng.lng]);
      setSelectingLocation(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !destination || !weight || !name || !number) return;

    const drones = await fetchAvailableDrones();
    const id = drones[0].id;
    
    const source_waypoint: CommandDto = {
      lat: source[0],
      lon: source[1],
      alt: 100
    }
    
    const destination_waypoint: CommandDto = {
      lat: destination[0],
      lon: destination[1],
      alt: 100
    }

    const response = uploadMission(id, {
      dropoff_mission_index: 1,
      pickup_mission_index: 0,
      waypoints: [
        source_waypoint,
        destination_waypoint
      ]
    });

    console.log(response);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-white/10 backdrop-blur"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-[800px] max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Create New Order</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Source Location</label>
                    <button
                      type="button"
                      onClick={() => setSelectingLocation('source')}
                      className={`mt-1 w-full px-4 py-2 rounded-lg border text-gray-700 hover:cursor-pointer ${source ? 'border-green-500 bg-green-50 text-black' : 'border-gray-300'
                        }`}
                    >
                      {source ? `${source[0].toFixed(4)}, ${source[1].toFixed(4)}` : 'Click to select source'}
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Destination Location</label>
                    <button
                      type="button"
                      onClick={() => setSelectingLocation('destination')}
                      className={`mt-1 w-full px-4 py-2 rounded-lg border text-gray-700 hover:cursor-pointer ${destination ? 'border-green-500 bg-green-50' : 'border-gray-300'
                        }`}
                    >
                      {destination ? `${destination[0].toFixed(4)}, ${destination[1].toFixed(4)}` : 'Click to select destination'}
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 text-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Recipient Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 text-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 text-black"
                      required
                    />
                  </div>
                </div>

                <div className="h-[400px] rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
                  <MapContainer
                    center={[34.0693159, 72.6445735]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapWithClickHandler onMapClick={handleMapClick} />
                    {source && <LocationMarker position={source} onClick={() => setSelectingLocation('source')} />}
                    {destination && <LocationMarker position={destination} onClick={() => setSelectingLocation('destination')} />}
                  </MapContainer>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                >
                  Create Order
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 