"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FiBell, FiSearch, FiSettings, FiMessageSquare, FiMap, FiBox, FiPackage, FiHome } from "react-icons/fi";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import OrderModal from "@/components/ui/order-modal";
import {fetchAvailableDrones, uploadMission, CommandDto, fetchAllDrones} from "@/components/lib/drone-helper";
import {clearInterval} from "node:timers";

const green = "#37A94C";

const navItems = [
    { label: "Dashboard", icon: <FiHome />, active: true },
    { label: "Orders", icon: <FiBox /> },
    { label: "Shipments", icon: <FiPackage /> },
    { label: "Map Overview", icon: <FiMap /> },
    { label: "Messages", icon: <FiMessageSquare />, badge: 2 },
    { label: "Settings", icon: <FiSettings /> },
];

const Map = dynamic(() => import('@/components/ui/map'), { ssr: false });

type ApiResponse = {
    source: { latitude: number; longitude: number };
    destination: { latitude: number; longitude: number };
};

export default function DashboardPage() {
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    const [locations, setLocations] = useState<{
        id: string;
        coordinates: [number, number];
        label: string;
    }[]>([]);

    useEffect(() => {
        const timeout = setInterval(() => {
            fetchAllDrones().then((drone_data) => {
                const data = drone_data.filter((data: any) => {
                    return data['id'] === 1
                })[0]
                setLocations([
                    { id: data["id"], coordinates: [Number(data["latestTelemetry"]["lat"]), Number(data["latestTelemetry"]["lon"])], label: "Drone 1" },
                ])

                console.log(locations)
            });
        }, 2000)

        return () => {
            clearInterval(timeout);
        }
    }, []);

    const source: [number, number] = [34.0693159, 72.6445735];
    const destination: [number, number] = [34.0710445, 72.6413709];

    const handleCreateOrder = async (orderData: any) => {
        console.log('New order created:', orderData);
    };

    return (
        <div className={`min-h-screen w-full flex bg-[#262626] transition-all duration-300 ${isOrderModalOpen ? 'backdrop-blur-sm' : ''}`}>
            {/* Sidebar */}
            <aside className="w-64 m-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 px-8 py-8">
                        <Image src="/logo.png" alt="Logo" width={36} height={36} />
                        <span className="font-bold text-2xl text-white">ShipNoxy</span>
                    </div>
                    <nav className="flex flex-col gap-2 mt-4 px-4">
                        {navItems.map((item) => (
                            <div key={item.label} className={`flex items-center gap-3 px-4 py-3 rounded-3xl cursor-pointer transition-colors text-white ${item.active ? `bg-[${green}]` : "hover:bg-green-500"}`}>
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-semibold flex-1">{item.label}</span>
                                {item.active &&
                                    <Image src={'/front.png'} alt="front" width={24} height={24} />
                                }
                                {item.badge && (
                                    <span className="ml-auto bg-green-200 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
                <div className="flex flex-col gap-4 px-8 py-8 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <Image src="/avatar.png" alt="User" width={40} height={40} className="rounded-full" />
                        <div>
                            <div className="font-bold text-white">Xiron</div>
                            <div className="text-xs text-gray-300">New York, NY</div>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                    </div>
                </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 flex flex-col gap-6 py-8 pr-8">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Welcome back, Xiron!</h2>
                        <div className="text-gray-300 text-sm">You have 1 new delivered parcel.</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-green-100 text-gray-600 hover:cursor-pointer "><FiSearch /></button>
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-green-100 text-gray-600 hover:cursor-pointer "><FiBell /></button>
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-green-100 text-gray-600 hover:cursor-pointer "><FiSettings /></button>
                        <motion.button
                            whileHover={{
                                scale: 1.1
                            }}
                            whileTap={{
                                scale: 0.9
                            }}
                            onClick={() => setIsOrderModalOpen(true)}
                            className="ml-4 px-6 py-2 rounded-full bg-green-500 text-white font-semibold hover:cursor-pointer transition-colors"
                        >
                            Create new order
                        </motion.button>
                    </div>
                </div>
                {/* Cards Grid */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-6">
                        {/* Package Details */}
                        <div className="col-span-1 bg-white rounded-2xl p-6 shadow flex flex-col w-[50%]">
                            <div className="font-bold text-lg text-black mb-2">Package Details</div>
                            <div className="flex gap-4 mb-2">
                                <div className="text-xs text-gray-500">Electronics</div>
                                <div className="text-xs text-green-500">In progress</div>
                            </div>
                            <div className="flex gap-4 mb-2">
                                <div className="text-xs text-gray-400">28 lbs</div>
                                <div className="text-xs text-gray-400">10.2 lbs</div>
                                <div className="text-xs text-gray-400">8.5 lbs</div>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <Image src="/avatar.png" alt="Receiver" width={32} height={32} className="rounded-full" />
                                <div>
                                    <div className="font-semibold text-black text-sm">Mike Miles</div>
                                    <div className="text-xs text-gray-400">+1 800 456 2456</div>
                                </div>
                            </div>
                        </div>
                        {/* Order Info */}
                        <div className="col-span-2 bg-white rounded-2xl p-6 shadow flex flex-col w-[50%]">
                            <div className="flex items-center justify-between mb-2">
                                <div className="font-bold text-lg text-black">Order Info</div>
                                <button className="text-green-500 text-sm font-semibold hover:underline">View more</button>
                            </div>
                            <div className="flex gap-8 items-center">
                                <div className="flex flex-col gap-1">
                                    <div className="text-xs text-gray-400">NYC → PHI</div>
                                    <div className="text-xs text-gray-400">#PTRG4523</div>
                                    <div className="flex gap-2 text-xs text-gray-400 mt-1">
                                        <span>Receipt 10:07AM</span>
                                        <span>Preparation 13:18PM</span>
                                        <span>Dispatch 14:33PM</span>
                                        <span>Receiving 16:13PM</span>
                                    </div>
                                    <div className="w-full bg-green-100 rounded-full h-2 mt-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "60%" }} />
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">60% Completed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Map Overview */}
                    {!isOrderModalOpen && (
                        <div className="col-span-1 row-span-2 bg-white rounded-2xl p-6 shadow flex flex-col h-[calc(100vh-24rem)]">
                            <div className="font-bold text-lg text-black mb-2">Map Overview</div>
                            <div className="flex-1 w-full h-full">
                                <Map locations={locations
                                }
                                     center={[34.0693159, 72.6445735]}

                                />
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <OrderModal
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
                onSubmit={handleCreateOrder}
            />
        </div>
    );
} 