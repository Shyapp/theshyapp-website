'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Scene configurations - only load specific layers for each scene for better performance
const SCENE_CONFIGS = {
  discovery: { 
    layers: [2, 3, 4, 5, 8, 9, 13, 15],
    speeds: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
  },
  venue: { 
    layers: [16, 17, 18, 19, 20, 22, 24, 26, 28, 30],
    speeds: [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2]
  },
  arrival: { 
    layers: [31, 33, 35, 37, 39, 41, 43, 45],
    speeds: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1]
  },
  connect: { 
    layers: [46, 48, 50, 52, 54, 56, 58, 60],
    speeds: [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2]
  },
  converse: { 
    layers: [61, 63, 65, 67, 69, 71, 73, 75],
    speeds: [0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3]
  },
  community: { 
    layers: [76, 78, 80, 82, 84, 86, 88],
    speeds: [0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3]
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
        // Animate each layer with its own speed
        config.layers.forEach((layerNum, index) => {
          const layer = layersRef.current.get(layerNum);
          if (!layer) return;

          const speed = config.speeds[index] || 1;
          const yMove = -100 * speed;

          gsap.fromTo(layer,
            { 
              y: 0,
              opacity: 0,
              scale: 0.95 
            },
            {
              y: yMove,
              opacity: 1,
              scale: 1 + (speed * 0.05),
              ease: 'none',
              scrollTrigger: {
                trigger: rootRef.current,
                start: 'top top',
                end: `+=${height}%`,
                scrub: 1,
              },
            }
          );
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
        {config.layers.map((layerNum, index) => (
          <div
            key={layerNum}
            ref={(el) => {
              if (el) layersRef.current.set(layerNum, el);
            }}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: index }}
          >
            <img
              src={`/story/layers/layer${layerNum}.png`}
              alt={`Layer ${layerNum}`}
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
