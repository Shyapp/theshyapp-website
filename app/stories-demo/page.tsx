'use client';

import { useReducedMotion } from '@/hooks/scrollytelling/use-reduced-motion';
import { ScrollytellingSceneDemo } from '@/components/scrollytelling/ScrollytellingSceneDemo';

export default function StoriesDemo() {
  const reduced = useReducedMotion();

  return (
    <div className="bg-black">
      {/* Scene 1 — Hook (with silhouette mid-layer) */}
      <ScrollytellingSceneDemo
        id="hook"
        bgColor="from-purple-900 via-purple-800 to-black"
        reduced={reduced}
        midSilhouetteSrc="/svg/parallax-story/mid_venue-cafe.svg"
      >
        <h1 className="text-white text-5xl md:text-7xl font-bold mb-6">
          You're already in the same room.
        </h1>
        <p className="mt-4 text-white/75 max-w-xl text-xl">
          Shy shows only people here now—just usernames and About Me.
        </p>
        <div className="mt-8 flex gap-3">
          <object
            data="/svg/parallax-story/chip-tabs.svg"
            type="image/svg+xml"
            className="w-[520px] h-[52px]"
            aria-label="Location filter chips"
          />
        </div>
      </ScrollytellingSceneDemo>

      {/* Scene 2 — Mechanic */}
      <ScrollytellingSceneDemo
        id="mechanic"
        bgColor="from-blue-900 via-indigo-900 to-black"
        reduced={reduced}
      >
        <div className="max-w-4xl">
          <object
            data="/svg/parallax-story/lobby-list.svg"
            type="image/svg+xml"
            className="w-full h-auto mb-6"
            aria-label="People in the venue lobby"
          />
          <div className="mt-6 flex gap-4 flex-wrap">
            <object
              data="/svg/parallax-story/dm-request-modal.svg"
              type="image/svg+xml"
              className="w-[560px]"
              aria-label="Direct message request modal"
            />
            <object
              data="/svg/parallax-story/group-create-modal.svg"
              type="image/svg+xml"
              className="w-[520px]"
              aria-label="Create group modal"
            />
          </div>
        </div>
      </ScrollytellingSceneDemo>

      {/* Scene 3 — Charger (Café) */}
      <ScrollytellingSceneDemo
        id="charger"
        bgColor="from-amber-900 via-orange-900 to-black"
        reduced={reduced}
        midSilhouetteSrc="/svg/parallax-story/mid_venue-library.svg"
      >
        <div className="max-w-2xl">
          <object
            data="/svg/parallax-story/dm-request-modal.svg"
            type="image/svg+xml"
            className="w-[560px]"
            aria-label="Message request from someone at this location"
          />
          <div className="mt-4 text-white/60 text-lg">
            Only usernames + About Me. No bulletin boards.
          </div>
        </div>
      </ScrollytellingSceneDemo>

      {/* Scene 4 — Logo (Coworking) */}
      <ScrollytellingSceneDemo
        id="logo"
        bgColor="from-emerald-900 via-teal-900 to-black"
        reduced={reduced}
        midSilhouetteSrc="/svg/parallax-story/mid_venue-gym.svg"
      >
        <div className="max-w-4xl">
          <object
            data="/svg/parallax-story/group-queue.svg"
            type="image/svg+xml"
            className="w-full h-auto"
            aria-label="Group chat queue"
          />
        </div>
      </ScrollytellingSceneDemo>

      {/* Scene 5 — Tea */}
      <ScrollytellingSceneDemo
        id="tea"
        bgColor="from-rose-900 via-pink-900 to-black"
        reduced={reduced}
      >
        <div className="max-w-2xl">
          <h2 className="text-white text-4xl md:text-6xl font-bold mb-6">
            Real conversations.
          </h2>
          <p className="text-white/75 text-xl">
            No followers. No likes. Just people nearby who want to connect.
          </p>
          <div className="mt-8 flex gap-3 items-center">
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
      </ScrollytellingSceneDemo>

      {/* Scene 6 — Gym */}
      <ScrollytellingSceneDemo
        id="gym"
        bgColor="from-violet-900 via-purple-900 to-black"
        reduced={reduced}
      >
        <div className="max-w-3xl text-center">
          <h2 className="text-white text-5xl md:text-7xl font-bold mb-6">
            Download Shy
          </h2>
          <p className="text-white/75 text-xl mb-8">
            Available on iOS and Android
          </p>
          <object
            data="/svg/parallax-story/cta-banner.svg"
            type="image/svg+xml"
            className="w-full max-w-2xl mx-auto"
            aria-label="Download app call to action"
          />
        </div>
      </ScrollytellingSceneDemo>
    </div>
  );
}
