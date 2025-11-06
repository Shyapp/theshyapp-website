import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '@/lib/scrollytelling/gsap-scroll';

type Props = {
  id: string;
  bgColor: string; // Tailwind gradient classes
  children?: React.ReactNode;
  reduced?: boolean;
  midSilhouetteSrc?: string;
};

export function ScrollytellingSceneDemo({ 
  id, bgColor, children, reduced = false, midSilhouetteSrc 
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    // Parallax background layer (slowest)
    if (bgRef.current) {
      ScrollTrigger.create({
        element: bgRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        from: { transform: 'translateY(0px) scale(1)' },
        to: { transform: 'translateY(-80px) scale(1.1)' },
      });
    }

    // Mid silhouette layer (medium speed)
    if (midRef.current) {
      ScrollTrigger.create({
        element: midRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        from: { transform: 'translateY(0px)', opacity: '0' },
        to: { transform: 'translateY(-120px)', opacity: '0.15' },
      });
    }

    // Content fade-in on scroll
    if (contentRef.current) {
      ScrollTrigger.create({
        element: contentRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
        from: { opacity: '0', transform: 'translateY(40px)' },
        to: { opacity: '1', transform: 'translateY(0px)' },
      });
    }

    return () => ScrollTrigger.destroy();
  }, [reduced]);

  return (
    <section 
      ref={sectionRef} 
      id={id} 
      className="relative h-screen overflow-hidden"
    >
      {/* Background gradient layer */}
      <div 
        ref={bgRef} 
        className={`absolute inset-0 will-change-transform bg-gradient-to-br ${bgColor}`}
      >
        {/* Animated grain texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Optional mid silhouette */}
      {midSilhouetteSrc && (
        <div ref={midRef} className="absolute inset-0 will-change-transform pointer-events-none">
          <img
            src={midSilhouetteSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            style={{ filter: 'brightness(0.4) contrast(1.2)' }}
          />
        </div>
      )}

      {/* Contrast overlay for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

      {/* UI overlay / text */}
      <div 
        ref={contentRef}
        className="relative z-10 h-full flex items-center justify-center px-6"
      >
        <div className="w-full max-w-6xl">
          {children}
        </div>
      </div>
    </section>
  );
}
