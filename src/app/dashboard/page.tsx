"use client";

import Image from "next/image";
import { useState } from "react";
import { FiBell, FiSearch, FiSettings, FiMessageSquare, FiMap, FiBox, FiPackage, FiHome } from "react-icons/fi";
import { motion } from "framer-motion";

const green = "#37A94C";

const navItems = [
  { label: "Dashboard", icon: <FiHome />, active: true },
  { label: "Orders", icon: <FiBox /> },
  { label: "Shipments", icon: <FiPackage /> },
  { label: "Map Overview", icon: <FiMap /> },
  { label: "Messages", icon: <FiMessageSquare />, badge: 2 },
  { label: "Settings", icon: <FiSettings /> },
];

export default function DashboardPage() {

  return (
    <div className={`min-h-screen w-full flex bg-[#262626]`}> 
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
                    <Image src={'/front.png'} alt="front" width={24} height={24}/>
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
                className="ml-4 px-6 py-2 rounded-full bg-green-500 text-white font-semibold hover:cursor-pointer transition-colors"
            >
                Create new order
            </motion.button>
          </div>
        </div>
        {/* Cards Grid */}
        <div className="grid grid-cols-4 gap-6">
          {/* This month order */}
          <div className="col-span-1 bg-white rounded-2xl p-6 shadow flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-100 text-green-700 p-2 rounded-full"><FiBox /></span>
              <span className="font-bold text-lg text-black">This month order</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-black">132</span>
              <span className="text-green-500 font-semibold">↑ 25%</span>
            </div>
            <div className="mt-4">
              {/* Placeholder for chart */}
              <div className="h-16 w-full bg-green-50 rounded-xl flex items-end gap-1 px-2">
                {[30, 40, 60, 50, 80, 70].map((h, i) => (
                  <div key={i} className="bg-green-400 rounded w-3" style={{height: `${h}%`}} />
                ))}
              </div>
            </div>
          </div>
          {/* Average weight */}
          <div className="col-span-1 bg-white rounded-2xl p-6 shadow flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-100 text-green-700 p-2 rounded-full"><FiPackage /></span>
              <span className="font-bold text-lg text-black">Average weight</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-black">32 lbs</span>
              <span className="text-red-500 font-semibold">↓ 12%</span>
            </div>
            <div className="mt-4">
              <div className="h-16 w-full bg-green-50 rounded-xl flex items-end gap-1 px-2">
                {[60, 50, 40, 30, 20, 10].map((h, i) => (
                  <div key={i} className="bg-green-300 rounded w-3" style={{height: `${h}%`}} />
                ))}
              </div>
            </div>
          </div>
          {/* Average distance */}
          <div className="col-span-1 bg-white rounded-2xl p-6 shadow flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-100 text-green-700 p-2 rounded-full"><FiMap /></span>
              <span className="font-bold text-lg text-black">Average distance</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-black">872 mi</span>
            </div>
            <div className="mt-4">
              <div className="h-16 w-full bg-green-50 rounded-xl flex items-end gap-1 px-2">
                {[20, 40, 60, 80, 60, 40].map((h, i) => (
                  <div key={i} className="bg-green-400 rounded w-3" style={{height: `${h}%`}} />
                ))}
              </div>
            </div>
          </div>
          {/* Map Overview */}
          <div className="col-span-1 row-span-2 bg-white rounded-2xl p-6 shadow flex flex-col">
            <div className="font-bold text-lg text-black mb-2">Map Overview</div>
            <div className="flex-1 flex items-center justify-center">
              {/* Placeholder for map */}
              <div className="w-full h-40 bg-green-50 rounded-xl flex items-center justify-center text-green-400 font-bold">Map</div>
            </div>
            <div className="text-xs text-gray-400 mt-2">NYC → PHI, 93.9 mi</div>
          </div>
          {/* Package Details */}
          <div className="col-span-1 bg-white rounded-2xl p-6 shadow flex flex-col">
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
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow flex flex-col">
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
                  <div className="bg-green-500 h-2 rounded-full" style={{width: "60%"}} />
                </div>
                <div className="text-xs text-gray-400 mt-1">60% Completed</div>
              </div>
              <div className="flex-1 flex justify-end">
                <div className="w-24 h-24 bg-green-50 rounded-2xl flex items-center justify-center">
                  <Image src="/truck.png" alt="Truck" width={60} height={40} />
                </div>
              </div>
            </div>
          </div>
          {/* Speed Statistic */}
          <div className="col-span-1 bg-white rounded-2xl p-6 shadow flex flex-col items-center justify-center">
            <div className="font-bold text-lg text-black mb-2">Speed Statistic</div>
            <div className="relative flex items-center justify-center">
              <svg width="90" height="90">
                <circle cx="45" cy="45" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle cx="45" cy="45" r="40" stroke={green} strokeWidth="8" fill="none" strokeDasharray={251.2} strokeDashoffset={251.2 * 0.35} strokeLinecap="round" />
              </svg>
              <span className="absolute text-2xl font-bold text-black">65</span>
            </div>
            <div className="text-xs text-gray-400 mt-2">miles/hour</div>
          </div>
          {/* Wheeled Robot Trailer */}
          <div className="col-span-1 bg-white rounded-2xl p-6 shadow flex flex-col">
            <div className="font-bold text-lg text-black mb-2">Wheeled Robot Trailer</div>
            <div className="text-xs text-gray-400 mb-2">WRT-67 Max</div>
            <div className="flex gap-2 text-xs text-gray-400 mb-2">
              <span>568 lbs</span>
              <span>24 in</span>
              <span>12 in</span>
            </div>
            <div className="flex items-center justify-center">
              <Image src="/robot.png" alt="Robot" width={80} height={50} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 