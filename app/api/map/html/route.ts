// returns a small HTML page with Google Maps (for an <iframe> or preview)
export const dynamic = 'force-dynamic';

export async function GET() {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyD7KtQoq29-5TqELLdPBSQoqCD376-qGjA';
  const html = `<!doctype html><html><head>
    <meta charset="utf-8" />
    ${key ? `<script async defer src="https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap&loading=async"></script>` : ''}
    <style>
      html,body,#map{height:100%;margin:0;background:#0c0c0c;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial}
      .gmnoprint{display:none!important}
      .gm-style-cc{display:none!important}
      .gm-bundled-control{display:none!important}
      .gm-fullscreen-control{display:none!important}
      .gm-svpc{display:none!important}
      .gm-control-active{display:none!important}
      .gm-style a,.gm-style button{display:none!important}
      a[href*="google.com"]{display:none!important}
      .gm-zoom-control{display:none!important}
      .gm-pan-control{display:none!important}
      
      /* Revert to location button */
      .revert-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        background: #FACC15;
        border: none;
        border-radius: 8px;
        padding: 8px 12px;
        color: #000;
        font-weight: 700;
        cursor: pointer;
        font-size: 12px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        z-index: 1000;
      }
      .revert-btn:hover {
        background: #f1c40f;
        transform: scale(1.05);
      }
      
      /* Yellow glowing dot animation - matches mobile app */
      @keyframes glow {
        0%, 100% { 
          box-shadow: 0 0 20px #FACC15, 0 0 40px rgba(250,204,21,0.8), 0 0 60px rgba(250,204,21,0.4);
          transform: scale(1);
        }
        50% { 
          box-shadow: 0 0 30px #FACC15, 0 0 60px rgba(250,204,21,1), 0 0 80px rgba(250,204,21,0.6);
          transform: scale(1.1);
        }
      }
      .shy-glow-dot {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: radial-gradient(circle, #FACC15 0%, #FACC15 40%, rgba(250,204,21,0.8) 70%, rgba(250,204,21,0) 100%);
        animation: glow 3s ease-in-out infinite;
        position: relative;
        cursor: pointer;
      }
      .shy-glow-dot::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        background: #FACC15;
        border-radius: 50%;
        box-shadow: 0 0 4px #FACC15;
      }
    </style></head>
    <body>
      <div id="map"></div>
      <button class="revert-btn" onclick="revertToLocations()">📍 Show All</button>
    <script>
      (function(){
        ${key ? `
          let map;
          let markers = [];
          let infoWindows = [];
          
          function initMap() {
            try {
              console.log('Initializing map...');
              
              if (typeof google === 'undefined') {
                console.error('Google Maps API not loaded!');
                return;
              }
              
              if (!google.maps) {
                console.error('Google Maps object not available!');
                return;
              }
              
              console.log('Creating map instance...');
              map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 39.8283, lng: -98.5795}, // Geographic center of United States
                zoom: 4, // Zoomed to show from Canada to Guatemala cutoff
              disableDefaultUI: true,
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,
              keyboardShortcuts: false,
              clickableIcons: false,
              scrollwheel: true,
              gestureHandling: 'cooperative',
              styles: [
                {
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#000000"
                    }
                  ]
                },
                {
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#BFBFBF"
                    }
                  ]
                },
                {
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "color": "#434242"
                    }
                  ]
                },
                {
                  "featureType": "administrative.locality",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#BFBFBF"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#CDCACA"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#4D4C4C"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#00ff00"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#434242"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    {
                      "color": "#151515"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#151515"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#151515"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    {
                      "color": "#151515"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#151515"
                    }
                  ]
                },
                {
                  "featureType": "transit",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#2f3948"
                    }
                  ]
                },
                {
                  "featureType": "transit.station",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#d59563"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#17263c"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#515c6d"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "color": "#17263c"
                    }
                  ]
                }
              ]
            });
            
            // Add right-click to get coordinates
            map.addListener('rightclick', (event) => {
              const lat = event.latLng.lat().toFixed(6);
              const lng = event.latLng.lng().toFixed(6);
              
              // Send coordinates to parent window (Shy Map page)
              if (window.parent && window.parent.postMessage) {
                window.parent.postMessage({
                  type: 'MAP_COORDINATES',
                  lat: lat,
                  lng: lng
                }, '*');
              }
              
              // Show temporary marker at clicked location
              const tempMarker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 6,
                  fillColor: '#ff6b6b',
                  fillOpacity: 0.8,
                  strokeColor: '#ff6b6b',
                  strokeWeight: 2
                }
              });
              
              setTimeout(() => tempMarker.setMap(null), 3000); // Remove after 3 seconds
            });
            
            // Listen for messages from parent window to zoom to locations
            window.addEventListener('message', (event) => {
              if (event.data.type === 'ZOOM_TO_LOCATION') {
                const { lat, lng, name } = event.data;
                zoomToLocation(lat, lng, name);
                window.isZoomedToLocation = true;
              }
            });
            
            // Add map click listener to close info windows and return to show all view
            map.addListener('click', () => {
              // Close any open info windows
              if (window.currentInfoWindow) {
                window.currentInfoWindow.close();
                window.currentInfoWindow = null;
              }
              
              // Close any open tooltips
              if (window.currentTooltip) {
                window.currentTooltip.close();
                window.currentTooltip = null;
              }
              
              // If we're zoomed to a location, return to show all view
              if (window.isZoomedToLocation) {
                revertToLocations();
                window.isZoomedToLocation = false;
              }
            });
            
            loadLocations();
            setInterval(loadLocations, 30000); // Auto-refresh every 30 seconds
            console.log('Map initialization complete');
            } catch (error) {
              console.error('Error initializing map:', error);
            }
          }
          
          function clearMarkers() {
            markers.forEach(marker => marker.setMap(null));
            infoWindows.forEach(infoWindow => infoWindow.close());
            markers = [];
            infoWindows = [];
          }
          
          function loadLocations() {
            // Add cache busting and debug info
            const timestamp = Date.now();
            console.log('Loading locations at:', timestamp);
            
            if (!map) {
              console.error('Map not initialized!');
              return;
            }
            
            fetch('/api/locations?v=' + timestamp).then(r => r.json()).then(locations => {
              console.log('Received locations:', locations);
              clearMarkers();
              const bounds = new google.maps.LatLngBounds();
              let hasLocations = false;
              
              (locations || []).forEach(loc => {
                console.log('Processing location:', loc.name, 'at', loc.lat, loc.lng);
                if (loc.lat && loc.lng) {
                  hasLocations = true;
                  const position = {lat: parseFloat(loc.lat), lng: parseFloat(loc.lng)};
                  const isShyHQ = (loc.name || '').toLowerCase().includes('shy hq');
                  console.log('Is Shy HQ?', isShyHQ, 'for location:', loc.name);
                  
                  // Enhanced glowing marker with individual pulsing (twinkling effect)
                  const randomDelay = Math.random() * 3; // Random delay 0-3 seconds
                  const randomDuration = 2 + Math.random() * 2; // Random duration 2-4 seconds
                  const isOnline = loc.status === 'active' || loc.status === 'Online';
                  
                  const marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    icon: {
                      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(\`
                        <svg width="\${isShyHQ ? '20' : '16'}" height="\${isShyHQ ? '20' : '16'}" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <radialGradient id="grad-\${loc.id}" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" style="stop-color:\${isOnline ? (isShyHQ ? '#FFD700' : '#FACC15') : '#ef4444'};stop-opacity:0.95" />
                              <stop offset="50%" style="stop-color:\${isOnline ? (isShyHQ ? '#FFA500' : '#FACC15') : '#dc2626'};stop-opacity:0.6" />
                              <stop offset="100%" style="stop-color:\${isOnline ? (isShyHQ ? '#FF6347' : '#F59E0B') : '#b91c1c'};stop-opacity:0" />
                            </radialGradient>
                            <filter id="glow-\${loc.id}">
                              <feGaussianBlur stdDeviation="\${isShyHQ ? '1.5' : '1.2'}" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <!-- Subtle pulsing outer glow (Rolls Royce style) -->
                          \${isOnline ? \`<circle cx="\${isShyHQ ? '10' : '8'}" cy="\${isShyHQ ? '10' : '8'}" r="\${isShyHQ ? '7' : '6'}" 
                                  fill="url(#grad-\${loc.id})" filter="url(#glow-\${loc.id})" opacity="0.3">
                            <animate attributeName="r" 
                                     values="\${isShyHQ ? '7;9;7' : '6;8;6'}" 
                                     dur="\${randomDuration}s" 
                                     begin="\${randomDelay}s"
                                     repeatCount="indefinite"/>
                            <animate attributeName="opacity" 
                                     values="0.3;0.6;0.3" 
                                     dur="\${randomDuration}s" 
                                     begin="\${randomDelay}s"
                                     repeatCount="indefinite"/>
                          </circle>\` : ''}
                          <!-- Delicate inner glow -->
                          <circle cx="\${isShyHQ ? '10' : '8'}" cy="\${isShyHQ ? '10' : '8'}" r="\${isShyHQ ? '4' : '3.5'}" 
                                  fill="url(#grad-\${loc.id})" filter="url(#glow-\${loc.id})" opacity="0.7"/>
                          <!-- Bright star center (like Rolls Royce fiber optic stars) -->
                          <circle cx="\${isShyHQ ? '10' : '8'}" cy="\${isShyHQ ? '10' : '8'}" r="\${isShyHQ ? '2.5' : '2'}" 
                                  fill="\${isOnline ? (isShyHQ ? '#FFD700' : '#FACC15') : '#ef4444'}"/>
                          <!-- Tiny bright point in center -->
                          <circle cx="\${isShyHQ ? '10' : '8'}" cy="\${isShyHQ ? '10' : '8'}" r="\${isShyHQ ? '1' : '0.8'}" 
                                  fill="#FFF" opacity="\${isShyHQ ? '1' : '0.95'}"/>
                        </svg>
                      \`),
                      scaledSize: new google.maps.Size(isShyHQ ? 20 : 16, isShyHQ ? 20 : 16),
                      anchor: new google.maps.Point(isShyHQ ? 10 : 8, isShyHQ ? 10 : 8)
                    },
                    title: loc.name,
                    animation: null // Remove bouncing animation from Shy HQ
                  });
                  
                  // Enhanced coverage circles with multiple layers
                  const innerRadius = isShyHQ ? 75 : 50;
                  const outerRadius = isShyHQ ? 150 : 100;
                  
                  // Inner coverage circle
                  const innerCircle = new google.maps.Circle({
                    strokeColor: isShyHQ ? '#FFD700' : '#FACC15',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: isShyHQ ? '#FFD700' : '#FACC15',
                    fillOpacity: isShyHQ ? 0.3 : 0.2,
                    map: map,
                    center: position,
                    radius: innerRadius,
                    clickable: false
                  });
                  
                  // Outer glow circle
                  const outerCircle = new google.maps.Circle({
                    strokeColor: isShyHQ ? '#FFD700' : '#FACC15',
                    strokeOpacity: 0.3,
                    strokeWeight: 1,
                    fillColor: isShyHQ ? '#FFD700' : '#FACC15',
                    fillOpacity: 0.1,
                    map: map,
                    center: position,
                    radius: outerRadius,
                    clickable: false
                  });
                  
                  // Sleek, compact info window
                  const infoWindow = new google.maps.InfoWindow({
                    content: \`
                      <div style="
                        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                        color: #fff;
                        padding: 12px;
                        border-radius: 8px;
                        font-family: 'Inter', system-ui, sans-serif;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        box-shadow: 0 0 20px rgba(255, 255, 255, 0.2), 0 4px 20px rgba(0,0,0,0.4);
                        min-width: 180px;
                        max-width: 220px;
                        position: relative;
                      ">
                        <button onclick="window.currentInfoWindow?.close()" style="
                          position: absolute;
                          top: 8px;
                          right: 8px;
                          background: rgba(255, 255, 255, 0.1);
                          border: 1px solid rgba(255, 255, 255, 0.2);
                          border-radius: 50%;
                          width: 20px;
                          height: 20px;
                          color: #fff;
                          cursor: pointer;
                          font-size: 12px;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          line-height: 1;
                        ">×</button>
                        <div style="
                          color: \${isShyHQ ? '#FFD700' : '#FACC15'};
                          font-weight: 600;
                          margin-bottom: 6px;
                          margin-right: 25px;
                          font-size: 14px;
                          \${isShyHQ ? 'text-shadow: 0 0 8px #FFD700;' : ''}
                          line-height: 1.2;
                        ">
                          \${isShyHQ ? '🏢 ' : '📍 '}\${loc.name || 'Shy Location'}
                        </div>
                        <div style="font-size: 11px; margin: 3px 0; color: #bbb; line-height: 1.3;">
                          \${[loc.city, loc.state, loc.country].filter(Boolean).join(', ') || 'Location details unavailable'}
                        </div>
                        <div style="
                          display: flex; 
                          justify-content: space-between; 
                          align-items: center; 
                          margin-top: 8px;
                          padding-top: 6px;
                          border-top: 1px solid rgba(250, 204, 21, 0.3);
                        ">
                          <span style="
                            font-size: 10px; 
                            color: \${loc.status === 'active' || loc.status === 'Online' ? '#22c55e' : '#ef4444'};
                            font-weight: 600;
                            \${loc.status === 'active' || loc.status === 'Online' ? 'text-shadow: 0 0 6px #22c55e;' : ''}
                          ">\${loc.status || 'Online'}</span>
                          <span style="
                            font-size: 9px; 
                            color: \${isShyHQ ? '#FFD700' : '#FACC15'}; 
                            opacity: 0.8;
                          ">\${isShyHQ ? 'HQ' : '50m zone'}</span>
                        </div>
                      </div>
                    \`
                  });

                  // Simple tooltip for hover (just location name)
                  const tooltip = new google.maps.InfoWindow({
                    content: \`<div style="
                      padding: 4px 8px;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                      font-size: 12px;
                      font-weight: 500;
                      color: #333;
                      background: rgba(255,255,255,0.95);
                      border-radius: 4px;
                      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    ">\${loc.name}</div>\`,
                    disableAutoPan: true
                  });
                  
                  // Click to zoom functionality and show full info
                  marker.addListener('click', () => {
                    // Close any open tooltips
                    if (window.currentTooltip) {
                      window.currentTooltip.close();
                    }
                    
                    // Close any other open info windows
                    infoWindows.forEach(iw => iw.close());
                    
                    // Zoom to location and show info
                    zoomToLocation(loc.lat, loc.lng, loc.name);
                    infoWindow.open(map, marker);
                    
                    // Track the current info window and that we're zoomed to a location
                    window.currentInfoWindow = infoWindow;
                    window.isZoomedToLocation = true;
                    
                    // Send location data to parent window for form population
                    if (window.parent) {
                      window.parent.postMessage({
                        type: 'POPULATE_LOCATION_FORM',
                        location: {
                          id: loc.id,
                          name: loc.name,
                          lat: loc.lat,
                          lng: loc.lng,
                          city: loc.city,
                          state: loc.state,
                          country: loc.country,
                          status: loc.status
                        }
                      }, '*');
                    }
                  });
                  
                  // Show name tooltip on hover
                  marker.addListener('mouseover', () => {
                    // Close any other tooltips
                    if (window.currentTooltip) {
                      window.currentTooltip.close();
                    }
                    
                    tooltip.open(map, marker);
                    window.currentTooltip = tooltip;
                  });

                  // Hide tooltip on mouse out
                  marker.addListener('mouseout', () => {
                    tooltip.close();
                  });
                  
                  markers.push(marker);
                  markers.push(innerCircle);
                  markers.push(outerCircle);
                  infoWindows.push(infoWindow);
                  bounds.extend(position);
                }
              });
              
              // Marketing map: Keep default Americas view (don't auto-fit to all locations)
              // The map stays at the initial center (39.8283, -98.5795) and zoom (3)
              // This ensures Mexico, US, and Canada are always visible regardless of marker locations
              
            }).catch(console.error);
          }
          
          // Function to zoom to a specific location
          function zoomToLocation(lat, lng, locationName) {
            map.panTo({lat: parseFloat(lat), lng: parseFloat(lng)});
            map.setZoom(16);
            
            // Add a subtle bounce effect
            setTimeout(() => {
              map.setZoom(15);
              setTimeout(() => {
                map.setZoom(16);
              }, 300);
            }, 500);
          }
          
          // Make zoomToLocation globally accessible
          window.zoomToLocation = zoomToLocation;
          
          function createGlowingDot() {
            const dot = document.createElement('div');
            dot.className = 'shy-glow-dot';
            return dot;
          }
          
          // Hide remaining Google UI after load
          setTimeout(() => {
            document.querySelectorAll('.gmnoprint,.gm-style-cc,.gm-bundled-control,.gm-fullscreen-control,.gm-svpc,.gm-control-active,a[href*="google.com"]').forEach(el => {
              el.style.display = 'none';
              el.remove();
            });
          }, 2000);
          
          // Reset View function - return to default Americas view
          function revertToLocations() {
            // Always reset to Americas view (center on US, show down to Guatemala)
            map.setCenter({lat: 39.8283, lng: -98.5795});
            map.setZoom(4);
          }
          
          // Ensure map initializes even if callback doesn't work
          document.addEventListener('DOMContentLoaded', function() {
            if (typeof google !== 'undefined' && google.maps && !map) {
              console.log('Manual map initialization...');
              initMap();
            }
          });
          
          // Also try initialization after a delay
          setTimeout(function() {
            if (typeof google !== 'undefined' && google.maps && !map) {
              console.log('Delayed map initialization...');
              initMap();
            }
          }, 1000);
          
          window.initMap = initMap;
          window.revertToLocations = revertToLocations;
        ` : `
          document.getElementById('map').innerHTML = 'Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY';
          document.body.style.display = 'grid';
          document.body.style.placeItems = 'center';
          document.body.style.font = '14px system-ui';
          document.body.style.color = '#fff';
        `}
      })();
    </script></body></html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
