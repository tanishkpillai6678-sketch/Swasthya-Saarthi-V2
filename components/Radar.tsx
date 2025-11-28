import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Doctor, Location } from '../types';
import { MapPin, Navigation, Star } from 'lucide-react';

interface RadarProps {
  userLocation: Location;
  doctors: Doctor[];
  onSelectDoctor: (doc: Doctor) => void;
}

// Cast to any to avoid TypeScript errors with framer-motion props in some environments
const MotionDiv = motion.div as any;

const Radar: React.FC<RadarProps> = ({ userLocation, doctors, onSelectDoctor }) => {
  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null);

  // Haversine formula to calculate distance in meters
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // in meters
  };

  // Convert geo-coordinates to radar polar coordinates
  // Max range 5km (5000m)
  const getRadarPosition = (docLat: number, docLng: number) => {
    const dist = calculateDistance(userLocation.lat, userLocation.lng, docLat, docLng);
    // Scale distance: 0m = 0%, 5000m = 100% (radius)
    // For visualization, we cap at 90% so dots don't hit the edge
    const r = Math.min((dist / 5000) * 45, 45); // 45% is relative to 50% center
    
    // Bearing/Angle
    const y = Math.sin(docLng - userLocation.lng) * Math.cos(docLat);
    const x = Math.cos(userLocation.lat) * Math.sin(docLat) -
            Math.sin(userLocation.lat) * Math.cos(docLat) * Math.cos(docLng - userLocation.lng);
    const brng = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
    
    return { r, angle: brng, dist };
  };

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto bg-slate-900 rounded-full overflow-hidden shadow-2xl border-4 border-slate-800">
        
        {/* Grid Lines */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="w-[33%] h-[33%] rounded-full border border-green-500"></div>
            <div className="absolute w-[66%] h-[66%] rounded-full border border-green-500"></div>
            <div className="absolute w-[95%] h-[95%] rounded-full border border-green-500"></div>
            <div className="absolute w-full h-[1px] bg-green-500"></div>
            <div className="absolute h-full w-[1px] bg-green-500"></div>
        </div>

        {/* User Center */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
             <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse"></div>
        </div>

        {/* Radar Sweep Animation */}
        <MotionDiv 
            className="absolute inset-0 origin-center pointer-events-none z-0"
            style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, rgba(34, 197, 94, 0.1) 60deg, rgba(34, 197, 94, 0.5) 90deg, transparent 90.1deg)'
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />

        {/* Doctor Dots */}
        {doctors.map((doc) => {
            const pos = getRadarPosition(doc.lat, doc.lng);
            // Convert polar to cartesian for CSS positioning
            // Center is 50%, 50%
            const top = 50 - (pos.r * Math.cos(pos.angle * Math.PI / 180));
            const left = 50 + (pos.r * Math.sin(pos.angle * Math.PI / 180));

            return (
                <button
                    key={doc.uid}
                    onClick={() => {
                        setActiveDoctor(doc);
                        onSelectDoctor(doc);
                    }}
                    className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 border-white hover:scale-125 transition-transform z-20 overflow-hidden bg-white shadow-lg group"
                    style={{ top: `${top}%`, left: `${left}%` }}
                >
                   <img src={doc.photoURL} alt={doc.name} className="w-full h-full object-cover" />
                   <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white bg-black/70 px-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        {Math.round(pos.dist)}m
                   </div>
                </button>
            )
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 text-xs text-green-500 font-mono opacity-60">
            Scanning range: 5km<br/>
            Active units: {doctors.length}
        </div>
    </div>
  );
};

export default Radar;