"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen px-14 flex items-center justify-between overflow-hidden bg-[linear-gradient(to_bottom_left,_#222222_30%,_#54B666_100%)]">
      {/* Green background shape */}
      <div className="absolute -left-40 -top-[300px] w-[55vw] h-[55vw] bg-[#1E1E1E] rounded-full z-0" style={{ filter: "blur(0px)" }} />
      {/* Black overlay shape */}
      <div className="absolute -right-40 -bottom-[300px] w-[55vw] h-[55vw] bg-[#37A94C] rounded-full z-0" style={{ filter: "blur(0px)" }} />
      <div className="relative z-20 flex flex-col gap-8 pl-16 pt-16 max-w-[50%] w-[40%]">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-[76px] font-bold text-white leading-tight"
        >
          Ship your parcel<br />with ShipNoxy
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
          className="text-gray-200 text-[24px] max-w-lg flex flex-col gap-4"
        >
          <div className="flex flex-row gap-10 text-green-400">
            <p>• Fast</p> 
            <p>• Reliable</p> 
            <p>• Contactless</p> 
          </div>
          <p>Revolutionize your shipping with drone-powered deliveries that reach your doorstep in record time.</p>
        </motion.div>
        <motion.a
          href="/login"
          initial={{
            opacity: 0,
            z: -10
          }}
          animate={{
            opacity: 1,
            z: 0,
            transition: {
              delay: 0.5,
              duration: 0.8
            }
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="w-[40%] inline-block px-8 py-4 rounded-full bg-[#393939] text-white text-lg text-center font-semibold shadow-lg hover:bg-green-500 hover:text-black transition-colors"
        >
          Get Started
        </motion.a>
      </div>
      {/* Drone and stats */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center pr-24 pt-24 w-[60%]">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <Image src="/drone-3-1.png" alt="Drone" width={3097} height={2073} priority/>
        </motion.div>
        <div className="absolute top-1/2 right-24 flex flex-col gap-16 text-right text-white text-3xl font-medium">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className="text-3xl font-bold text-black">300+</span><br />Countries
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <span className="text-3xl font-bold text-black">15 year</span><br />Experience
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            <span className="text-3xl font-bold text-black">800+</span><br />Expertist
          </motion.div>
        </div>
      </div>
    </div>
  );
}
