'use client';

import ScrollyShowcase from '@/components/scrollytelling/ScrollyShowcase';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function StoriesShowcase() {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Kinetic numeric counter example (for Scene 2)
    if (counterRef.current) {
      gsap.fromTo(counterRef.current, 
        { innerText: 0 },
        { 
          innerText: 3, 
          duration: 1.2, 
          ease: 'back.out(1.4)',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: '#mechanic',
            start: 'top center',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <div className="bg-black">
      {/* Scene 1 — Hook: Diagonal sweep + scroll-scrubbed city loop */}
      <ScrollyShowcase
        id="hook"
        bgSrc="/story/hook/bg_city.webm"
        posterSrc="/story/hook/poster.avif"
        midSilhouetteSrc="/svg/parallax-story/mid_venue-cafe.svg"
        pulsePosition={{ left: '42vw', top: '55vh' }}
        height={120}
      >
        <h1 className="text-white text-5xl md:text-7xl font-extrabold leading-tight">
          You're already in<br />the same room.
        </h1>
        <p className="text-white/80 mt-4 max-w-xl text-lg">
          Shy shows only people here now—just usernames and About Me.
        </p>
        <div className="mt-8">
          <object
            data="/svg/parallax-story/chip-tabs.svg"
            type="image/svg+xml"
            className="w-[520px] h-[52px]"
            aria-label="Location filter chips"
          />
        </div>
      </ScrollyShowcase>

      {/* Scene 2 — Mechanic: Masked diagonal reveal for UI */}
      <ScrollyShowcase
        id="mechanic"
        bgSrc="/story/mechanic/bg_gradient.webm"
        posterSrc="/story/mechanic/poster.avif"
        pulsePosition={{ left: '50vw', top: '40vh' }}
        height={120}
      >
        <div className="max-w-4xl">
          <h2 className="text-white text-4xl md:text-6xl font-bold mb-6">
            <span ref={counterRef} className="text-[#FBBF24]">0</span> active lobbies
          </h2>
          <div className="relative">
            <object
              data="/svg/parallax-story/lobby-list.svg"
              type="image/svg+xml"
              className="w-full h-auto mb-6"
              aria-label="People in the venue lobby"
            />
          </div>
          <div className="mt-6 flex gap-4 flex-wrap">
            <object
              data="/svg/parallax-story/dm-request-modal.svg"
              type="image/svg+xml"
              className="w-[460px]"
              aria-label="Direct message request"
            />
            <object
              data="/svg/parallax-story/group-create-modal.svg"
              type="image/svg+xml"
              className="w-[420px]"
              aria-label="Create group"
            />
          </div>
        </div>
      </ScrollyShowcase>

      {/* Scene 3 — Café: Keyed FG gated by scroll (0% → 100% opacity) */}
      <ScrollyShowcase
        id="charger"
        bgSrc="/story/charger/bg_cafe.webm"
        posterSrc="/story/charger/poster.avif"
        fgSrc="/story/charger/fg_tablet.webm"
        midSilhouetteSrc="/svg/parallax-story/mid_venue-library.svg"
        pulsePosition={{ left: '38vw', top: '52vh' }}
        height={120}
      >
        <div className="max-w-2xl">
          <h2 className="text-white text-4xl md:text-6xl font-bold mb-4">
            Coffee shop connects
          </h2>
          <object
            data="/svg/parallax-story/dm-request-modal.svg"
            type="image/svg+xml"
            className="w-[560px] mt-6"
            aria-label="Message request from someone nearby"
          />
          <p className="mt-4 text-white/60 text-base">
            Only usernames + About Me. No bulletin boards.
          </p>
        </div>
      </ScrollyShowcase>

      {/* Scene 4 — Logo: Keyed FG + z-parallax */}
      <ScrollyShowcase
        id="logo"
        bgSrc="/story/logo/bg_coworking.webm"
        posterSrc="/story/logo/poster.avif"
        fgSrc="/story/logo/fg_laptop.webm"
        midSilhouetteSrc="/svg/parallax-story/mid_venue-gym.svg"
        pulsePosition={{ left: '55vw', top: '48vh' }}
        height={120}
      >
        <div className="max-w-4xl">
          <h2 className="text-white text-4xl md:text-6xl font-bold mb-6">
            Coworking connections
          </h2>
          <object
            data="/svg/parallax-story/group-queue.svg"
            type="image/svg+xml"
            className="w-full h-auto"
            aria-label="Group chat queue"
          />
          <p className="mt-4 text-white/70 text-lg">
            Join ongoing conversations or start your own.
          </p>
        </div>
      </ScrollyShowcase>

      {/* Scene 5 — Tea: Keyed FG gated by scroll */}
      <ScrollyShowcase
        id="tea"
        bgSrc="/story/tea/bg_tea.webm"
        posterSrc="/story/tea/poster.avif"
        fgSrc="/story/tea/fg_cups.webm"
        pulsePosition={{ left: '48vw', top: '45vh' }}
        height={120}
      >
        <div className="max-w-2xl">
          <h2 className="text-white text-4xl md:text-6xl font-bold mb-6">
            Real conversations
          </h2>
          <p className="text-white/75 text-xl mb-8">
            No followers. No likes. Just people nearby who want to connect.
          </p>
          <div className="flex gap-4 items-center">
            <object
              data="/svg/parallax-story/badges.svg"
              type="image/svg+xml"
              className="w-[200px] h-[60px]"
              aria-label="User badges"
            />
            <object
              data="/svg/parallax-story/icons.svg"
              type="image/svg+xml"
              className="w-[150px] h-[40px]"
              aria-label="Activity icons"
            />
          </div>
        </div>
      </ScrollyShowcase>

      {/* Scene 6 — Gym: Keyed FG + hard CTA */}
      <ScrollyShowcase
        id="gym"
        bgSrc="/story/gym/bg_gym.webm"
        posterSrc="/story/gym/poster.avif"
        fgSrc="/story/gym/fg_barbell.webm"
        pulsePosition={{ left: '50vw', top: '50vh' }}
        height={120}
        enableSweep={false} // Skip sweep for final CTA
      >
        <div className="max-w-3xl text-center mx-auto">
          <h2 className="text-white text-6xl md:text-8xl font-extrabold mb-6">
            Download Shy
          </h2>
          <p className="text-white/75 text-2xl mb-12">
            Available on iOS and Android
          </p>
          <object
            data="/svg/parallax-story/cta-banner.svg"
            type="image/svg+xml"
            className="w-full max-w-2xl mx-auto"
            aria-label="Download app"
          />
        </div>
      </ScrollyShowcase>
    </div>
  );
}
