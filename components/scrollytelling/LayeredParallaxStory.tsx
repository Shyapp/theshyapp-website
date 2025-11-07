'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Story structure: 82 layers organized into narrative chapters
const STORY_CHAPTERS = {
  // Chapter 1: Urban Discovery (layers 2-15) - City background, buildings, streets
  urbanDiscovery: { start: 2, end: 15, depth: 'far', speed: 0.3 },
  
  // Chapter 2: The Venue (layers 16-30) - Coffee shop/location interior
  theVenue: { start: 16, end: 30, depth: 'mid-far', speed: 0.5 },
  
  // Chapter 3: People Arriving (layers 31-45) - Silhouettes, characters entering
  peopleArriving: { start: 31, end: 45, depth: 'mid', speed: 0.7 },
  
  // Chapter 4: Connection Spark (layers 46-60) - UI elements, notifications, interactions
  connectionSpark: { start: 46, end: 60, depth: 'mid-close', speed: 0.9 },
  
  // Chapter 5: Conversation Flow (layers 61-75) - Chat bubbles, messages, expressions
  conversationFlow: { start: 61, end: 75, depth: 'close', speed: 1.1 },
  
  // Chapter 6: Community (layers 76-89) - Multiple connections, network effect
  community: { start: 76, end: 89, depth: 'closest', speed: 1.3 },
};

type Props = {
  sceneName?: string;
  height?: number;
  children?: React.ReactNode;
};

export default function LayeredParallaxStory({ 
  sceneName = 'full-story',
  height = 600,
  children 
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Pin the entire scene
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: `+=${height}%`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
      });

      if (!prefersReducedMotion) {
        // Animate each chapter with unique timing and effects
        Object.entries(STORY_CHAPTERS).forEach(([chapterName, config]) => {
          const { start, end, speed } = config;
          
          for (let i = start; i <= end; i++) {
            const layer = layersRef.current[i - 2];
            if (!layer) continue;

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: rootRef.current,
                start: 'top top',
                end: `+=${height}%`,
                scrub: 1,
              },
            });

            // Calculate unique movement based on layer position in chapter
            const progressInChapter = (i - start) / (end - start);
            const yMovement = -150 * speed * (1 + progressInChapter * 0.5);
            const xMovement = Math.sin(progressInChapter * Math.PI) * 30 * speed;
            const scaleAmount = 1 + (progressInChapter * 0.2);
            const rotateAmount = (progressInChapter - 0.5) * 2 * speed;

            // Chapter-specific effects
            if (chapterName === 'urbanDiscovery') {
              // Far background - slow drift
              timeline.fromTo(layer, 
                { y: 0, opacity: 0.6, scale: 1 },
                { y: yMovement, opacity: 1, scale: 1.05, ease: 'none' }
              );
            } else if (chapterName === 'theVenue') {
              // Venue reveals - fade in with scale
              timeline.fromTo(layer,
                { y: 50, opacity: 0, scale: 0.95 },
                { y: yMovement, opacity: 1, scale: scaleAmount, ease: 'none' }
              );
            } else if (chapterName === 'peopleArriving') {
              // Characters - slide in from sides
              const fromSide = i % 2 === 0 ? -100 : 100;
              timeline.fromTo(layer,
                { x: fromSide, y: 0, opacity: 0, scale: 0.9 },
                { x: xMovement, y: yMovement, opacity: 1, scale: 1, ease: 'none' }
              );
            } else if (chapterName === 'connectionSpark') {
              // UI elements - pop in with rotation
              timeline.fromTo(layer,
                { y: 30, opacity: 0, scale: 0.8, rotation: -15 },
                { y: yMovement, opacity: 1, scale: scaleAmount, rotation: rotateAmount, ease: 'none' }
              );
            } else if (chapterName === 'conversationFlow') {
              // Messages - float up
              timeline.fromTo(layer,
                { y: 100, opacity: 0, scale: 0.9 },
                { y: yMovement - 50, opacity: 1, scale: 1.1, ease: 'none' }
              );
            } else if (chapterName === 'community') {
              // Network - expand outward
              timeline.fromTo(layer,
                { scale: 0.7, opacity: 0, rotation: -30 },
                { scale: scaleAmount * 1.2, opacity: 1, rotation: rotateAmount * 2, ease: 'none' }
              );
            }
          }
        });

        // Content fade-in
        gsap.fromTo('.story-content',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: '+=30%',
              scrub: 1,
            },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [height]);

  // Generate all layers (2-89, total 82 layers)
  const renderLayers = () => {
    const layers = [];
    
    for (let i = 2; i <= 89; i++) {
      // Determine z-index based on chapter (later chapters = closer = higher z)
      let zIndex = i;
      let chapter = '';
      
      Object.entries(STORY_CHAPTERS).forEach(([name, config]) => {
        if (i >= config.start && i <= config.end) {
          chapter = name;
        }
      });

      layers.push(
        <img
          key={`layer-${i}`}
          ref={(el) => { layersRef.current[i - 2] = el; }}
          src={`/story/layers/layer${i}.png`}
          alt={`Story layer ${i} - ${chapter}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ 
            zIndex,
            willChange: 'transform, opacity',
          }}
          loading={i <= 30 ? 'eager' : 'lazy'}
        />
      );
    }
    
    return layers;
  };

  return (
    <div 
      ref={rootRef}
      className="relative w-full h-screen overflow-hidden bg-black"
      style={{ height: '100vh' }}
    >
      {/* All parallax layers */}
      <div className="absolute inset-0">
        {renderLayers()}
      </div>

      {/* Content overlay */}
      <div className="story-content relative z-[100] flex items-center justify-center h-full px-6">
        <div className="max-w-4xl text-center">
          {children}
        </div>
      </div>

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-[90]"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
        }}
      />
    </div>
  );
}
