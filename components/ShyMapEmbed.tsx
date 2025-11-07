'use client';
import React, { useEffect, useState, useRef } from 'react';

interface ShyLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  activeUsers: number;
  status: 'active' | 'inactive';
  type: 'cafe' | 'library' | 'park' | 'gym' | 'coworking' | 'other';
}

// This will eventually fetch from your API: /api/locations
// For now, using sample data that matches your actual locations
const INITIAL_LOCATIONS: ShyLocation[] = [
  // New York
  { id: 'coffee-corner', name: 'Coffee Corner', city: 'New York', state: 'NY', lat: 40.7589, lng: -73.9851, activeUsers: 8, status: 'active', type: 'cafe' },
  { id: 'midtown-library', name: 'Midtown Library', city: 'New York', state: 'NY', lat: 40.7549, lng: -73.9840, activeUsers: 12, status: 'active', type: 'library' },
  { id: 'city-park', name: 'City Park', city: 'New York', state: 'NY', lat: 40.7829, lng: -73.9654, activeUsers: 5, status: 'active', type: 'park' },
  
  // More cities (sample data - replace with real API data)
  { id: 'boston-cafe', name: 'Boston Common Café', city: 'Boston', state: 'MA', lat: 42.3554, lng: -71.0640, activeUsers: 14, status: 'active', type: 'cafe' },
  { id: 'sf-mission', name: 'Mission Coffee', city: 'San Francisco', state: 'CA', lat: 37.7599, lng: -122.4148, activeUsers: 22, status: 'active', type: 'cafe' },
  { id: 'la-fitness', name: 'Venice Beach Gym', city: 'Los Angeles', state: 'CA', lat: 33.9850, lng: -118.4695, activeUsers: 18, status: 'active', type: 'gym' },
  { id: 'chicago-loop', name: 'Loop Library', city: 'Chicago', state: 'IL', lat: 41.8819, lng: -87.6278, activeUsers: 16, status: 'active', type: 'library' },
  { id: 'austin-downtown', name: 'South Congress Café', city: 'Austin', state: 'TX', lat: 30.2500, lng: -97.7500, activeUsers: 11, status: 'active', type: 'cafe' },
  { id: 'seattle-cap', name: 'Capitol Hill Coffee', city: 'Seattle', state: 'WA', lat: 47.6205, lng: -122.3212, activeUsers: 9, status: 'active', type: 'cafe' },
  { id: 'miami-beach', name: 'South Beach Gym', city: 'Miami', state: 'FL', lat: 25.7907, lng: -80.1300, activeUsers: 13, status: 'active', type: 'gym' },
];

