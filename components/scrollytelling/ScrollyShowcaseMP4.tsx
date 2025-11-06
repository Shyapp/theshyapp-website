'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  id: string;
  bgSrc: string;
  posterSrc?: string;
  midSilhouetteSrc?: string;
  fgSrc?: string;
  height?: number;
  pulsePosition?: { left: string; top: string };
  children?: React.ReactNode;
  enableSweep?: boolean;
  enablePulse?: boolean;
  enableVignette?: boolean;
  useFallback?: boolean; // Use gradient if video fails to load
  fallbackGradient?: string;
};

export default function ScrollyShowcaseMP4({ 
  id, 
  bgSrc, 
  posterSrc,
  midSilhouetteSrc, 
  fgSrc, 
  height = 120,
  pulsePosition = { left: '36vw', top: '58vh' },
  children,
  enableSweep = true,
  enablePulse = true,
  enableVignette = true,
  useFallback = true,
  fallbackGradient = 'from-purple-900 via-purple-800 to-black'
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLVideoElement>(null);
  const fg = useRef<HTMLVideoElement>(null);
  const sweep = useRef<HTMLDivElement>(null);
  const pulse = useRef<SVGCircleElement>(null);
  const mid = useRef<HTMLImageElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || !root.current) {
      if (root.current) {
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
        });
      }
      return;
    }

    const el = root.current;
    
    // Main timeline with smooth scrubbing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=300%', // Longer scroll for smoother effect
        scrub: 1, // Smoother scrubbing (0.5 was too fast)
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Scroll-scrub the background video time (0 → 8s)
    if (bg.current) {
      const video = bg.current;
      video.pause(); // Ensure video is paused for scrubbing
      
      const scrubVideo = () => {
        const targetDuration = Math.min(video.duration || 8, 8);
        // Smoother video scrubbing
        tl.to(video, { 
          currentTime: targetDuration, 
          ease: 'none',
          duration: 1 
        }, 0);
      };

      if (video.readyState >= 1) {
        scrubVideo();
      } else {
        video.addEventListener('loadedmetadata', scrubVideo, { once: true });
      }
      
      // Show fallback if video fails to load
      if (useFallback) {
        video.addEventListener('error', () => {
          if (fallbackRef.current) {
            fallbackRef.current.style.display = 'block';
          }
          if (bg.current) {
            bg.current.style.display = 'none';
          }
        }, { once: true });
      }
    }

    // Content fade-in and slide up (smooth entrance)
    if (el.querySelector('.scene-content')) {
      tl.fromTo('.scene-content', 
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.1
      );
    }

    // Diagonal sweep reveal (faster, more dramatic)
    if (enableSweep && sweep.current) {
      tl.fromTo(sweep.current, 
        { xPercent: -50, rotate: 18, opacity: 0.0 },
        { xPercent: 50, rotate: 18, opacity: 0.25, duration: 0.3, ease: 'power2.inOut' }, 
        0.15
      );
      tl.to(sweep.current, { opacity: 0, duration: 0.2, ease: 'power2.out' }, '>-0.1');
    }

    // Mid silhouette depth (enhanced parallax)
    if (mid.current) {
      tl.fromTo(mid.current, 
        { yPercent: 0, opacity: 0.08, scale: 1.05 }, 
        { yPercent: -15, opacity: 0.15, scale: 1, ease: 'none', duration: 1 }, 
        0
      );
    }

    // Foreground keyed layer punch-in (smoother)
    if (fg.current) {
      tl.fromTo(fg.current, 
        { opacity: 0, yPercent: 8, scale: 0.96 },
        { opacity: 1, yPercent: -4, scale: 1.02, ease: 'power2.out', duration: 0.6 }, 
        0.2
      );
    }

    // Amber pulse ring (multiple pulses for more impact)
    if (enablePulse && pulse.current) {
      const p = pulse.current;
      // First pulse
      tl.fromTo(p, 
        { attr: { r: 0 }, opacity: 1 }, 
        { attr: { r: 280 }, opacity: 0, duration: 0.5, ease: 'power2.out' }, 
        0.2
      );
      // Second pulse (delayed)
      tl.fromTo(p, 
        { attr: { r: 0 }, opacity: 0.6 }, 
        { attr: { r: 320 }, opacity: 0, duration: 0.6, ease: 'power2.out' }, 
        0.5
      );
    }

    return () => {
      tl.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [enableSweep, enablePulse, enableVignette, useFallback]);

  return (
    <section 
      id={id} 
      ref={root} 
      className="relative w-full overflow-hidden" 
      style={{ height: `${height}vh`, background: '#000' }}
    >
      {/* Fallback gradient background */}
      {useFallback && (
        <div 
          ref={fallbackRef}
          className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient}`}
          style={{ display: 'none' }}
        >
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
        </div>
      )}

      {/* BG video */}
      <video 
        ref={bg} 
        className="absolute inset-0 w-full h-full object-cover"
        poster={posterSrc}
        playsInline 
        muted 
        preload="auto"
        aria-hidden="true"
      >
        <source src={bgSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Diagonal light sweep */}
      {enableSweep && (
        <div 
          ref={sweep}
          className="pointer-events-none absolute -top-24 left-0 h-[220px] w-[160vw]"
          style={{ 
            background: 'linear-gradient(90deg, rgba(251,191,36,0) 0%, rgba(252,211,77,0.25) 50%, rgba(251,191,36,0) 100%)',
            willChange: 'transform, opacity'
          }} 
        />
      )}

      {/* Mid-layer silhouette */}
      {midSilhouetteSrc && (
        <img 
          ref={mid}
          src={midSilhouetteSrc} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          style={{ willChange: 'transform, opacity' }}
        />
      )}

      {/* FG keyed video */}
      {fgSrc && (
        <video 
          ref={fg} 
          className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
          playsInline 
          muted 
          loop
          autoPlay
          aria-hidden="true"
          style={{ willChange: 'transform, opacity' }}
        >
          <source src={fgSrc} type="video/mp4" />
        </video>
      )}

      {/* Amber pulse ring */}
      {enablePulse && (
        <svg 
          className="absolute pointer-events-none" 
          width="600" 
          height="600" 
          style={{ 
            left: pulsePosition.left, 
            top: pulsePosition.top,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <circle ref={pulse} cx="300" cy="300" r="0" fill="none" stroke="#FBBF24" strokeWidth="3" />
        </svg>
      )}

      {/* Vignette mask */}
      {enableVignette && (
        <div className="pointer-events-none absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id={`vignette-${id}`} cx="50%" cy="50%" r="75%">
                <stop offset="0%" style={{ stopColor: 'rgb(0,0,0)', stopOpacity: 0 }} />
                <stop offset="50%" style={{ stopColor: 'rgb(0,0,0)', stopOpacity: 0.15 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(0,0,0)', stopOpacity: 0.5 }} />
              </radialGradient>
            </defs>
            <rect width="1920" height="1080" fill={`url(#vignette-${id})`} />
          </svg>
        </div>
      )}

      {/* Contrast gradient for legible copy */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"/>

      {/* UI / copy slot */}
      <div className="scene-content relative z-10 h-full flex items-center justify-center px-6">
        <div className="w-full max-w-6xl">
          {children}
        </div>
      </div>
    </section>
  );
}
