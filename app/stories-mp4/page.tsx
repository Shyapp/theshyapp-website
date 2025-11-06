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
        height={140}
        fallbackGradient="from-purple-900 via-purple-800 to-black"
      >
        <div className="max-w-4xl">
          <h1 className="text-white text-6xl md:text-8xl font-extrabold leading-[1.1] mb-8 tracking-tight">
            You're already in<br />the same room.
          </h1>
          <p className="text-white/90 mt-6 max-w-2xl text-2xl md:text-3xl leading-relaxed font-light">
            Shy shows only people here now—just usernames and About Me.
          </p>
          <div className="mt-12 transform hover:scale-105 transition-transform duration-300">
            <object
              data="/svg/parallax-story/chip-tabs.svg"
              type="image/svg+xml"
              className="w-full max-w-[520px] h-[52px]"
              aria-label="Location filter chips"
            />
          </div>
        </div>
      </ScrollyShowcaseMP4>

      {/* Scene 2 — Mechanic: Gradient fallback */}
      <ScrollyShowcaseMP4
        id="mechanic"
        bgSrc="/story/mechanic/bg_gradient.mp4"
        midSilhouetteSrc="/svg/parallax-story/mid_venue-library.svg"
        pulsePosition={{ left: '50vw', top: '40vh' }}
        height={140}
        fallbackGradient="from-blue-900 via-indigo-900 to-black"
      >
        <div className="max-w-5xl">
          <h2 className="text-white text-5xl md:text-7xl font-bold mb-10">
            <span ref={counterRef} className="text-[#FBBF24] inline-block min-w-[80px]">0</span>{' '}
            <span className="text-white/90">active lobbies</span>
          </h2>
          <div className="relative mb-8 transform hover:scale-[1.02] transition-all duration-500">
            <object
              data="/svg/parallax-story/lobby-list.svg"
              type="image/svg+xml"
              className="w-full h-auto drop-shadow-2xl"
              aria-label="People in the venue lobby"
            />
          </div>
          <div className="mt-10 flex gap-6 flex-wrap justify-center">
            <object
              data="/svg/parallax-story/dm-request-modal.svg"
              type="image/svg+xml"
              className="w-full max-w-[460px] drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300"
              aria-label="Direct message request"
            />
            <object
              data="/svg/parallax-story/group-create-modal.svg"
              type="image/svg+xml"
              className="w-full max-w-[420px] drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300"
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
        height={140}
        fallbackGradient="from-amber-900 via-orange-900 to-black"
      >
        <div className="max-w-3xl">
          <h2 className="text-white text-5xl md:text-7xl font-bold mb-10 leading-tight">
            Coffee shop<br />connects
          </h2>
          <div className="transform hover:scale-105 transition-all duration-500">
            <object
              data="/svg/parallax-story/dm-request-modal.svg"
              type="image/svg+xml"
              className="w-full max-w-[560px] drop-shadow-2xl"
              aria-label="Message request from someone nearby"
            />
          </div>
          <p className="mt-8 text-white/70 text-xl md:text-2xl leading-relaxed font-light">
            Only usernames + About Me.<br />
            <span className="text-white/50">No bulletin boards.</span>
          </p>
        </div>
      </ScrollyShowcaseMP4>

      {/* Scene 4 — Logo: Gradient fallback */}
      <ScrollyShowcaseMP4
        id="logo"
        bgSrc="/story/logo/bg_coworking.mp4"
        midSilhouetteSrc="/svg/parallax-story/mid_venue-gym.svg"
        pulsePosition={{ left: '55vw', top: '48vh' }}
        height={140}
        fallbackGradient="from-emerald-900 via-teal-900 to-black"
      >
        <div className="max-w-5xl">
          <h2 className="text-white text-5xl md:text-7xl font-bold mb-10">
            Coworking connections
          </h2>
          <div className="transform hover:scale-[1.02] transition-all duration-500">
            <object
              data="/svg/parallax-story/group-queue.svg"
              type="image/svg+xml"
              className="w-full h-auto drop-shadow-2xl"
              aria-label="Group chat queue"
            />
          </div>
          <p className="mt-8 text-white/80 text-xl md:text-2xl font-light">
            Join ongoing conversations or start your own.
          </p>
        </div>
      </ScrollyShowcaseMP4>

      {/* Scene 5 — Tea: Gradient fallback */}
      <ScrollyShowcaseMP4
        id="tea"
        bgSrc="/story/tea/bg_tea.mp4"
        pulsePosition={{ left: '48vw', top: '45vh' }}
        height={140}
        fallbackGradient="from-rose-900 via-pink-900 to-black"
      >
        <div className="max-w-3xl text-center">
          <h2 className="text-white text-5xl md:text-7xl font-bold mb-8">
            Real conversations
          </h2>
          <p className="text-white/85 text-2xl md:text-3xl mb-12 leading-relaxed font-light">
            No followers. No likes.<br />
            <span className="text-[#FBBF24]">Just people nearby who want to connect.</span>
          </p>
          <div className="flex gap-6 items-center justify-center flex-wrap">
            <object
              data="/svg/parallax-story/badges.svg"
              type="image/svg+xml"
              className="w-[200px] h-[60px] drop-shadow-lg hover:drop-shadow-xl transition-all duration-300"
              aria-label="User badges"
            />
            <object
              data="/svg/parallax-story/icons.svg"
              type="image/svg+xml"
              className="w-[150px] h-[40px] drop-shadow-lg hover:drop-shadow-xl transition-all duration-300"
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
        height={140}
        enableSweep={false}
        fallbackGradient="from-violet-900 via-purple-900 to-black"
      >
        <div className="max-w-4xl text-center mx-auto">
          <h2 className="text-white text-7xl md:text-9xl font-extrabold mb-10 tracking-tighter">
            Download Shy
          </h2>
          <p className="text-white/85 text-3xl md:text-4xl mb-16 font-light">
            Available on iOS and Android
          </p>
          <div className="transform hover:scale-105 transition-all duration-500">
            <object
              data="/svg/parallax-story/cta-banner.svg"
              type="image/svg+xml"
              className="w-full max-w-3xl mx-auto drop-shadow-2xl"
              aria-label="Download app"
            />
          </div>
        </div>
      </ScrollyShowcaseMP4>
    </div>
  );
}
