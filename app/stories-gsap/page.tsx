'use client';

import { SCENES } from '@/lib/scrollytelling/manifest';
import { useReducedMotion } from '@/hooks/scrollytelling/use-reduced-motion';
import { ScrollytellingSceneGSAP } from '@/components/scrollytelling/ScrollytellingSceneGSAP';

export default function StoriesGSAP() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Scene 1 — Hook (with silhouette mid-layer) */}
      <ScrollytellingSceneGSAP
        id="hook"
        bg={SCENES.hook.bg}
        poster={SCENES.hook.poster}
        reduced={reduced}
        midSilhouetteSrc="/svg/parallax-story/mid_venue-cafe.svg"
      >
        <h1 className="text-white text-5xl md:text-7xl font-bold">
          You're already in the same room.
        </h1>
        <p className="mt-4 text-white/75 max-w-xl">
          Shy shows only people here now—just usernames and About Me.
        </p>
        <div className="mt-8 flex gap-3">
          <object
            data="/svg/parallax-story/chip-tabs.svg"
            type="image/svg+xml"
            className="w-[520px] h-[52px]"
          />
        </div>
      </ScrollytellingSceneGSAP>

      {/* Scene 2 — Mechanic */}
      <ScrollytellingSceneGSAP
        id="mechanic"
        bg={SCENES.mechanic.bg}
        poster={SCENES.mechanic.poster}
        reduced={reduced}
      >
        <object
          data="/svg/parallax-story/lobby-list.svg"
          type="image/svg+xml"
          className="w-full h-auto"
        />
        <div className="mt-6 flex gap-4">
          <object
            data="/svg/parallax-story/dm-request-modal.svg"
            type="image/svg+xml"
            className="w-[560px]"
          />
          <object
            data="/svg/parallax-story/group-create-modal.svg"
            type="image/svg+xml"
            className="w-[520px]"
          />
        </div>
      </ScrollytellingSceneGSAP>

      {/* Scene 3 — Charger (Café) */}
      <ScrollytellingSceneGSAP
        id="charger"
        bg={SCENES.charger.bg}
        poster={SCENES.charger.poster}
        fg={SCENES.charger.fg}
        reduced={reduced}
      >
        <object
          data="/svg/parallax-story/dm-request-modal.svg"
          type="image/svg+xml"
          className="w-[560px]"
        />
        <div className="mt-4 text-white/60 text-sm">
          Only usernames + About Me. No bulletin boards.
        </div>
      </ScrollytellingSceneGSAP>

      {/* Scene 4 — Logo (Coworking) */}
      <ScrollytellingSceneGSAP
        id="logo"
        bg={SCENES.logo.bg}
        poster={SCENES.logo.poster}
        fg={SCENES.logo.fg}
        reduced={reduced}
      >
        <object
          data="/svg/parallax-story/group-queue.svg"
          type="image/svg+xml"
          className="w-full h-auto"
        />
      </ScrollytellingSceneGSAP>

      {/* Scene 5 — Tea */}
      <ScrollytellingSceneGSAP
        id="tea"
        bg={SCENES.tea.bg}
        poster={SCENES.tea.poster}
        fg={SCENES.tea.fg}
        reduced={reduced}
      >
        <div className="text-white text-3xl font-bold">Tea before text.</div>
        <p className="text-white/75 mt-2">
          Meet politely first. Requests only—accept or ignore.
        </p>
        <object
          data="/svg/parallax-story/tooltip.svg"
          type="image/svg+xml"
          className="mt-6 w-[320px]"
        />
      </ScrollytellingSceneGSAP>

      {/* Scene 6 — Gym + CTA */}
      <ScrollytellingSceneGSAP
        id="gym"
        bg={SCENES.gym.bg}
        poster={SCENES.gym.poster}
        fg={SCENES.gym.fg}
        reduced={reduced}
      >
        <object
          data="/svg/parallax-story/cta-banner.svg"
          type="image/svg+xml"
          className="w-full h-auto"
        />
        <div className="mt-4 flex items-center gap-3">
          <svg className="w-6 h-6" style={{ color: 'var(--shy-amber)' }}>
            <use href="/svg/parallax-story/badges.svg#badge-accepted" />
          </svg>
          <span className="text-white/80 text-sm">Ephemeral. Local. Opt-in.</span>
        </div>
      </ScrollytellingSceneGSAP>
    </>
  );
}
