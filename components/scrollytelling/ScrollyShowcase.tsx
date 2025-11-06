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
  posterSrc: string;
  midSilhouetteSrc?: string; // optional
  fgSrc?: string;            // optional keyed webm
  height?: number;           // scene height in vh (default 120)
  pulsePosition?: { left: string; top: string }; // position of amber pulse
  children?: React.ReactNode;
  enableSweep?: boolean;     // default true
  enablePulse?: boolean;     // default true
  enableVignette?: boolean;  // default true
};

export default function ScrollyShowcase({ 
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
  enableVignette = true
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLVideoElement>(null);
  const fg = useRef<HTMLVideoElement>(null);
  const sweep = useRef<HTMLDivElement>(null);
  const pulse = useRef<SVGCircleElement>(null);
  const mid = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || !root.current) {
      // Pin section but skip animations
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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=200%',
        scrub: 0.5,
        pin: true,
      }
    });

    // Scroll-scrub the background video time (0 → 8s)
    if (bg.current) {
      const video = bg.current;
      
      const scrubVideo = () => {
        const targetDuration = Math.min(video.duration || 8, 8); // cap at 8s
        tl.to(video, { currentTime: targetDuration, ease: 'none' }, 0);
      };

      if (video.readyState >= 1) {
        scrubVideo();
      } else {
        video.addEventListener('loadedmetadata', scrubVideo, { once: true });
      }
    }

    // Diagonal sweep reveal (shock micro-moment)
    if (enableSweep && sweep.current) {
      tl.fromTo(sweep.current, 
        { xPercent: -40, rotate: 18, opacity: 0.0 },
        { xPercent: 40, rotate: 18, opacity: 0.18, duration: 0.25, ease: 'power2' }, 
        0.12
      );
      tl.to(sweep.current, { opacity: 0, duration: 0.15 }, '>-0.05');
    }

    // Mid silhouette depth (parallax)
    if (mid.current) {
      tl.fromTo(mid.current, 
        { yPercent: -6, opacity: 0.06 }, 
        { yPercent: -12, opacity: 0.12, ease: 'none' }, 
        0
      );
    }

    // Foreground keyed layer punch-in (0% → 100% opacity + z-parallax)
    if (fg.current) {
      tl.fromTo(fg.current, 
        { opacity: 0, yPercent: 6, scale: 0.98 },
        { opacity: 1, yPercent: -2, scale: 1, ease: 'power1' }, 
        0.08
      );
    }

    // Amber pulse ring (120ms shock stinger)
    if (enablePulse && pulse.current) {
      const p = pulse.current;
      tl.fromTo(p, 
        { attr: { r: 0 }, opacity: 0.9 }, 
        { attr: { r: 240 }, opacity: 0, duration: 0.24, ease: 'power2.out' }, 
        0.16
      );
    }

    return () => {
      tl.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [enableSweep, enablePulse, enableVignette]);

  return (
    <section 
      id={id} 
      ref={root} 
      className="relative w-full overflow-hidden" 
      style={{ height: `${height}vh`, background: '#000' }}
    >
      {/* BG video */}
      <video 
        ref={bg} 
        className="absolute inset-0 w-full h-full object-cover"
        src={bgSrc} 
        poster={posterSrc} 
        playsInline 
        muted 
        preload="auto"
        aria-hidden="true"
      />

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

      {/* Mid-layer silhouette (optional) */}
      {midSilhouetteSrc && (
        <img 
          ref={mid}
          src={midSilhouetteSrc} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          style={{ willChange: 'transform, opacity' }}
        />
      )}

      {/* FG keyed (optional) */}
      {fgSrc && (
        <video 
          ref={fg} 
          className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
          src={fgSrc} 
          playsInline 
          muted 
          loop
          autoPlay
          aria-hidden="true"
          style={{ willChange: 'transform, opacity' }}
        />
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

      {/* Vignette mask for safety */}
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
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24">
        {children || (
          <>
            <h1 className="text-white text-6xl font-extrabold">Only here. Only now.</h1>
            <p className="text-white/80 mt-3 max-w-xl">Shy shows people in this room—usernames + About Me. Nothing else.</p>
          </>
        )}
      </div>
    </section>
  );
}
