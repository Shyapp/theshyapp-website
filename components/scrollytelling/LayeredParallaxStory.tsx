'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// CINEMATIC FOCUS PULL EFFECT - Each scene has unique dramatic motion
const SCENE_CONFIGS = {
  // Scene 1: Wide Shot - Far background barely moves, foreground fast = PARALLAX DEPTH
  discovery: { 
    layers: [
      { num: 2, x: 0, y: -20, scale: 1, opacity: 1, rotation: 0 },      // Far back - almost static
      { num: 3, x: 50, y: -40, scale: 1.05, opacity: 1, rotation: 0 },  // Slow pan right
      { num: 5, x: 100, y: -60, scale: 1.1, opacity: 1, rotation: 0 },  
      { num: 8, x: -150, y: -80, scale: 1.15, opacity: 1, rotation: 0 }, // Foreground - fast left
      { num: 9, x: -200, y: -100, scale: 1.2, opacity: 1, rotation: 0 },
      { num: 13, x: -250, y: -120, scale: 1.25, opacity: 1, rotation: 0 },
      { num: 15, x: -300, y: -140, scale: 1.3, opacity: 1, rotation: 0 },
    ]
  },
  
  // Scene 2: ZOOM IN - Layers scale up dramatically toward camera
  venue: { 
    layers: [
      { num: 16, x: 0, y: 0, scale: 1.8, opacity: 1, rotation: 0 },     // Zoom forward
      { num: 18, x: 0, y: 0, scale: 1.9, opacity: 1, rotation: 0 },
      { num: 20, x: 0, y: 0, scale: 2.0, opacity: 1, rotation: 0 },
      { num: 22, x: 0, y: -50, scale: 2.1, opacity: 1, rotation: 0 },   // Coming at you
      { num: 24, x: 0, y: -80, scale: 2.3, opacity: 1, rotation: 0 },
      { num: 26, x: 0, y: -100, scale: 2.5, opacity: 1, rotation: 0 },  // BOOM close
      { num: 28, x: 0, y: -120, scale: 2.7, opacity: 1, rotation: 0 },
      { num: 30, x: 0, y: -150, scale: 3.0, opacity: 1, rotation: 0 },  // Closest
    ]
  },
  
  // Scene 3: SLIDE IN - Characters enter from left AND right
  arrival: { 
    layers: [
      { num: 31, x: -400, y: 0, scale: 1.2, opacity: 1, rotation: -5 },  // From left
      { num: 33, x: -300, y: 0, scale: 1.3, opacity: 1, rotation: -3 },
      { num: 35, x: -200, y: 0, scale: 1.4, opacity: 1, rotation: 0 },
      { num: 37, x: 400, y: 0, scale: 1.2, opacity: 1, rotation: 5 },    // From right
      { num: 39, x: 300, y: 0, scale: 1.3, opacity: 1, rotation: 3 },
      { num: 41, x: 200, y: 0, scale: 1.4, opacity: 1, rotation: 0 },
      { num: 43, x: 0, y: 0, scale: 1.5, opacity: 1, rotation: 0 },      // Center meet
      { num: 45, x: 0, y: 0, scale: 1.6, opacity: 1, rotation: 0 },
    ]
  },
  
  // Scene 4: POP & SPIN - UI elements burst forward with rotation
  connect: { 
    layers: [
      { num: 46, x: 0, y: 0, scale: 2.0, opacity: 1, rotation: 360 },    // Spin in
      { num: 48, x: 0, y: 0, scale: 2.2, opacity: 1, rotation: -360 },
      { num: 50, x: 0, y: -50, scale: 2.4, opacity: 1, rotation: 180 },
      { num: 52, x: 0, y: -80, scale: 2.6, opacity: 1, rotation: -180 },
      { num: 54, x: 0, y: -100, scale: 2.8, opacity: 1, rotation: 90 },
      { num: 56, x: 0, y: -120, scale: 3.0, opacity: 1, rotation: -90 },
      { num: 58, x: 0, y: -150, scale: 3.2, opacity: 1, rotation: 45 },
      { num: 60, x: 0, y: -180, scale: 3.5, opacity: 1, rotation: 0 },   // Final pop
    ]
  },
  
  // Scene 5: FLOAT UP - Messages rise like bubbles
  converse: { 
    layers: [
      { num: 61, x: -50, y: -300, scale: 1.3, opacity: 1, rotation: 0 },
      { num: 63, x: 50, y: -350, scale: 1.4, opacity: 1, rotation: 0 },
      { num: 65, x: -30, y: -400, scale: 1.5, opacity: 1, rotation: 0 },
      { num: 67, x: 30, y: -450, scale: 1.6, opacity: 1, rotation: 0 },
      { num: 69, x: 0, y: -500, scale: 1.7, opacity: 1, rotation: 0 },
      { num: 71, x: 0, y: -550, scale: 1.8, opacity: 1, rotation: 0 },
      { num: 73, x: 0, y: -600, scale: 1.9, opacity: 1, rotation: 0 },
      { num: 75, x: 0, y: -650, scale: 2.0, opacity: 1, rotation: 0 },
    ]
  },
  
  // Scene 6: EXPLODE - Everything bursts forward together (starburst)
  community: { 
    layers: [
      { num: 76, x: 0, y: 0, scale: 4.0, opacity: 1, rotation: 0 },
      { num: 78, x: 0, y: 0, scale: 4.2, opacity: 1, rotation: 0 },
      { num: 80, x: 0, y: 0, scale: 4.5, opacity: 1, rotation: 0 },
      { num: 82, x: 0, y: 0, scale: 5.0, opacity: 1, rotation: 0 },
      { num: 84, x: 0, y: 0, scale: 5.5, opacity: 1, rotation: 0 },
      { num: 86, x: 0, y: 0, scale: 6.0, opacity: 1, rotation: 0 },
      { num: 88, x: 0, y: 0, scale: 7.0, opacity: 1, rotation: 0 },    // MASSIVE
    ]
  },
};