export default function ShyMapEmbed() {
  const [locations, setLocations] = useState<ShyLocation[]>(INITIAL_LOCATIONS);
  const [hoveredLocation, setHoveredLocation] = useState<ShyLocation | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calculate total active users
    const total = locations.reduce((sum, loc) => sum + loc.activeUsers, 0);
    setTotalUsers(total);

    // TODO: Fetch real-time location data from API
    // fetchLocations();
    
    // Add animation delays to markers
    const markers = document.querySelectorAll('.location-marker');
    markers.forEach((marker, i) => {
      (marker as HTMLElement).style.animationDelay = `${i * 0.1}s`;
    });
  }, [locations]);

  // Convert lat/lng to SVG coordinates (simplified US projection)
  const latLngToSVG = (lat: number, lng: number) => {
    // US bounds: lat 24-50, lng -125 to -65
    const x = ((lng + 125) / 60) * 100; // Convert to 0-100%
    const y = ((50 - lat) / 26) * 100;   // Invert Y axis, convert to 0-100%
    return { x, y };
  };

  const getMarkerSize = (users: number) => {
    if (users >= 20) return { size: 'w-5 h-5', glow: 'shadow-[0_0_25px_10px_rgba(251,191,36,0.5)]', pulse: 'scale-[2]' };
    if (users >= 10) return { size: 'w-4 h-4', glow: 'shadow-[0_0_20px_8px_rgba(251,191,36,0.4)]', pulse: 'scale-[1.8]' };
    return { size: 'w-3 h-3', glow: 'shadow-[0_0_15px_6px_rgba(251,191,36,0.3)]', pulse: 'scale-[1.5]' };
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Map Container */}
      <div 
        ref={mapRef}
        className="relative aspect-[16/10] rounded-3xl border border-white/10 bg-gradient-to-br from-black via-zinc-950 to-black overflow-hidden"
      >
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} 
        />

        {/* Ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />

        {/* US Map SVG Silhouette */}
        <svg
          viewBox="0 0 960 600"
          className="absolute inset-0 w-full h-full opacity-[0.12]"
          fill="none"
          stroke="rgba(251,191,36,0.25)"
          strokeWidth="1.5">
          {/* Simplified US outline - you can replace with actual US map SVG */}
          <path d="M120 180 L180 140 L260 160 L340 130 L420 150 L500 140 L580 155 L660 145 L740 160 L820 155 L880 180 L880 480 L820 510 L740 530 L660 520 L580 540 L500 530 L420 550 L340 520 L260 500 L180 480 L120 480 Z" 
            fill="rgba(251,191,36,0.02)"
          />
        </svg>

        {/* Location Markers */}
        {locations.map((location) => {
          const pos = latLngToSVG(location.lat, location.lng);
          const markerStyle = getMarkerSize(location.activeUsers);
          
          return (
            <div
              key={location.id}
              className="location-marker absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              style={{ 
                left: `${pos.x}%`, 
                top: `${pos.y}%`,
                animation: 'fadeInMarker 0.6s ease-out forwards',
                opacity: 0
              }}
              onMouseEnter={() => setHoveredLocation(location)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              {/* Animated pulse glow */}
              <div
                className={`absolute inset-0 rounded-full bg-yellow-400 ${markerStyle.glow} animate-pulse-glow pointer-events-none`}
                style={{ 
                  filter: 'blur(6px)',
                  transform: markerStyle.pulse,
                }}
              />
              
              {/* Core marker dot */}
              <div
                className={`relative ${markerStyle.size} rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 ring-2 ring-yellow-400/60 group-hover:scale-125 transition-transform duration-300 z-10`}
              />

              {/* Ripple on hover */}
              <div className="absolute inset-0 rounded-full bg-yellow-400/30 scale-0 group-hover:scale-[4] transition-transform duration-700 ease-out pointer-events-none" />
              
              {/* Location label (appears on hover) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                <div className="bg-black/90 backdrop-blur-md border border-yellow-400/50 rounded-lg px-3 py-1.5 shadow-2xl">
                  <div className="text-yellow-200 font-semibold text-xs">{location.name}</div>
                  <div className="text-white/60 text-[10px]">{location.activeUsers} active</div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Stats overlay */}
        <div className="absolute top-6 left-6 space-y-2 z-20">
          <div className="inline-flex items-center gap-2 bg-black/70 backdrop-blur-sm border border-yellow-400/30 rounded-full px-4 py-2 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-yellow-200 text-sm font-semibold">{locations.length} Live Locations</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-black/70 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 shadow-lg">
            <svg className="w-3.5 h-3.5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="text-white/70 text-sm">{totalUsers} Active Users</span>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-2.5 z-20">
          <div className="text-white/90 font-semibold text-xs mb-3">Activity Level</div>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-yellow-400 shadow-[0_0_25px_10px_rgba(251,191,36,0.5)]" />
            <span className="text-white/70 text-xs">High (20+ users)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_20px_8px_rgba(251,191,36,0.4)]" />
            <span className="text-white/70 text-xs">Medium (10-19 users)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_15px_6px_rgba(251,191,36,0.3)]" />
            <span className="text-white/70 text-xs">Active (&lt;10 users)</span>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-6 left-6 opacity-40 text-xs text-white/50 z-20">
          Real-time Shy Location Map
        </div>
      </div>

      {/* Mobile location list */}
      <div className="mt-8 lg:hidden">
        <div className="text-center mb-4 text-sm text-white/60">Active in these cities:</div>
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from(new Set(locations.map(l => l.city))).slice(0, 10).map((city) => (
            <div
              key={city}
              className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-white/80 text-xs">{city}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInMarker {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
