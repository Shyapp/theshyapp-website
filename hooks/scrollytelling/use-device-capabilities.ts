import { useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';
type ConnectionType = 'slow-2g' | '2g' | '3g' | '4g' | 'unknown';

/**
 * Hook to detect device capabilities and optimize parallax accordingly
 */
export function useDeviceCapabilities() {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [connectionSpeed, setConnectionSpeed] = useState<ConnectionType>('unknown');
  const [shouldReduceEffects, setShouldReduceEffects] = useState(false);

  useEffect(() => {
    // Detect device type
    const width = window.innerWidth;
    if (width < 768) {
      setDeviceType('mobile');
    } else if (width < 1024) {
      setDeviceType('tablet');
    } else {
      setDeviceType('desktop');
    }

    // Detect connection speed
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      const effectiveType = connection.effectiveType as ConnectionType;
      setConnectionSpeed(effectiveType);
      
      // Reduce effects on slow connections
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        setShouldReduceEffects(true);
      }
    }

    // Detect low-end devices (< 4GB RAM or slow CPU)
    if ('deviceMemory' in navigator) {
      const memory = (navigator as any).deviceMemory;
      if (memory < 4) {
        setShouldReduceEffects(true);
      }
    }

    // Detect battery saver mode
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        if (battery.level < 0.2 && !battery.charging) {
          setShouldReduceEffects(true);
        }
      });
    }
  }, []);

  return {
    deviceType,
    connectionSpeed,
    shouldReduceEffects,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    hasSlowConnection: connectionSpeed === 'slow-2g' || connectionSpeed === '2g',
  };
}

/**
 * Hook to provide adaptive video quality based on device
 */
export function useAdaptiveVideoQuality() {
  const { deviceType, hasSlowConnection, shouldReduceEffects } = useDeviceCapabilities();

  const getVideoSrc = (basePath: string): string => {
    // Return lower quality on mobile or slow connections
    if (shouldReduceEffects || hasSlowConnection) {
      return basePath.replace('.webm', '-low.webm');
    }
    
    if (deviceType === 'mobile') {
      return basePath.replace('.webm', '-mobile.webm');
    }

    return basePath; // Full quality for desktop
  };

  const shouldPlayVideo = !shouldReduceEffects;
  const shouldUseParallax = deviceType !== 'mobile' && !shouldReduceEffects;

  return {
    getVideoSrc,
    shouldPlayVideo,
    shouldUseParallax,
  };
}
