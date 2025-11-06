import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '@/lib/scrollytelling/gsap-scroll';

type Props = {
  id: string;
  bg: string;
  poster: string;
  fg?: string;
  children?: React.ReactNode;
  reduced?: boolean;
  midSilhouetteSrc?: string;
};

export function ScrollytellingSceneGSAP({ 
  id, bg, poster, fg, children, reduced = false, midSilhouetteSrc 
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    // Parallax background layer
    if (bgRef.current) {
      ScrollTrigger.create({
        element: bgRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        from: { transform: 'translateY(0px)' },
        to: { transform: 'translateY(-80px)' },
      });
    }

    // Mid silhouette layer (faster parallax)
    if (midRef.current) {
      ScrollTrigger.create({
        element: midRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        from: { transform: 'translateY(0px)', opacity: '0' },
        to: { transform: 'translateY(-120px)', opacity: '0.12' },
      });
    }

    // Foreground layer (fastest parallax)
    if (fgRef.current) {
      ScrollTrigger.create({
        element: fgRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        from: { transform: 'translateY(0px)' },
        to: { transform: 'translateY(-200px)' },
      });
    }

    return () => ScrollTrigger.destroy();
  }, [reduced]);

  return (
    <section ref={sectionRef} id={id} className="relative h-screen overflow-hidden bg-black">
      {/* Background video layer */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          src={bg}
        />
      </div>

      {/* Optional mid silhouette */}
      {midSilhouetteSrc && (
        <div ref={midRef} className="absolute inset-0 will-change-transform">
          <img
            src={midSilhouetteSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}

      {/* Foreground keyed motion (optional) */}
      {fg && (
        <div ref={fgRef} className="absolute inset-0 will-change-transform">
          <video
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            autoPlay
            muted
            loop
            playsInline
            src={fg}
          />
        </div>
      )}

      {/* UI overlay / text */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20">
        {children}
      </div>

      {/* Contrast overlay for text */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
    </section>
  );
}
