'use client';

import ScrollyShowcaseMP4 from '@/components/scrollytelling/ScrollyShowcaseMP4';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function StoriesMP4() {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
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
      {/* Scene 1 — Hook: Your actual video */}
      <ScrollyShowcaseMP4
        id="hook"
        bgSrc="/story/hook/bg_city.mp4"
        posterSrc="/story/hook/poster.jpg"
        midSilhouetteSrc="/svg/parallax-story/mid_venue-cafe.svg"
        pulsePosition={{ left: '42vw', top: '55vh' }}
        height={120}
        fallbackGradient="from-purple-900 via-purple-800 to-black"
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
      </ScrollyShowcaseMP4>

      {/* Scene 2 — Mechanic: Gradient fallback */}
      <ScrollyShowcaseMP4
        id="mechanic"
        bgSrc="/story/mechanic/bg_gradient.mp4"
        midSilhouetteSrc="/svg/parallax-story/mid_venue-library.svg"
        pulsePosition={{ left: '50vw', top: '40vh' }}
        height={120}
        fallbackGradient="from-blue-900 via-indigo-900 to-black"
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
      </ScrollyShowcaseMP4>

      {/* Scene 3 — Café: Gradient fallback */}
      <ScrollyShowcaseMP4
        id="charger"
        bgSrc="/story/charger/bg_cafe.mp4"
        midSilhouetteSrc="/svg/parallax-story/mid_venue-library.svg"
        pulsePosition={{ left: '38vw', top: '52vh' }}
        height={120}
        fallbackGradient="from-amber-900 via-orange-900 to-black"
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
      </ScrollyShowcaseMP4>

      {/* Scene 4 — Logo: Gradient fallback */}
      <ScrollyShowcaseMP4
        id="logo"
        bgSrc="/story/logo/bg_coworking.mp4"
        midSilhouetteSrc="/svg/parallax-story/mid_venue-gym.svg"
        pulsePosition={{ left: '55vw', top: '48vh' }}
        height={120}
        fallbackGradient="from-emerald-900 via-teal-900 to-black"
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
      </ScrollyShowcaseMP4>

      {/* Scene 5 — Tea: Gradient fallback */}
      <ScrollyShowcaseMP4
        id="tea"
        bgSrc="/story/tea/bg_tea.mp4"
        pulsePosition={{ left: '48vw', top: '45vh' }}
        height={120}
        fallbackGradient="from-rose-900 via-pink-900 to-black"
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
      </ScrollyShowcaseMP4>

      {/* Scene 6 — Gym: Gradient fallback */}
      <ScrollyShowcaseMP4
        id="gym"
        bgSrc="/story/gym/bg_gym.mp4"
        pulsePosition={{ left: '50vw', top: '50vh' }}
        height={120}
        enableSweep={false}
        fallbackGradient="from-violet-900 via-purple-900 to-black"
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
      </ScrollyShowcaseMP4>
    </div>
  );
}