type SceneName = keyof typeof SCENE_CONFIGS;

type Props = {
  sceneName: SceneName;
  height?: number;
  children?: React.ReactNode;
};

export default function LayeredParallaxStory({ 
  sceneName,
  height = 300,
  children 
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<Map<number, HTMLDivElement>>(new Map());
  
  const config = SCENE_CONFIGS[sceneName];

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Pin the scene
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: `+=${height}%`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
      });

      if (!prefersReducedMotion) {
        // Sequential reveal - each layer shows one after another, never overlapping
        const totalLayers = config.layers.length;
        
        config.layers.forEach((layerConfig, index) => {
          const layer = layersRef.current.get(layerConfig.num);
          if (!layer) return;

          // Calculate when this layer should appear (divided into segments)
          const segmentDuration = height / totalLayers;
          const startPercent = (index / totalLayers) * 100;
          const endPercent = ((index + 1) / totalLayers) * 100;
          const fadeOutPercent = endPercent + 5; // Fade out quickly after

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: `+=${height}%`,
              scrub: 1,
            },
          });

          // Phase 1: Hidden before its turn
          timeline.set(layer, { 
            opacity: 0, 
            x: 0, 
            y: 0, 
            scale: 0.8, 
            rotation: 0 
          }, 0);

          // Phase 2: Fade IN and animate (only during its segment)
          timeline.to(layer, {
            opacity: 1,
            x: layerConfig.x,
            y: layerConfig.y,
            scale: layerConfig.scale,
            rotation: layerConfig.rotation,
            ease: 'power2.out',
            duration: 0.3,
          }, startPercent / 100);

          // Phase 3: Hold visible
          timeline.to(layer, {
            opacity: 1,
            duration: 0.4,
          }, (startPercent + 30) / 100);

          // Phase 4: Fade OUT before next layer appears
          timeline.to(layer, {
            opacity: 0,
            duration: 0.2,
          }, (endPercent - 5) / 100);
        });

        // Content fade
        gsap.fromTo('.parallax-content',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: '+=20%',
              scrub: 1,
            },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [sceneName, height, config]);

  return (
    <div 
      ref={rootRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        {config.layers.map((layerConfig, index) => (
          <div
            key={layerConfig.num}
            ref={(el) => {
              if (el) layersRef.current.set(layerConfig.num, el);
            }}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: index }}
          >
            <img
              src={`/story/layers/layer${layerConfig.num}.png`}
              alt={`Layer ${layerConfig.num}`}
              className="w-full h-full object-cover"
              loading={index < 3 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="parallax-content relative z-50 flex items-center justify-center h-full px-6">
        <div className="max-w-4xl text-center">
          {children}
        </div>
      </div>

      {/* Dark vignette */}
      <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-radial from-transparent via-transparent to-black/60" />
    </div>
  );
}
