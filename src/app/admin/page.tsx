"use client";

import Image from "next/image";
import { useState } from "react";
import { FiHome, FiBox } from "react-icons/fi";
import { sendCommand } from "@/components/lib/drone-helper";
import dynamic from 'next/dynamic';
import { fetchAllDrones } from "@/components/lib/drone-helper";

const Map = dynamic(() => import('@/components/ui/map'), { ssr: false });

const green = "#37A94C";

const navItems = [
    { label: "Dashboard", icon: <FiHome />, active: true },
    { label: "Orders", icon: <FiBox /> },
];

const orders = [
    {
        id: "1",
        customer: "Xiron",
        status: "Pending",
        items: 3,
        total: "$299.99",
        date: "2025-05-13"
    },
    {
        id: "2",
        customer: "Jane Smith",
        status: "Processing",
        items: 2,
        total: "$199.99",
        date: "2024-03-14"
    },
    {
        id: "3",
        customer: "Mike Johnson",
        status: "Shipped",
        items: 1,
        total: "$99.99",
        date: "2024-03-13"
    },
    {
        id: "4",
        customer: "Sarah Wilson",
        status: "Delivered",
        items: 4,
        total: "$399.99",
        date: "2024-03-12"
    }
];

const orderActions = [
    { value: "MANUAL_OVERRIDE", display: "Manual Override" },
    { value: "FLY_TO_LANDING", display: "Fly to Landing Zone" },
    { value: "START_MISSION", display: "Start Mission" },
    { value: "CONTINUE_MISSION", display: "Continue Mission" }
];

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
    const [showActionMenu, setShowActionMenu] = useState(false);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [locations, setLocations] = useState<{
        id: string;
        coordinates: [number, number];
        label: string;
    }[]>([]);

    setTimeout(() => {
        fetchAllDrones().then((drone_data) => {
            console.log(drone_data);
            setLocations([
                { id: drone_data[0].id, coordinates: [Number(drone_data[0].latestTelemetry["lat"]), Number(drone_data[0].latestTelemetry["lon"])], label: "Drone 1" },
                { id: drone_data[1].id, coordinates: [Number(drone_data[1].latestTelemetry["lat"]), Number(drone_data[1].latestTelemetry["lon"])], label: "Drone 2" },
                { id: drone_data[2].id, coordinates: [Number(drone_data[2].latestTelemetry["lat"]), Number(drone_data[2].latestTelemetry["lon"])], label: "Drone 3" },
                { id: drone_data[3].id, coordinates: [Number(drone_data[3].latestTelemetry["lat"]), Number(drone_data[3].latestTelemetry["lon"])], label: "Drone 4" },
            ])

            console.log(locations)
        });
    }, 10000)

    const handleOrderAction = async (orderId: string, action: string) => {
        console.log(`Action ${action} performed on order ${orderId}`);
        setSelectedAction(action);

        let response;

        if (selectedOrder && selectedAction) {
            response = sendCommand(selectedOrder, selectedAction);
        }

        setShowActionMenu(false);
        setSelectedOrder(null);
    };

    return (
        <div className="min-h-screen w-full flex bg-[#262626]">
            {/* Sidebar */}
            <aside className="w-64 m-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 px-8 py-8">
                        <Image src="/logo.png" alt="Logo" width={36} height={36} />
                        <span className="font-bold text-2xl text-white">ShipNoxy</span>
                    </div>
                    <nav className="flex flex-col gap-2 mt-4 px-4">
                        {navItems.map((item) => (
                            <div
                                key={item.label}
                                onClick={() => setActiveTab(item.label)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-3xl cursor-pointer transition-colors text-white ${activeTab === item.label ? `bg-[${green}]` : "hover:bg-green-500"
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-semibold flex-1">{item.label}</span>
                                {activeTab === item.label && (
                                    <Image src={'/front.png'} alt="front" width={24} height={24} />
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
                <div className="flex flex-col gap-4 px-8 py-8 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <Image src="/avatar.png" alt="User" width={40} height={40} className="rounded-full" />
                        <div>
                            <div className="font-bold text-white">Admin</div>
                            <div className="text-xs text-gray-300">Administrator</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col gap-6 py-8 pr-8">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
                        <div className="text-gray-300 text-sm">Manage your orders and shipments</div>
                    </div>
                </div>

                {/* Orders Grid */}
                {activeTab === "Orders" && (
                    <div className="grid grid-cols-2 gap-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-2xl p-6 shadow cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => {
                                    setSelectedOrder(order.id);
                                    setShowActionMenu(true);
                                }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-black">{order.id}</h3>
                                        <p className="text-gray-700">{order.customer}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${order.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                        order.status === "Processing" ? "bg-blue-100 text-blue-800" :
                                            order.status === "Shipped" ? "bg-purple-100 text-purple-800" :
                                                "bg-green-100 text-green-800"
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-700">Items</p>
                                        <p className="font-semibold text-gray-500">{order.items}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700">Total</p>
                                        <p className="font-semibold text-gray-500">{order.total}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700">Date</p>
                                        <p className="font-semibold text-gray-500">{order.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Action Menu Modal */}
                {showActionMenu && selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-2xl p-6 w-96">
                            <h3 className="font-bold text-lg mb-4">Select Action for {selectedOrder}</h3>
                            <div className="flex flex-col gap-2">
                                {orderActions.map((action) => (
                                    <button
                                        key={action.value}
                                        onClick={() => handleOrderAction(selectedOrder, action.value)}
                                        className="px-4 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        {action.display}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => {
                                    setShowActionMenu(false);
                                    setSelectedOrder(null);
                                }}
                                className="mt-4 w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Dashboard Overview */}
                {activeTab === "Dashboard" && (
                    <div className="flex flex-col gap-6 h-full">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow">
                                <h3 className="font-bold text-lg mb-4 text-black">Order Statistics</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-700">Total Orders</p>
                                        <p className="font-bold text-2xl text-gray-500">4</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700">Pending</p>
                                        <p className="font-bold text-2xl text-gray-500">1</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700">Processing</p>
                                        <p className="font-bold text-2xl text-gray-500">1</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700">Completed</p>
                                        <p className="font-bold text-2xl text-gray-500">2</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow">
                                <h3 className="font-bold text-lg mb-4 text-black">Recent Activity</h3>
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold text-gray-700">{order.id}</p>
                                                <p className="text-sm text-gray-500">{order.status}</p>
                                            </div>
                                            <p className="text-sm text-gray-500">{order.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Map Overview */}
                        <div className="bg-white rounded-2xl p-6 shadow h-[80%]">
                            <h3 className="font-bold text-lg mb-4 text-gray-700">Location Overview</h3>
                            <div className="h-[90%] w-full">
                                <Map
                                    locations={locations}
                                    center={[34.0693159, 72.6445735]}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
} 